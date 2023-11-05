import { Gotchi } from "../data/Gotchi";
import { GUIController } from "./GUIController";

export class IntervallHandler
{
    private bloodValue: number;
    private factor: number;
    private result: number;
    private person: Gotchi;
    private GUIController: GUIController;

    public constructor(person: Gotchi, GUIController: GUIController)
    {
        this.person = person;
        this.bloodValue = person.bloodValue;
        this.GUIController = GUIController;
        this.factor = 0;
        this.result = this.bloodValue;
    }
    public incrementFormula(): void // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        //just example increment for now!
        //console.log("BloodSugar: " + this.result); // for debugging
        this.result = this.bloodValue += this.factor / 2;
        this.person.bloodValue = this.result;
    }
    public update(): void // updates done every pulse
    {
        this.incrementFormula();
        this.GUIController.setBloodSugar(this.bloodValue);
    }
    getBloodValueTest(): number 
    {
        return this.bloodValue;
    }
    setBloodValueTest(value: number) 
    {
        this.bloodValue = value;
    }
    getFactor(): number 
    {
        return this.factor;
    }
    setFactor(value: number) 
    {
        this.factor = value;
    }
}