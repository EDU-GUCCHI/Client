import { Gotchi } from "../data/Gotchi";

export class FormulaGenerator
{
    public constructor()
    {
    }
    public generateFormula(person: Gotchi): number
    {
        let sum = 0;
        sum += person.getAlcoholHabbit();
        sum += person.getEatHabbit();
        sum += person.getExercise();
        sum += person.getSmokeHabbit();
        sum += person.getWeight();
        let illnesses = person.getIllnesses();
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