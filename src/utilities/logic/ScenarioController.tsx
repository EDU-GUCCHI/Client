import { Storage } from '../data/Storage';
import { Clock } from './Clock';
import { FormulaGenerator } from './FormulaGenerator';
import { GUIController } from './GUIController';
import { IntervallHandler } from './IntervalHandler';
import { NotificationDispatcher } from './NotificationDispatcher';

export class ScenarioController
{
    // has logic classes and access to stored data
    private _formulaGenerator: FormulaGenerator;
    private _storage: Storage;
    private _clock: Clock;
    private _intervalHandler: IntervallHandler;
    private _GUIController: GUIController;
    private _notificationDispatcher: NotificationDispatcher
    // flow of program here:
    public constructor()
    {
        console.log("Controller: Created");
        // instantiate classes
        this._storage = new Storage();
        this._GUIController = new GUIController(this._storage);
        this._formulaGenerator = new FormulaGenerator();
        this._notificationDispatcher = new NotificationDispatcher();
        this._intervalHandler = new IntervallHandler(this._storage.person, this._GUIController, this._notificationDispatcher);
        this._clock = new Clock();
    }

    public run()
    {
        console.log("Controller: Runs");
        // app flow
        this._clock.addObserver(this._intervalHandler);
        this._storage.bloodSugarFactor = this._formulaGenerator.generateFormula(this._storage.person);
        this._intervalHandler.factor = this._storage.bloodSugarFactor;
        this._clock.startClock(); // start clock pulse
    }
    public terminate()
    {
        console.log("Controller: Terminates");
        this._clock.stopClock();
    }

    get GUIController(): GUIController 
    {
        return this._GUIController;
    }
    get storage(): Storage 
    {
        return this._storage;
    }
}
