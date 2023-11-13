import { Gotchi } from "../data/Gotchi";
import { EventDispatcher } from "./EventDispatcher";
import { GUIController } from "./GUIController";
import { NotificationDispatcher } from "./NotificationDispatcher";

export class IntervallHandler
{
    private _bloodValue: number;
    private _factor: number;
    private _person: Gotchi;
    private _GUIController: GUIController;
    private _notificationSent: Boolean;
    private _notificationDispatcher: NotificationDispatcher;
    private _eventDispatcher: EventDispatcher;

    public constructor(person: Gotchi, GUIController: GUIController, notificationDispatcher: NotificationDispatcher, eventDispatcher: EventDispatcher)
    {
        this._person = person;
        this._bloodValue = person.bloodValue;
        this._GUIController = GUIController;
        this._factor = 0;
        this._notificationSent = false;
        this._notificationDispatcher = notificationDispatcher;
        this._eventDispatcher = eventDispatcher;
    }
    public decreaseBloodSugar(): void // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        //just example increment for now!
        this._bloodValue -= this._factor / 5;
        this._person.bloodValue = this._bloodValue;
    }
    public update(): void // updates done every pulse
    {
        this.decreaseBloodSugar(); // Update Values
        this._GUIController.setBloodSugar(this._bloodValue); // update GUI element

        if(this._bloodValue < -10 && !this._notificationSent) // check if to send notificationwarning
        {
            this._notificationDispatcher.SendBloodSugarWarning("low");
            this._notificationSent = true;
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