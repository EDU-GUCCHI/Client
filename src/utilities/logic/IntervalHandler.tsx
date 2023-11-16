import { Gotchi } from "../data/gotchi/Gotchi";
import { EventDispatcher } from "./EventDispatcher";
import { Clock } from "./Clock";
import { GUIController } from "./GUIController";
import { NotificationDispatcher } from "./NotificationDispatcher";

export class IntervallHandler
{
    private _bloodValue: number;
    private _factor: number;
    private _person: Gotchi;
    private _GUIController: GUIController;
    private _notificationDispatcher: NotificationDispatcher;
    private _eventDispatcher: EventDispatcher;
    private _clock: Clock;

    private _warningNotificationSent: Boolean;
    private _criticalWarningSent: Boolean;
    private _deathNotificationSent: Boolean;

    public constructor(person: Gotchi, GUIController: GUIController, notificationDispatcher: NotificationDispatcher, eventDispatcher: EventDispatcher, clock: Clock)
    {
        this._person = person;
        this._bloodValue = person.bloodValue;
        this._GUIController = GUIController;
        this._factor = 0;
        this._notificationDispatcher = notificationDispatcher;
        this._eventDispatcher = eventDispatcher;
        this._clock = clock;

        this._warningNotificationSent = false;
        this._criticalWarningSent = false;
        this._deathNotificationSent = false;
    }
    
    public decreaseBloodSugar(): void // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        //just example increment for now!
        this._bloodValue -= (this._factor / 3);
        this._person.bloodValue = this._bloodValue;
    }
    public update(): void // updates done every pulse
    {
        this.decreaseBloodSugar(); // Update Values
        this._GUIController.setBloodSugar(this._bloodValue); // update GUI element
        this.resetNotificationFlags();
        this.checkUpperTreshold();
        this.checkLowerThreshold();
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
        console.log("Checking Lower Threshhold");
        if(this._bloodValue < 4 && !this._warningNotificationSent) // check if to send notificationwarning
        {
            this._notificationDispatcher.SendBloodSugarWarning("Lågt blodsocker");
            this._eventDispatcher.LowBloodSugar();
            this._warningNotificationSent = true;
            console.log("Blood sugar warning sent")
        }
        else if(this._bloodValue < 2 && !this._criticalWarningSent) 
        {
            this._notificationDispatcher.SendBloodSugarWarning("Kritiskt lågt blodsocker!");
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
    
    get bloodValue(): number 
    {
        return this._bloodValue;
    }
    set bloodValue(value: number) 
    {
        this._bloodValue = value;
    }
    get factor(): number 
    {
        return this._factor;
    }
    set factor(value: number) 
    {
        this._factor = value;
    }
}