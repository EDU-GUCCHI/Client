import { Gotchi } from "../../data/gotchi/Gotchi";
import {  } from "../../data/gotchi/FrequencyEnum"

export class FormulaGenerator
{
    private _baseline : number;

    public constructor() { 
        this._baseline = 1;
    }

    public generateFormula(person: Gotchi): number
    {   
        this._baseline = 0.1;
        for (let enumAttribute of person.staticValues()) {
            this._baseline *= enumAttribute.value;
        }
        /*
        let sum = 0;
        sum += person.alcoholHabit;
        sum += person.eatHabit;
        sum += person.exercise;
        sum += person.smokeHabit;
        sum += person.weight;
        let illnesses = person.illnesses;
        for(let sickness in illnesses)
        {
            sum += illnesses[sickness];
        }
        console.log("Generated factor: " + sum);
        return sum;*/
        return 0.1;
    }
    get baseline(): number 
    {
        return this._baseline;
    }
    set baseLine(baseline: number) 
    {
        this._baseline = baseline;
    }
    public static generateIncreaseFactor(): number
    {
        return 1;
    }
    public static generateDecreaseFactor(): number
    {
        return 1
    }
}