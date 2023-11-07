// responsibility of fetching/storing and displaying data in GUI
import { Gotchi } from "../data/Gotchi";
import { Storage } from "../data/Storage";

export class GUIController {
  private _storage: Storage;
    private _person: Gotchi;
    private _bloodSugarSubscribers: ((newBloodSugar: string) => void)[] = [];

    constructor(storage: Storage) {
        this._storage = storage;
        this._person = this._storage.person;
    }

    setBloodSugar(newBloodSugar: number) {
        this._person.bloodValue = newBloodSugar;
        this.notifySubscribers(newBloodSugar.toString());
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
