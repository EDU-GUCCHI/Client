import { Gotchi } from "../data/Gotchi";

//Observer:
export class IntervallHandler
{
    private bloodValue: number;
    private factor: number;
    private result: number;
    private person: Gotchi;
    public constructor(person: Gotchi)
    {
        this.person = person;
        this.bloodValue = person.getBloodValue();
        this.factor = 0;
        this.result = this.bloodValue;
    }
    public update(): void // updates done every pulse
    {
        this.incrementFormula();

        // check if any thresholds are crossed

    }
    public incrementFormula(): void // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        //just example icrement for now!
        console.log("BloodSugar: " + this.result);
        this.result = this.bloodValue += this.factor / 2;
        this.person.setBloodValue(this.result);
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