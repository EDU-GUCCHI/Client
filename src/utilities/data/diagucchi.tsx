class diagucchi
{
    //Person attributes
    private name: string;
    private bloodValue: number;
    private trait: string;
    
    public constructor(name: string, bloodValue: number, trait: string)
    {
        this.name = name;
        this.bloodValue = bloodValue;
        this.trait = trait;
    }
    //getters-setters
    public getName(): string
    {
        return this.name;
    }
    public getbloodValue(): number
    {
        return this.bloodValue;
    }
    public setName(name: string)
    {
        this.name = name;
    }
    public setBloodValue(bloodValue: number)
    {
        this.bloodValue = bloodValue;
    }
}