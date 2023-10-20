import * as EnumAttribute from './EnumAttributes';

class Gotchi
{
    //Person attributes
    private name:           string;
    private bloodSugar:     number;
    private insulinPump:    boolean;
    private lchf:           boolean;
    
    //Enum-attributes
    private eatingHabit:    EnumAttribute.EatingHabit;
    private exercise:       EnumAttribute.Exercise;
    private weight:         EnumAttribute.Weight;
    private alcoholHabit:   EnumAttribute.AlcoholHabit;
    private smokingHabit:   EnumAttribute.SmokingHabit;
    private illnesses:      EnumAttribute.Illness[];

    public constructor
    (
        name:           string, 
        bloodSugar:     number, 
        insulinPump:    boolean,
        lchf:           boolean,
        illnesses:      EnumAttribute.Illness[], 
        smokingHabit:   EnumAttribute.SmokingHabit, 
        alcoholHabit:   EnumAttribute.AlcoholHabit, 
        weight:         EnumAttribute.Weight, 
        exercise:       EnumAttribute.Exercise, 
        eatingHabit:    EnumAttribute.EatingHabit
        )
    {
        this.name =         name;
        this.bloodSugar =   bloodSugar;
        this.insulinPump =  insulinPump;
        this.lchf =         lchf;
        this.illnesses =    illnesses;
        this.smokingHabit = smokingHabit;
        this.alcoholHabit = alcoholHabit;
        this.weight =       weight;
        this.exercise =     exercise;
        this.eatingHabit =  eatingHabit;
    }
    //getters-setters
    getName(): string 
    {
        return this.name;
    }
    
    getBloodValue(): number 
    {
        return this.bloodSugar;
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
        return this.eatingHabit;
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
        return this.smokingHabit;
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
        this.bloodSugar = bloodValue;
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
        this.eatingHabit = eatHabbit;
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
        this.smokingHabit = smokeHabbit;
    }
    
    setIllnesses(illnesses: EnumAttribute.Illness[]): void 
    {
        this.illnesses = illnesses;
    }
}