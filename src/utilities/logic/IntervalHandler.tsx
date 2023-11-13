import { Gotchi } from "../data/Gotchi";
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
        this._bloodValue -= this._factor / 3;
        this._person.bloodValue = this._bloodValue;
    }
    public update(): void // updates done every pulse
    {
        this.decreaseBloodSugar(); // Update Values
        this._GUIController.setBloodSugar(this._bloodValue); // update GUI element
        this.resetNotificationFlags();
        this.checkLowerThreshold();
    }
    public resetNotificationFlags()
    {
        if(this._bloodValue >= -10)
        {
            this._warningNotificationSent = false;
        }
        if(this._bloodValue >= -20)
        {
            this._criticalWarningSent = false;
        }
        if(this._bloodValue >= -28)
        {
            this._deathNotificationSent = false;
        }
    }
    public checkLowerThreshold()
    {
        if(this._bloodValue < -10 && !this._warningNotificationSent) // check if to send notificationwarning
        {
            this._notificationDispatcher.SendBloodSugarWarning("bloodsugar level: low");
            this._warningNotificationSent = true;
        }
        else if(this._bloodValue < -20 && !this._criticalWarningSent) 
        {
            this._notificationDispatcher.SendBloodSugarWarning("bloodsugar level: Critical!");
            this._criticalWarningSent = true;
        }
        else if(this._bloodValue < -28 && !this._deathNotificationSent)
        {
            this._notificationDispatcher.SendBloodSugarWarning("bloodsugar reached a lethal low! your gotchi died! T_T ");
            this._deathNotificationSent = true;
            console.log("Gotchi: Died :(");
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