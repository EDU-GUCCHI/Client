import { Gotchi } from "../../data/gotchi/Gotchi";
import { EventDispatcher } from "../event/EventDispatcher";
import { Clock } from "./Clock";
import { GUIController } from "../controllers/GUIController";
import { NotificationDispatcher } from "../controllers/NotificationDispatcher";
import { Storage } from "../../data/Storage";

export class IntervallHandler
{
    private _bloodValue: number;
    private _increaseFactor: number;
    private _decreaseFactor: number;
    private _person: Gotchi;
    private _GUIController: GUIController;
    private _notificationDispatcher: NotificationDispatcher;
    private _eventDispatcher: EventDispatcher;
    private _clock: Clock;

    private _warningNotificationSent: Boolean;
    private _criticalWarningSent: Boolean;
    private _deathNotificationSent: Boolean;
    private _storage: Storage;

    public constructor(storage: Storage, person: Gotchi, GUIController: GUIController, notificationDispatcher: NotificationDispatcher, eventDispatcher: EventDispatcher, clock: Clock)
    {
        this._person = person;
        this._storage = storage;
        this._bloodValue = person.bloodValue;
        this._GUIController = GUIController;
        this._increaseFactor = 0;
        this._decreaseFactor = 0;
        this._notificationDispatcher = notificationDispatcher;
        this._eventDispatcher = eventDispatcher;
        this._clock = clock;

        this._warningNotificationSent = false;
        this._criticalWarningSent = false;
        this._deathNotificationSent = false;
    }

    public updateFactors()
    {
        this.increaseFactor = this._storage.increaseFactor;
        this._decreaseFactor = this._storage.decreaseFactor;
    }
    public decreaseBloodSugar() // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        this._bloodValue -= this._decreaseFactor;
        this._person.bloodValue = this._bloodValue;
    }
    public increaseBloodSugar()
    {
        this._bloodValue += this._increaseFactor;
        this._person.bloodValue = this.bloodValue;
    }
    public negateValue() // flip value to be negative / positive
    {
        this._bloodValue = (this._bloodValue * -1);
        this._person.bloodValue = this._bloodValue;
    }
    public resetNotificationFlags()
    {
        if(this._bloodValue >= 4 && this._bloodValue <= 8)
        {
            this._warningNotificationSent = false;
        }
        if(this._bloodValue >= 2 && this._bloodValue <= 10)
        {
            this._criticalWarningSent = false;
        }
        if(this._bloodValue >= 1 && this._bloodValue <= 12)
        {
            this._deathNotificationSent = false;
        }
    }
    public checkUpperTreshold()
    {
        if(this._bloodValue > 8 && !this._warningNotificationSent)
        {
            this._notificationDispatcher.SendBloodSugarWarning("Högt blodsocker");
            this._warningNotificationSent = true;
        }
        else if(this._bloodValue > 10 && !this._criticalWarningSent)
        {
            this._notificationDispatcher.SendBloodSugarWarning("Kritiskt högt blodsocker");
            this._warningNotificationSent = true;
        }
        else if(this._bloodValue > 12 && !this._deathNotificationSent)
        {
            this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
            this._deathNotificationSent = true;
            console.log("Task failed successfully");
            this._clock.stopClock(); // End scenario when this is triggered
        }
    }
    public checkLowerThreshold()
    {
        if(this._bloodValue < 4 && !this._warningNotificationSent) // check if to send notificationwarning
        {
            this._notificationDispatcher.SendBloodSugarWarning("Lågt blodsocker");
            this._eventDispatcher.LowBloodSugar();
            this._warningNotificationSent = true;
            console.log("Blood sugar warning sent")
        }
        else if(this._bloodValue < 2 && !this._criticalWarningSent) 
        {
            this._notificationDispatcher.SendBloodSugarWarning("Kritiskt lågt blodsocker");
            this._eventDispatcher.LowBloodSugar();
            this._criticalWarningSent = true;
            console.log("Critical Blood sugar warning sent")
        }
        else if(this._bloodValue < 1 && !this._deathNotificationSent)
        {
            this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
            this._deathNotificationSent = true;
            console.log("Task failed successfully");
            this._clock.stopClock(); // End scenario when this is triggered
        }
    }
    public update(): void // updates done every pulse
    {
        this.decreaseBloodSugar(); // Update Values
        this._GUIController.setBloodSugar(this._bloodValue); // update GUI element
        this.resetNotificationFlags();
        this.checkUpperTreshold();
        this.checkLowerThreshold();
    }
    
    get bloodValue(): number 
    {
        return this._bloodValue;
    }
    set bloodValue(value: number) 
    {
        this._bloodValue = value;
    }
    get increaseFactor(): number 
    {
        return this._increaseFactor;
    }
    set increaseFactor(value: number) 
    {
        this._increaseFactor = value;
    }
}