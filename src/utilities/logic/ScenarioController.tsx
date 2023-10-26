import { Storage } from '../data/Storage';
import { Clock } from './Clock';
import { FormulaGenerator } from './FormulaGenerator';
import { IntervallHandler } from './IntervalHandler';

export class ScenarioController
{
    // has logic classes and access to stored data
    private formulaGenerator: FormulaGenerator;
    private storage: Storage;
    private clock: Clock;
    private intervalHandler: IntervallHandler;
    // flow of program here:
    public constructor()
    {
        console.log("Controller: Runs")
        // instantiate classes
        this.storage = new Storage();
        this.formulaGenerator = new FormulaGenerator();
        this.intervalHandler = new IntervallHandler(this.storage.getPerson());
        this.clock = new Clock();
        // app flow
        this.clock.addObserver(this.intervalHandler);
        this.storage.setBloodSugarFactor(this.formulaGenerator.generateFormula(this.storage.getPerson()));
        this.intervalHandler.setFactor(this.storage.getBloodSugarFactor());
        this.clock.startClock(); // start clock pulse
    }
}