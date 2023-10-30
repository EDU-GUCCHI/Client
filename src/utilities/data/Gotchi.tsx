import {EatingHabit,Exercise,Weight,AlcoholHabit,SmokingHabit,Illness, Gender} from './EnumAttributes';

export class Gotchi
{
    //Person attributes
    private name:           string;
    private age:            number;
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
    private gender;         Gender: any;

    //add age and gender to constructor and getters/setters
    public constructor
    (
        name:           string,
        age:            number,
        bloodSugar:     number, 
        insulinPump:    boolean,
        lchf:           boolean,
        eatingHabit:    EatingHabit,
        exercise:       Exercise,
        weight:         Weight,
        alcoholHabit:   AlcoholHabit,
        smokingHabit:   SmokingHabit,
        illnesses:      Illness[],
        gender:         Gender,
        )
    {
        this.name =         name;
        this.age =          age;
        this.bloodSugar =   bloodSugar;
        this.insulinPump =  insulinPump;
        this.lchf =         lchf;
        this.illnesses =    illnesses;
        this.smokingHabit = smokingHabit;
        this.alcoholHabit = alcoholHabit;
        this.weight =       weight;
        this.exercise =     exercise;
        this.eatingHabit =  eatingHabit;
        this.gender =       gender;
    }
    //getters-setters
    getName(): string 
    {
        return this.name;
    }
    getAge(): number
    {
        return this.age;
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
    getGender(): Gender
    {
        return this.gender;
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