// sends out Events.
import {Event} from '../data/Event';
import { Gotchi } from '../data/Gotchi';

export class eventDispatcher {
    //Should it have an instance of gotchi or should that be handled somewehere else?
    private _gotchi : Gotchi;

    public constructor(gotchi : Gotchi){
        this._gotchi = gotchi;
    }
    get gotchi() : Gotchi{
        return this._gotchi;
    }

    //Functions to create and dispatch events?

    //param: information needed for event construction
    public createEvent() {
        //const event = new Event(...);
    }

    public dispatchEvent(event : Event) {
        //switch case based on event type?
        //call the appropriate event method in the cases
    }

    public eatingEvent() {

    }
    public trainingEvent() {

    }
}