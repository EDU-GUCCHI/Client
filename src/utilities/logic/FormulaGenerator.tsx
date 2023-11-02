import { Gotchi } from "../data/Gotchi";

export class FormulaGenerator
{
    public constructor()
    {
    }
    public generateFormula(person: Gotchi): number
    {
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
        console.log("generated factor: " + sum);
        return sum;
    }
    public generateIncreaseFactor(): number
    {
        return 0;
    }
    public generateDecreaseFactor(): number
    {
        return 0;
    }
}