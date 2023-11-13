// sends out Events.
import {Event} from '../data/Event';
import { AutoType, EventType } from '../data/EventTypes';
import { Gotchi } from '../data/Gotchi';
import { UserInteractableEvent } from '../data/UserInteractableEvent';

export class eventDispatcher {
    //Should it have an instance of gotchi or should that be handled somewehere else?
    private _gotchi : Gotchi;
    //How do we want to handle ids?
    private _idCounter : number;

    public constructor(gotchi : Gotchi, idCounter : number){
        this._gotchi = gotchi;
        this._idCounter = 0;
    }
    get gotchi() : Gotchi{
        return this._gotchi;
    }
    get idCounter(){
        return this._idCounter;
    }

    //Create event with param values, answer values are optional
    public createEvent(id: number, autoType: AutoType, eventType: EventType, timeStamp: Date, bloodGlucoseChange: number, description: string, answerOptions?: [], correctAnswers?: []) {
        const event: Event =
    autoType === AutoType.USER_EVENT
      ? new UserInteractableEvent(
          id,
          autoType,
          eventType,
          timeStamp,
          bloodGlucoseChange,
          description,
          answerOptions || [],
          correctAnswers || []
        )
      : new Event(
          id,
          autoType,
          eventType,
          timeStamp,
          bloodGlucoseChange,
          description
        );

        this.dispatchEvent(event);
        return event;
    }

    public dispatchEvent(event : Event) {
        //how do we want to dispatch the event?

        //add event to storage
        //Send notifications from notificationDispatcher, this class knows nothing

        console.log(event);
    }

    //Add hardcoded events to use based on int or enum?
    chooseEventSwitch(eventNumber: number) {
        switch(eventNumber){
            case EventType.FOOD_INTAKE: 
                this.EatingEvent();
                break;
            case EventType.EXERCISE: 
                break;
            case EventType.BLOOD_GLUCOSE_WARNING: 
                break;
            case EventType.INSULIN_INJECTION:
                break;
            case EventType.SLEEP:
                break;
            default:
                console.log("Default case");
        }

    }
    EatingEvent() {
        const id = this._idCounter++;
        const autoType = AutoType.AUTO_EVENT;
        const eventType = EventType.FOOD_INTAKE;
        const timeStamp = new Date();
        const bloodGlucoseChange = 2;
        const description = "Gotchi ate a banana";

        this.createEvent(id, autoType, eventType, timeStamp, bloodGlucoseChange, description);
    }
}