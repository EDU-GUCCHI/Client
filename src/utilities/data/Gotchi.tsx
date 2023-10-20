import {EatingHabit,Exercise,Weight,AlcoholHabit,SmokingHabit,Illness} from './EnumAttributes';

export class Gotchi
{
    //Person attributes
    private name:           string;
    private bloodSugar:     number;
    private insulinPump:    boolean;
    private lchf:           boolean;
    //Enum-attributes
    private eatingHabit:    EatingHabit;
    private exercise:       Exercise;
    private weight:         Weight;
    private alcoholHabit:   AlcoholHabit;
    private smokingHabit:   SmokingHabit;
    private illnesses:      Illness[];

    public constructor
    (
        name:           string, 
        bloodSugar:     number, 
        insulinPump:    boolean,
        lchf:           boolean,
        illnesses:      Illness[], 
        smokingHabit:   SmokingHabit, 
        alcoholHabit:   AlcoholHabit, 
        weight:         Weight, 
        exercise:       Exercise, 
        eatingHabit:    EatingHabit
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
    getEatHabbit(): EatingHabit 
    {
        return this.eatingHabit;
    }
    getExercise(): Exercise 
    {
        return this.exercise;
    }
    getWeight(): Weight
    {
        return this.weight;
    } 
    getAlcoholHabbit(): AlcoholHabit
    {
        return this.alcoholHabit;
    }
    getSmokeHabbit(): SmokingHabit 
    {
        return this.smokingHabit;
    }
    getIllnesses(): Illness[] 
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
    setEatHabbit(eatHabbit: EatingHabit): void 
    {
        this.eatingHabit = eatHabbit;
    }
    setExercise(exercise: Exercise): void 
    {
        this.exercise = exercise;
    }
    setWeight(weight: Weight): void 
    {
        this.weight = weight;
    }
    setAlcoholHabbit(alcoholHabbit: AlcoholHabit): void 
    {
        this.alcoholHabit = alcoholHabbit;
    }
    setSmokeHabbit(smokeHabbit: SmokingHabit): void 
    {
        this.smokingHabit = smokeHabbit;
    }
    setIllnesses(illnesses: Illness[]): void 
    {
        this.illnesses = illnesses;
    }
}