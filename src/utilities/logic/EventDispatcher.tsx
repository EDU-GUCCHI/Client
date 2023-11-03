// sends out Events.
import {Event} from '../data/Event';
import { AutoType, EventType } from '../data/EventTypes';
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
    public createEvent(autoType: AutoType, eventType: EventType, bloodGlucoseChange: number): Event {
        const id = Math.floor(Math.random() * 1000); //Change if we should use IDs to something that will be unique
        const timeStamp = new Date(); //Current date and time
        const event = new Event(id, autoType, eventType, timeStamp, bloodGlucoseChange);

        this.dispatchEvent(event);
        return event;
    }

    public dispatchEvent(event : Event) {
        //how do we want to dispatch the event?
        console.log(event);
    }
}