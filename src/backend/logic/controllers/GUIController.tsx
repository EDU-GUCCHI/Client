import { Gotchi } from "../../data/gotchi/Gotchi";
import { Storage } from "../../data/Storage";

export class GUIController { // responsibility of fetching/storing and displaying data in GUI
    private _person: Gotchi;
    private _bloodSugarSubscribers: ((newBloodSugar: string) => void)[] = [];
    private _gotchisname: string;

    constructor(person: Gotchi) {
        this._person = person;
        this._gotchisname = "";
    }

    setBloodSugar(newBloodSugar: number) {
        this._person.bloodValue = newBloodSugar;
        this.notifySubscribers(newBloodSugar.toFixed(1).toString());
    }
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
    handleButtonAnswer(buttonName: String): void
    {
        // fetch current event and check if option is correct to that value
        console.log("handling button: " + buttonName);
        let correct = false;
        if(correct)
        {
            console.log("is correct");
        }
        else
        {
            console.log("is wrong");
        }
    }

    set gotchisName(newName: string)
    {
        this._gotchisname = newName;
    }
    get gotchisName(): string
    {
        return this._gotchisname;
    }
    get person(): Gotchi 
    {
        return this._person;
    }
    get bloodSugarSubscribers(): ((newBloodSugar: string) => void)[] 
    {
        return this._bloodSugarSubscribers;
    }
}