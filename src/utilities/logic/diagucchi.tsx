import { Float } from "react-native/Libraries/Types/CodegenTypes";

class diagucchi
{
    //Person attributes
    private name: string;
    private bloodValue: Float;
    
    public constructor(name: string, bloodValue: Float)
    {
        this.name = name;
        this.bloodValue = bloodValue;
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