// sends out Events.
import {Event} from '../data/Event';
import { AutoType, EventType } from '../data/EventTypes';
import { Gotchi } from '../data/Gotchi';
import { UserInteractableEvent } from '../data/UserInteractableEvent';

export class eventDispatcher {
    //Should it have an instance of gotchi or should that be handled somewehere else?
    private _gotchi : Gotchi;
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

    //What do we use the AutoType for?
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

        //Add event to storage if we want to store triggered events
        this.dispatchEvent(event);
        return event;
    }

    public dispatchEvent(event : Event) {
        //how do we want to dispatch the event?
        //Send notifications directly from this class OR pass this class and the notifications hook to a screen (or something else) to handle it from there (seperation of concerns)

        console.log(event);
    }

    //Add hardcoded events to use based on int or enum?
    chooseEventSwitch(eventNumber: number) {
        switch(eventNumber){
            case 1: 
                this.EatingEvent();
                break;
            case 2: 
                break;
            case 3: 
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