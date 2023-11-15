import { Gotchi } from "../data/Gotchi";
import { Storage } from "../data/Storage";

export class WeekPlanner {
    private _storage: Storage;
    private _gotchi: Gotchi;

    public constructor(storage: Storage, gotchi: Gotchi){
        this._storage = storage;
        this._gotchi = gotchi;
    }


}