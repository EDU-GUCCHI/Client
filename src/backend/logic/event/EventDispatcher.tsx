// sends out Events.
import {Event} from '../../data/event/Event';
import {AutoType, EventType} from '../../data/event/EventTypes';
import {Storage} from '../../data/Storage';
import {UserInteractableEvent} from '../../data/event/UserInteractableEvent';

export class EventDispatcher {
  private _storage: Storage;
  //How do we want to handle ids?
  private _idCounter: number;

  public constructor(storage: Storage) {
    this._storage = storage;
    this._idCounter = 0;
  }

  get storage() {
    return this._storage;
  }

  get idCounter() {
    return this._idCounter;
  }

  public pointOfEntryEvent() {
    /*     this.createEvent(
      this.idCounter,
      AutoType.AUTO_EVENT,
      EventType.BLOOD_GLUCOSE_WARNING,
      new Date(),
      this.storage.person.bloodValue,
      'Lågt blodsocker',
    ); 
    this.createEvent(
      this.idCounter,
      AutoType.USER_EVENT,
      EventType.BLOOD_GLUCOSE_WARNING,
      new Date(),
      this.storage.person.bloodValue,
      'Lågt blodsocker',
    );*/
    this.LowBloodSugar(); // What id does this one have? Get it from the storage?
    this.LowBloodSugar();
    this.LowBloodSugar();
    this.LowBloodSugar();
  }

  //Create event with param values, answer values are optional
  public createEvent(
    id: number,
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    bloodGlucoseChange: number,
    description: string,
    symptomOptions?: object,
    causeOptions?: object,
    treatmentOptions?: object,
  ) {
    const event: Event =
      autoType === AutoType.USER_EVENT
        ? new UserInteractableEvent(
            id,
            autoType,
            eventType,
            timeStamp,
            bloodGlucoseChange,
            description,
            symptomOptions || {},
            causeOptions || {},
            treatmentOptions || {},
          )
        : new Event(
            id,
            autoType,
            eventType,
            timeStamp,
            bloodGlucoseChange,
            description,
          );

    this.dispatchEvent(event);
    return event;
  }

  public dispatchEvent(event: Event) {
    //how do we want to dispatch the event?

    //add event to storage
    this._storage.addTriggeredEvent(event);
    //Send notifications from notificationDispatcher, this class knows nothing

    console.log(event);
  }

  //Add hardcoded events to use based on int or enum?
  chooseEventSwitch(eventNumber: number) {
    switch (eventNumber) {
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
        console.log('Default case');
    }
  }

  EatingEvent() {
    const id = this._idCounter++;
    const autoType = AutoType.AUTO_EVENT;
    const eventType = EventType.FOOD_INTAKE;
    const timeStamp = new Date();
    const bloodGlucoseChange = 2;
    const description = this.storage.person.name + ' ate a banana';

    this.createEvent(
      id,
      autoType,
      eventType,
      timeStamp,
      bloodGlucoseChange,
      description,
    );
  }

  LowBloodSugar() {
    const id = this._idCounter++;
    const autoType = AutoType.USER_EVENT;
    const eventType = EventType.BLOOD_GLUCOSE_WARNING;
    const timeStamp = new Date();
    const bloodGlucoseChange = -2;
    const description = 'Lågt blodsocker';
    const treatmentOptions = [
      {option: 'Ät mer mat', correct: false, answered: false}, // TODO: Change answered to true when event is submitted, only apply to the options that are selected by the user
      {option: 'Ta insulin', correct: false, answered: false},
      {option: 'Läsk eller druvsocker', correct: true, answered: false},
    ];
    const symptomOptions = [
      {option: 'Svettningar', correct: true, answered: false},
      {option: 'Törst', correct: false, answered: false},
      {option: 'Hjärtklappningar', correct: true, answered: false},
      {option: 'Konfusion', correct: true, answered: false},
      {option: 'Ökad urinproduktion', correct: false, answered: false},
      {option: 'Sluddrigt tal', correct: true, answered: false},
      {option: 'Krampanfall', correct: true, answered: false},
    ];
    const causeOptions = [
      {option: 'Feber', correct: false, answered: false},
      {option: 'För mycket insulin', correct: true, answered: false},
      {option: 'Dåligt intag av kolhydrater', correct: true, answered: false},
      {option: 'Alkoholintag', correct: true, answered: false},
      {option: 'Träning', correct: true, answered: false},
      {option: 'Smärtor', correct: false, answered: false},
      {option: 'Kortison', correct: false, answered: false},
      {option: 'Brist på kortisol', correct: true, answered: false},
      {option: 'Stress', correct: false, answered: false},
    ];
    const eventAnswered = false; // TODO: Change to true when event answers are submitted

    console.log('Creating Low blood-sugar event');
    console.log('Event is answered: ', eventAnswered);
    this.createEvent(
      id,
      autoType,
      eventType,
      timeStamp,
      bloodGlucoseChange,
      description,
      symptomOptions,
      causeOptions,
      treatmentOptions,
    );
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
