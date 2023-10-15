import { Float } from "react-native/Libraries/Types/CodegenTypes";

class diagucchi
{
    //Person attributes
    private name: string;
    private bloodValue: Float;
    private trait: string;
    
    public constructor(name: string, bloodValue: Float, trait: string)
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
    public getbloodValue(): Float
    {
        return this.bloodValue;
    }
    public setName(name: string)
    {
        this.name = name;
    }
    public setBloodValue(bloodValue: Float)
    {
        this.bloodValue = bloodValue;
    }
}