// sends out Events.
import { Event } from '../../data/event/Event';
import { AutoType, EventType } from '../../data/event/EventTypes';
import { Storage } from '../../data/Storage';
import { UserInteractableEvent } from '../../data/event/UserInteractableEvent';

export class EventDispatcher {
    private _storage : Storage;
    //How do we want to handle ids?
    private _idCounter : number;

    public constructor(storage : Storage){
        this._storage = storage;
        this._idCounter = 0;
    }
    get storage() {
        return this._storage;
    }
    get idCounter(){
        return this._idCounter;
    }

    public pointOfEntryEvent() {
        this.createEvent(
            this.idCounter,
            AutoType.AUTO_EVENT,
            EventType.NOTHING,
            new Date(),
            this.storage.person.bloodValue,
            'Du började din vecka!',
          );
    }

    //Create event with param values, answer values are optional
    public createEvent(
        id: number, 
        autoType: AutoType, 
        eventType: EventType, 
        timeStamp: Date, 
        bloodGlucoseChange: number, 
        description: string, 
        symptomOptions?: [], 
        correctSymptoms?: [], 
        causeOptions?: [], 
        correctCauses?: [], 
        treatmentOptions?: [], 
        correctTreatments?: []) {

        const event: Event = autoType === AutoType.USER_EVENT ? new UserInteractableEvent(
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
          correctTreatments || []) 
          : new Event (
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
                this.LowBloodSugar();
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
        const description = this.storage.person.name + " ate a banana";

        this.createEvent(id, autoType, eventType, timeStamp, bloodGlucoseChange, description);
    }
    LowBloodSugar() {
        const id = this._idCounter++;
        const autoType = AutoType.USER_EVENT;
        const eventType = EventType.BLOOD_GLUCOSE_WARNING;
        const timeStamp = new Date();
        const bloodGlucoseChange = -2;
        const description = this.storage.person.name + " has low blood sugar";
        console.log("Creating Low blood-sugar event")
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