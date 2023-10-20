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

    public constructor
    (
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
    getName(): string 
    {
        return this.name;
    }
    
    getBloodValue(): number 
    {
        return this.bloodValue;
    }
    
    getInsulinPump(): boolean
    {
        return this.insulinPump;
    }
    
    getLchf(): boolean 
    {
        return this.lchf;
    }
    
    getEatHabbit(): EnumAttribute 
    {
        return this.eatHabbit;
    }
    
    getExercise(): EnumAttribute 
    {
        return this.exercise;
    }
    
    getWeight(): EnumAttribute 
    {
        return this.weight;
    }
    
      
    getAlcoholHabbit(): EnumAttribute 
    {
        return this.alcoholHabbit;
    }
    
    getSmokeHabbit(): EnumAttribute 
    {
        return this.smokeHabbit;
    }
    
    getIllnesses(): EnumAttribute[] 
    {
        return this.illnesses;
    }
    // Setters for private attributes
    setName(name: string): void 
    {
        this.name = name;
    }
    
    setBloodValue(bloodValue: number): void 
    {
        this.bloodValue = bloodValue;
    }
    
    setInsulinPump(insulinPump: boolean): void 
    {
        this.insulinPump = insulinPump;
    }
    
    setLchf(lchf: boolean): void 
    {
        this.lchf = lchf;
    }
    
    setEatHabbit(eatHabbit: EnumAttribute): void 
    {
        this.eatHabbit = eatHabbit;
    }
    
    setExercise(exercise: EnumAttribute): void 
    {
        this.exercise = exercise;
    }
    
    setWeight(weight: EnumAttribute): void 
    {
        this.weight = weight;
    }
    
    setAlcoholHabbit(alcoholHabbit: EnumAttribute): void 
    {
        this.alcoholHabbit = alcoholHabbit;
    }
    
    setSmokeHabbit(smokeHabbit: EnumAttribute): void 
    {
        this.smokeHabbit = smokeHabbit;
    }
    
    setIllnesses(illnesses: EnumAttribute[]): void 
    {
        this.illnesses = illnesses;
    }
}