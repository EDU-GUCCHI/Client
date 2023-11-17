import { Gotchi } from "../../data/gotchi/Gotchi";
import { Storage } from "../../data/Storage";

export class GUIController { // responsibility of fetching/storing and displaying data in GUI
    private _storage: Storage;
    private _person: Gotchi;
    private _bloodSugarSubscribers: ((newBloodSugar: string) => void)[] = [];

    constructor(storage: Storage) {
        this._storage = storage;
        this._person = this._storage.person;
    }

    updateGotchi(name : string) {
        this._storage.person.name = name;
        this._person = this._storage.person;
        console.log("Gotchi: Updated");
        console.log(JSON.stringify(this._person));
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

    get storage(): Storage 
    {
        return this._storage;
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