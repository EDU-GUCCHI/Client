import * as EnumAttribute from './EnumAttributes';

class diagucchi
{
    //Person attributes
    private name: string;
    private bloodValue: number;
    private insulinPump: boolean;
    private lchf: boolean;
    //Enum-attributes
    private eatHabit: EnumAttribute.EatingHabit;
    private exercise: EnumAttribute.Exercise;
    private weight: EnumAttribute.Weight;
    private alcoholHabit: EnumAttribute.AlcoholHabit;
    private smokeHabit: EnumAttribute.SmokingHabits;
    private illnesses: EnumAttribute.Illness[];

    public constructor
    (
        name: string, 
        bloodValue: number, 
        insulinPump: boolean,
        lchf: boolean,
        illnesses: EnumAttribute.Illness[], 
        smokeHabit: EnumAttribute.SmokingHabits, 
        alcoholHabit: EnumAttribute.AlcoholHabit, 
        weight: EnumAttribute.Weight, 
        exercise: EnumAttribute.Exercise, 
        eatHabit: EnumAttribute.EatingHabit
    )
    {
        this.name = name;
        this.bloodValue = bloodValue;
        this.insulinPump = insulinPump;
        this.lchf = lchf;
        this.illnesses = illnesses;
        this.smokeHabit = smokeHabit;
        this.alcoholHabit = alcoholHabit;
        this.weight = weight;
        this.exercise = exercise;
        this.eatHabit = eatHabit;
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
    getEatHabbit(): EnumAttribute.EatingHabit 
    {
        return this.eatHabit;
    }
    getExercise(): EnumAttribute.Exercise 
    {
        return this.exercise;
    }
    getWeight(): EnumAttribute.Weight
    {
        return this.weight;
    }
    getAlcoholHabbit(): EnumAttribute.AlcoholHabit
    {
        return this.alcoholHabit;
    }
    getSmokeHabbit(): EnumAttribute.SmokingHabits 
    {
        return this.smokeHabit;
    }
    getIllnesses(): EnumAttribute.Illness[] 
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
    setEatHabbit(eatHabbit: EnumAttribute.EatingHabit): void 
    {
        this.eatHabit = eatHabbit;
    }
    setExercise(exercise: EnumAttribute.Exercise): void 
    {
        this.exercise = exercise;
    }
    setWeight(weight: EnumAttribute.Weight): void 
    {
        this.weight = weight;
    }
    setAlcoholHabbit(alcoholHabbit: EnumAttribute.AlcoholHabit): void 
    {
        this.alcoholHabit = alcoholHabbit;
    }
    setSmokeHabbit(smokeHabbit: EnumAttribute.SmokingHabits): void 
    {
        this.smokeHabit = smokeHabbit;
    }
    setIllnesses(illnesses: EnumAttribute.Illness[]): void 
    {
        this.illnesses = illnesses;
    }
}