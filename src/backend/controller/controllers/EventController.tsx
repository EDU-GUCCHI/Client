// sends out Events.
import {Event} from '../../model/event/Event';
import {AutoType, EventType} from '../../model/event/EventTypes';
import {Storage} from '../../model/Storage';
import {UserInteractableEvent} from '../../model/event/UserInteractableEvent';
import {AnswerOptions} from '../../model/event/AnswerOptions';
import {ScenarioController} from './ScenarioController';

export class EventController {
  private _storage: Storage;
  //How do we want to handle ids?
  private _idCounter: number;
  private _controller: ScenarioController;

  public constructor(storage: Storage, controller: ScenarioController) {
    this._storage = storage;
    this._idCounter = 0;
    this._controller = controller;
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
    this.lowBloodSugar();
  }

  //Create event with param values, answer values are optional
  //Add state if needed, maybe use optional param here instead of constructor in event?
  public createEvent(
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    description: string,
    symptomOptions?: AnswerOptions,
    causeOptions?: AnswerOptions,
    treatmentOptions?: AnswerOptions,
  ) {
    const event: Event =
      autoType === AutoType.USER_EVENT
        ? new UserInteractableEvent(
            autoType,
            eventType,
            timeStamp,
            description,
            symptomOptions || new AnswerOptions(),
            causeOptions || new AnswerOptions(),
            treatmentOptions || new AnswerOptions(),
          )
        : new Event(autoType, eventType, timeStamp, description);

    this.dispatchEvent(event);
    return event;
  }

  dispatchEvent(event: Event) {
    //add event to storage
    this._storage.addTriggeredEvent(event);
    //Send notifications from notificationDispatcher, this class knows nothing

    this._controller.intervalHandler.eventBasedFactor(event.eventType);
  }

  //Add hardcoded events to use based on int or enum?
  chooseEventSwitch(eventType: number) {
    switch (eventType) {
      case 0:
        this.eatingEvent();
        break;
      case 1:
        this.insulinEvent();
        break;
      //add more events that can be triggered by treatmentOptions.
      default:
        console.log('Default case');
    }
  }

  eatingEvent() {
    const autoType = AutoType.AUTO_EVENT;
    const eventType = EventType.FOOD_INTAKE;
    const timeStamp = new Date();
    const description = this.storage.person.name + ' Ate something';

    this.createEvent(autoType, eventType, timeStamp, description);
  }

  insulinEvent() {
    const autoType = AutoType.AUTO_EVENT;
    const eventType = EventType.INSULIN_INJECTION;
    const timeStamp = new Date();
    const description = this.storage.person.name + 'Took insulin';

    this.createEvent(autoType, eventType, timeStamp, description);
  }
  lowBloodSugar() {
    const autoType = AutoType.USER_EVENT;
    const eventType = EventType.BLOOD_GLUCOSE_WARNING;
    const timeStamp = new Date();
    const description = 'Lågt blodsocker';
    /* const symptomOptions = [
      {option: 'Svettig', correct: true, answered: false},
      {option: 'Svag', correct: true, answered: false},
      {option: 'Huvudvärk', correct: false, answered: false},
    ];
    const causeOptions = [
      {option: 'För lite insulin', correct: true, answered: false},
      {option: 'För mycket insulin', correct: false, answered: false},
      {option: 'För lite mat', correct: false, answered: false},
    ];
    const treatmentOptions = [
      {option: 'Ät något', correct: true, answered: false},
      {option: 'Ta insulin', correct: false, answered: false},
      {option: 'Vila', correct: false, answered: false},
    ]; */
    const symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: true, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: false, optionChosen: false},
    ]);
    const causeOptions = new AnswerOptions([
      {
        optionString: 'För lite insulin',
        optionCorrect: false,
        optionChosen: false,
      },
      {
        optionString: 'För mycket insulin',
        optionCorrect: false,
        optionChosen: false,
      },
      {optionString: 'För lite mat', optionCorrect: true, optionChosen: false},
    ]);
    const treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: true, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: false, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

    //console.log('Creating Low blood-sugar event');
    this.createEvent(
      autoType,
      eventType,
      timeStamp,
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
