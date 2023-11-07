import { AlcoholHabit, EatingHabit, Exercise, Illness, SmokingHabit, Weight } from '../data/EnumAttributes';
import { Gotchi } from "./Gotchi";
import { newGotchi } from './GotchiRandomizer';

export class Storage
{
    // store/initialize all data storage classes here, ex: Gotchi
    private _person: Gotchi;
    private _bloodSugarFactor: number;

    public constructor()
    {
        this._person = newGotchi("subject");
        this._bloodSugarFactor = 0.0;

        //console.log("> Gotchi Created" + this.person.stringRepresentation());
        //this.person = gotchi;
    }
    // getters-setters here
    get person(): Gotchi {
        return this._person;
    }

    set person(newPerson: Gotchi) {
        this._person = newPerson;
    }

    get bloodSugarFactor(): number {
        return this._bloodSugarFactor;
    }

    set bloodSugarFactor(factor: number) {
        this._bloodSugarFactor = factor;
    }
}