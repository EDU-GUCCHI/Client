import { AlcoholHabit, EatingHabit, Exercise, Illness, SmokingHabit, Weight } from '../data/EnumAttributes';
import { Gotchi } from "./Gotchi";

export class Storage
{
    // store/initialize all data storage classes here, ex: Gotchi

    private person: Gotchi;

    public constructor()
    {
        this.person = new Gotchi("subject",5,true,true, // create testsubject
            EatingHabit.CONSISTENT,
            Exercise.INACTIVE,
            Weight.NORMAL_WEIGHT,
            AlcoholHabit.SOCIAL_DRINKER,
            SmokingHabit.NON_SMOKER,
            [Illness.FEVER,Illness.PAIN]);
    }

    // getters-setters here
    getPerson(): Gotchi {
        return this.person;
    }

    setPerson(newPerson: Gotchi) {
        this.person = newPerson;
    }
}