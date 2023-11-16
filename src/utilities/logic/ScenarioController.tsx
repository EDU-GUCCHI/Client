import { Gotchi } from '../data/gotchi/Gotchi';
import { Storage } from '../data/Storage';
import { Clock } from './Clock';
import { EventDispatcher } from './EventDispatcher';
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
    private _notificationDispatcher: NotificationDispatcher;
    private _eventDispatcher: EventDispatcher;
    // flow of program here:
    public constructor()
    {
        console.log("Controller: Created");
        // instantiate classes
        this._storage = new Storage();
        this._GUIController = new GUIController(this._storage);
        this._formulaGenerator = new FormulaGenerator();
        this._notificationDispatcher = new NotificationDispatcher();
        this._eventDispatcher = new EventDispatcher(this._storage);
        this._clock = new Clock();
        this._intervalHandler = new IntervallHandler(this._storage.person, this._GUIController, this._notificationDispatcher, this._eventDispatcher, this._clock);
    }

    public run()
    {
        console.log("Controller: Runs");
        // app flow
        this._clock.addObserver(this._intervalHandler);
        this._storage.bloodSugarFactor = this._formulaGenerator.generateFormula(this._storage.person);
        this._intervalHandler.factor = this._storage.bloodSugarFactor;
        this._clock.startClock(); // start clock pulse
        this._eventDispatcher.pointOfEntryEvent();
    }
    public terminate()
    {
        // end scenario
        console.log("Controller: Terminated");
        this._clock.stopClock();
        //refresh classes for possible new scenario
        this._storage = new Storage();
        this._GUIController = new GUIController(this._storage);
        this._formulaGenerator = new FormulaGenerator();
        this._notificationDispatcher = new NotificationDispatcher();
        this._eventDispatcher = new EventDispatcher(this._storage);
        this._clock = new Clock();
        this._intervalHandler = new IntervallHandler(this._storage.person, this._GUIController, this._notificationDispatcher, this._eventDispatcher, this._clock);
    }

    get GUIController(): GUIController 
    {
        return this._GUIController;
    }
    get storage(): Storage 
    {
        return this._storage;
    }
    get eventDispatcher() {
        return this._eventDispatcher;
    }
}
