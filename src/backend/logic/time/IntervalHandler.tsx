import { Gotchi } from "../../data/gotchi/Gotchi";
import { EventDispatcher } from "../event/EventDispatcher";
import { Clock } from "./Clock";
import { GUIController } from "../controllers/GUIController";
import { NotificationDispatcher } from "../controllers/NotificationDispatcher";
import { Storage } from "../../data/Storage";

export class IntervallHandler
{
    private _bloodValue: number;
    private _baseFactor: number;
    private _tempFactor: number;
    private _factorTime: number;
    private _testFactorTime: number; // only used temporarily before we can get intervall time from GUI!
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
        this._notificationDispatcher = notificationDispatcher;
        this._eventDispatcher = eventDispatcher;
        this._baseFactor = storage.baseFactor;
        this._tempFactor = 0.1; // temporary temp factor
        this._factorTime = 0;
        this._testFactorTime = 10; // runs temp formula for 10 sec / intervalls
        this._clock = clock;

        this._warningNotificationSent = false;
        this._criticalWarningSent = false;
        this._deathNotificationSent = false;
    }

    public fetchFactors()
    {
        this._baseFactor = this._storage.baseFactor;
    }
    public generateTempFactor(e: Event)
    {
        // fetch temp factor from submited event here
        // generate a deltaValue for how many intervals this factor should be valid.
    }
    public fetchFactorTime()
    {
        // fetch the intervalltime for how long to use new factor 
    }
    public factorUpdate() // make this either a callback or something that only runs when button is clicked
    {
        // fetch new factor
        //this._tempFactor = this._GUIController.tempFactor;
        if(this._testFactorTime > 0)
        {
            // use temp factor submited by GUI
            this._testFactorTime--;
        }
        else 
        {
            this._tempFactor = 0;
            // use new factor with deltatime
        }
    }
    public decreaseBloodSugar() // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        this._bloodValue -= (this._baseFactor + this._tempFactor);
        this._person.bloodValue = this.bloodValue;
    }
    public increaseBloodSugar()
    {
        this._bloodValue += (this._baseFactor + this._tempFactor);
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
    public checkTreshold()
    {
        // check upper treshold
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
        // check lower threshold
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
        console.log("Base Factor: " + this._baseFactor + "\n");
        console.log("Temp Factor: " + this._tempFactor + "\n");
        console.log("Time left on factor: " + this._testFactorTime + " sec" + "\n");

        this.decreaseBloodSugar(); // Update Values
        this.factorUpdate(); // check if formula should use a new temporary factor
        this._GUIController.setBloodSugar(this._bloodValue); // update GUI element
        this.resetNotificationFlags();
        this.checkTreshold();
    }
    
    get bloodValue(): number 
    {
        return this._bloodValue;
    }
    set bloodValue(value: number) 
    {
        this._bloodValue = value;
    }
}