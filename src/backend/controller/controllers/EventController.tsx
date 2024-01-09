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
    this.demoEvents();
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
    const description = this.storage.person.name + ' Tog något att äta';

    this.createEvent(autoType, eventType, timeStamp, description);
  }

  insulinEvent() {
    const autoType = AutoType.AUTO_EVENT;
    const eventType = EventType.INSULIN_INJECTION;
    const timeStamp = new Date();
    const description = this.storage.person.name + 'Injicerade insulin';

    this.createEvent(autoType, eventType, timeStamp, description);
  }
  lowBloodSugar() {
    const autoType = AutoType.USER_EVENT;
    const eventType = EventType.BLOOD_GLUCOSE_WARNING;
    const timeStamp = new Date();
    const description = 'Lågt blodsocker';

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
  demoEvents() {
    let autoType = AutoType.USER_EVENT;
    let eventType = EventType.BLOOD_GLUCOSE_WARNING;
    let timeStamp = new Date('2024-01-08T12:15:00');
    let description = 'Högt blodsocker';

    let symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: false, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: true, optionChosen: false},
    ]);
    let causeOptions = new AnswerOptions([
      {
        optionString: 'För lite insulin',
        optionCorrect: true,
        optionChosen: false,
      },
      {
        optionString: 'För mycket insulin',
        optionCorrect: false,
        optionChosen: false,
      },
      {optionString: 'För lite mat', optionCorrect: false, optionChosen: false},
    ]);
    let treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: false, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: true, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

    this.createEvent(
      autoType,
      eventType,
      timeStamp,
      description,
      symptomOptions,
      causeOptions,
      treatmentOptions,
    );

    autoType = AutoType.USER_EVENT;
    eventType = EventType.BLOOD_GLUCOSE_WARNING;
    timeStamp = new Date('2024-01-08T15:12:00');
    description = 'Lågt blodsocker';

    symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: true, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: false, optionChosen: false},
    ]);
    causeOptions = new AnswerOptions([
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
    treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: true, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: false, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

    this.createEvent(
      autoType,
      eventType,
      timeStamp,
      description,
      symptomOptions,
      causeOptions,
      treatmentOptions,
    );
    autoType = AutoType.USER_EVENT;
    eventType = EventType.BLOOD_GLUCOSE_WARNING;
    timeStamp = new Date('2024-01-09T09:15:00');
    description = 'Lågt blodsocker';

    symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: true, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: false, optionChosen: false},
    ]);
    causeOptions = new AnswerOptions([
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
    treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: true, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: false, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

    this.createEvent(
      autoType,
      eventType,
      timeStamp,
      description,
      symptomOptions,
      causeOptions,
      treatmentOptions,
    );
    autoType = AutoType.USER_EVENT;
    eventType = EventType.BLOOD_GLUCOSE_WARNING;
    timeStamp = new Date('2024-01-09T17:35:00');
    description = 'Högt blodsocker';

    symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: false, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: true, optionChosen: false},
    ]);
    causeOptions = new AnswerOptions([
      {
        optionString: 'För lite insulin',
        optionCorrect: true,
        optionChosen: false,
      },
      {
        optionString: 'För mycket insulin',
        optionCorrect: false,
        optionChosen: false,
      },
      {optionString: 'För lite mat', optionCorrect: false, optionChosen: false},
    ]);
    treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: false, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: true, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

    this.createEvent(
      autoType,
      eventType,
      timeStamp,
      description,
      symptomOptions,
      causeOptions,
      treatmentOptions,
    );
    autoType = AutoType.USER_EVENT;
    eventType = EventType.BLOOD_GLUCOSE_WARNING;
    timeStamp = new Date('2024-01-10T12:15:00');
    description = 'Lågt blodsocker';

    symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: true, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: false, optionChosen: false},
    ]);
    causeOptions = new AnswerOptions([
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
    treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: true, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: false, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

    this.createEvent(
      autoType,
      eventType,
      timeStamp,
      description,
      symptomOptions,
      causeOptions,
      treatmentOptions,
    );
    autoType = AutoType.USER_EVENT;
    eventType = EventType.BLOOD_GLUCOSE_WARNING;
    timeStamp = new Date('2024-01-11T14:05:00');
    description = 'Lågt blodsocker';

    symptomOptions = new AnswerOptions([
      {optionString: 'Svettig', optionCorrect: true, optionChosen: false},
      {optionString: 'Svag', optionCorrect: true, optionChosen: false},
      {optionString: 'Huvudvärk', optionCorrect: false, optionChosen: false},
    ]);
    causeOptions = new AnswerOptions([
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
    treatmentOptions = new AnswerOptions([
      {optionString: 'Ät något', optionCorrect: true, optionChosen: false},
      {optionString: 'Ta insulin', optionCorrect: false, optionChosen: false},
      {optionString: 'Vila', optionCorrect: false, optionChosen: false},
    ]);

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
}
