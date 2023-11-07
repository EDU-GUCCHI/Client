import { Gotchi } from "../data/Gotchi";
import { GUIController } from "./GUIController";

export class IntervallHandler
{
    private _bloodValue: number;
    private _factor: number;
    private _person: Gotchi;
    private _GUIController: GUIController;

    public constructor(person: Gotchi, GUIController: GUIController)
    {
        this._person = person;
        this._bloodValue = person.bloodValue;
        this._GUIController = GUIController;
        this._factor = 0;
    }
    public incrementFormula(): void // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        //just example increment for now!
        //console.log("BloodSugar: " + this.result); // for debugging
        this._bloodValue += this._factor / 2;
        this._person.bloodValue = this._bloodValue;
    }
    public update(): void // updates done every pulse
    {
        this.incrementFormula();
        this._GUIController.setBloodSugar(this._bloodValue);
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