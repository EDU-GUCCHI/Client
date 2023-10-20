import * as EnumAttribute from './EnumAttributes';

class diagucchi
{
    //Person attributes
    private name: string;
    private bloodValue: number;
    private insulinPump: boolean;
    private lchf: boolean;
    
    //Enum-attributes
    private eatHabbit: EnumAttribute;
    private exercise: EnumAttribute;
    private weight: EnumAttribute;
    private alcoholHabbit: EnumAttribute;
    private smokeHabbit: EnumAttribute;
    private illnesses: EnumAttribute[];

    public constructor(
        name: string, 
        bloodValue: number, 
        insulinPump: boolean,
        lchf: boolean,
        illnesses: EnumAttribute[], 
        smokeHabbit: EnumAttribute, 
        alcoholHabbit: EnumAttribute, 
        weight: EnumAttribute, 
        exercise: EnumAttribute, 
        eatHabbit: EnumAttribute
        )
    {
        this.name = name;
        this.bloodValue = bloodValue;
        this.insulinPump = insulinPump;
        this.lchf = lchf;
        this.illnesses = illnesses;
        this.smokeHabbit = smokeHabbit;
        this.alcoholHabbit = alcoholHabbit;
        this.weight = weight;
        this.exercise = exercise;
        this.eatHabbit = eatHabbit;
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