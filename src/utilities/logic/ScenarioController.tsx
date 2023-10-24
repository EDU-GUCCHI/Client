import { Storage } from '../data/Storage';
import { FormulaGenerator } from './FormulaGenerator';

export class ScenarioController
{
    // has logic classes and access to stored data
    private formulaGenerator: FormulaGenerator;
    private storage: Storage;
    
    // flow of program here:
    public constructor()
    {
        console.log("Controller: Runs")

        this.storage = new Storage();
        this.formulaGenerator = new FormulaGenerator();

        this.formulaGenerator.generateFormula(this.storage.getPerson());
    }
}