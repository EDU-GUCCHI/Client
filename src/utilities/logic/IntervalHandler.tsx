//Observer:
export class IntervallHandler
{
    private bloodValueTest: number;
    private factor: number;
    private result: number;
    public constructor()
    {
        this.bloodValueTest = 5;
        this.factor = 0;
        this.result = this.bloodValueTest;
    }
    public update(): void // updates done every pulse
    {
        this.incrementFormula();
    }
    public incrementFormula(): void // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        //just example icrement for now!
        console.log("BloodSugar: " + this.result);
        this.result = this.bloodValueTest += this.factor / 2;
    }
    getBloodValueTest(): number 
    {
        return this.bloodValueTest;
    }
    setBloodValueTest(value: number) 
    {
        this.bloodValueTest = value;
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