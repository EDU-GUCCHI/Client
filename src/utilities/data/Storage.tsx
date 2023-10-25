import { AlcoholHabit, EatingHabit, Exercise, Illness, SmokingHabit, Weight } from '../data/EnumAttributes';
import { Gotchi } from "./Gotchi";

export class Storage
{
    // store/initialize all data storage classes here, ex: Gotchi
    private person: Gotchi;
    private bloodSugarFactor: number;
    public constructor()
    {
        this.person = new Gotchi("subject",5,true,true, // create testsubject
            EatingHabit.CONSISTENT,
            Exercise.INACTIVE,
            Weight.NORMAL_WEIGHT,
            AlcoholHabit.SOCIAL_DRINKER,
            SmokingHabit.NON_SMOKER,
            [Illness.FEVER,Illness.PAIN]);
        
        this.bloodSugarFactor = 0.0;
    }
    // getters-setters here
    getPerson(): Gotchi 
    {
        return this.person;
    }
    setPerson(newPerson: Gotchi) 
    {
        this.person = newPerson;
    }
    getBloodSugarFactor(): number
    {
        return this.bloodSugarFactor;
    }
    setBloodSugarFactor(factor: number)
    {
        this.bloodSugarFactor = factor;
    }
}