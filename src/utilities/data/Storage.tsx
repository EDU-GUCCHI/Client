import { AlcoholHabit, EatingHabit, Exercise, Illness, SmokingHabit, Weight } from '../data/EnumAttributes';
import { Gotchi } from "./Gotchi";
import { newGotchi } from './GotchiRandomizer';

export class Storage
{
    // store/initialize all data storage classes here, ex: Gotchi
    private person: Gotchi;
    private bloodSugarFactor: number;
    public constructor(gotchiName: string)
    {
        this.person = newGotchi(gotchiName);

        console.log("> Gotchi Created" + this.person.stringRepresentation());
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