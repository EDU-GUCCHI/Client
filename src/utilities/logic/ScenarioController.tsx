import { Storage } from '../data/Storage';
import { FormulaGenerator } from './FormulaGenerator';

export class ScenarioController
{

    //private gotchi: Gotchi;
    
    /*
    public constructor(gotchi: Gotchi)
    {
        this.gotchi = new Gotchi(); // use randomGenerator returnObject here!
    }
    */
    //controlls entire flow of app logic (has access to all data modules)


    //this section for testing code, Comment out when not testing!

    // has logic classes and accessed to stored data
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