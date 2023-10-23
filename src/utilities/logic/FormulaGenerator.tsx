import { Gotchi } from "../data/Gotchi";

export class FormulaGenerator
{
    public constructor()
    {
    }

    public generateFormula(person: Gotchi): number
    {
        let factor = person.getAlcoholHabbit();
        console.log("generated factor: " + factor);
        // const colorValueArray = Object.values(Colors);
        return factor;
    }
}