import { Storage } from '../data/Storage';
import { Clock } from './Clock';
import { FormulaGenerator } from './FormulaGenerator';

export class ScenarioController
{
    // has logic classes and access to stored data
    private formulaGenerator: FormulaGenerator;
    private storage: Storage;
    private clock: Clock;
    
    // flow of program here:
    public constructor()
    {
        console.log("Controller: Runs")

        this.storage = new Storage();
        this.formulaGenerator = new FormulaGenerator();
        this.clock = new Clock();

        this.storage.setBloodSugarFactor(this.formulaGenerator.generateFormula(this.storage.getPerson()));
        // start clock
        this.clock.startClock();
    }
}