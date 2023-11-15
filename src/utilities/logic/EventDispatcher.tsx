// sends out Events.
import {Event} from '../data/Event';
import { AutoType, EventType } from '../data/EventTypes';
import { Storage } from '../data/Storage';
import { UserInteractableEvent } from '../data/UserInteractableEvent';

export class EventDispatcher {
    private _storage : Storage;
    //How do we want to handle ids?
    private _idCounter : number;

    public constructor(storage : Storage){
        this._storage = storage;
        this._idCounter = 0;
        this.createEvent(
            this.idCounter,
            AutoType.AUTO_EVENT,
            EventType.NOTHING,
            new Date(),
            storage.person.bloodValue,
            "You started your week!");
    }
    get storage() {
        return this._storage;
    }
    get idCounter(){
        return this._idCounter;
    }

    //Create event with param values, answer values are optional
    public createEvent(id: number, autoType: AutoType, eventType: EventType, timeStamp: Date, bloodGlucoseChange: number, description: string, symptomOptions?: [], correctSymptoms?: [], causeOptions?: [], correctCauses?: [], treatmentOptions?: [], correctTreatments?: []) {
        const event: Event =
    autoType === AutoType.USER_EVENT
      ? new UserInteractableEvent(
          id,
          autoType,
          eventType,
          timeStamp,
          bloodGlucoseChange,
          description,
          symptomOptions || [],
          correctSymptoms || [],
          causeOptions || [],
          correctCauses || [],
          treatmentOptions || [],
          correctTreatments || []
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
        this._storage.addTriggeredEvent(event);
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
    /* BloodGlucoseWarningEvent() {

    const id = 1;
    const autoType = AutoType.USER_EVENT;
    const eventType = EventType.BLOOD_GLUCOSE_WARNING;
    const timeStamp = new Date();
    const bloodGlucoseChange = 10;
    const description = 'Sample UserInteractableEvent';

    const symptomOptions = ['Option 1', 'Option 2', 'Option 3'];
    const correctSymptoms = [true, false, false];

    const causeOptions = ['Cause Option 1', 'Cause Option 2', 'Cause Option 3'];
    const correctCauses = [false, true, false];

    const treatmentOptions = ['Treatment Option 1', 'Treatment Option 2', 'Treatment Option 3'];
    const correctTreatments = [false, false, true];

    const createdEvent = this.createEvent(id, autoType, eventType, timeStamp, bloodGlucoseChange, description, symptomOptions, correctSymptoms, causeOptions, correctCauses, treatmentOptions,
        correctTreatments
    );  
    } */
}