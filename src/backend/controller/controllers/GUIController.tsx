import { Gotchi } from "../../model/gotchi/Gotchi";
import { Clock } from "../time/Clock";
import { ScenarioController } from "./ScenarioController";

/**
 * @type Controller
 * @description 
 * This class has the responsibility of communicating information
 * to the user interface. This class is injected into the GUI in order
 * to register to callbacks and to handle user-input from events.
 */

export class GUIController {
    private _controller: ScenarioController;
    private _clock: Clock;
    private _bloodSugarSubscribers: ((newBloodSugar: string) => void)[] = [];
    private _gotchisname: string;
    private _bloodSugarValues: number[];
    private _bsIndex: number;

    /**
     * Constructor for class
     * @param person takes the default-gotchi generated by @class 
     * Storage. Field is later updated by @class ScanarioController
     * after boot-up.
     */

    constructor(controller: ScenarioController, clock: Clock) {
        this._controller = controller;
        this._clock = clock;
        this._gotchisname = "";
        this._bloodSugarValues = [];
        this._bsIndex = 0;
    }

    /**
     * This method takes 
     * @param newBloodSugar new blood-glucose value to be set
     * and sets the value in the object of @class Gotchi. After-
     * wards it notifies the subscribers of that number effectively
     * updating the value in the GUI.
     */

    // fetch value from array and increment every 5 sec
    setBloodSugar() { // needs storage
        let newBloodSugar = this._bloodSugarValues[this._bsIndex];
        if(this._bsIndex == this._bloodSugarValues.length - 1) {
            this.stopUpdateBloodsugar();
        }
        if(this._bsIndex < this._bloodSugarValues.length) {
            this._bsIndex++;
        }
        this._controller.gotchiBloodValue = newBloodSugar;
        this.notifySubscribers(newBloodSugar.toFixed(1).toString());
    }
    public resetIndex() {
        this._bsIndex = 0;
    }

    /**
     * 
     * @param callback 
     * @returns 
     */

    subscribeToBloodSugar(callback: (newBloodSugar: string) => void) {
        this._bloodSugarSubscribers.push(callback);
        return () => {
            const index = this._bloodSugarSubscribers.indexOf(callback);
            if (index !== -1) {
                this._bloodSugarSubscribers.splice(index, 1);
            }
        };
    }
    private notifySubscribers(newBloodSugar: string) {
        this._bloodSugarSubscribers.forEach((callback) => {
            callback(newBloodSugar);
        });
    }

    /**
     * This method is responsible for taking input from the user
     * when selecting answers for @class UserInteractableEvent
     * @param buttonName name of the button that the user pressed
     */

    handleButtonAnswer(buttonName: String): void {
        // fetch current event and check if option is correct to that value
        console.log("handling button: " + buttonName);
        let correct = false;
        if (correct) {
            console.log("is correct");
        }
        else {
            console.log("is wrong");
        }
    }
    public startUpdateBloodsugar() {
        this._clock.addObserver(this);
        this._clock.startClock(); // start clock pulse
    }
    public stopUpdateBloodsugar() {
        this._clock.stopClock();
        this._clock.removeAllObservers();
    }

    /**
     * Getters, setters for fields
     */

    set gotchisName(newName: string) {
        this._gotchisname = newName;
    }
    set bloodSugarValues(values: number[]) {
        this._bloodSugarValues = values;
    }
    get gotchisName(): string {
        return this._gotchisname;
    }
    get person(): Gotchi {
        return this._controller.storage.person;
    }
    get bloodSugarSubscribers(): ((newBloodSugar: string) => void)[] {
        return this._bloodSugarSubscribers;
    }
}