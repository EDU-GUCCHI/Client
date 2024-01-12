import { Event } from '../../model/event/Event';
import { AutoType, EventType } from '../../model/event/EventTypes';
import { Storage } from '../../model/Storage';
import { UserInteractableEvent } from '../../model/event/UserInteractableEvent';
import { AnswerOptions } from '../../model/event/AnswerOptions';
import { ScenarioController } from './ScenarioController';

/**
 * @type Controller
 * @description This class is responsible for creating and dispatching
 * event for storage. Events are distinct from notifications.
 */
export class EventController {
  private _storage: Storage;
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
  /*
   * This method creates a base-event acting as visual aids for the end-user
   * when they start the week. It's simply a visual indicator that events 
   * are saved in a given position in the GUI.
   */
  public pointOfEntryEvent() {
    this.createEvent(
      AutoType.AUTO_EVENT,
      EventType.NOTHING,
      new Date(),
      "Du påbörjade veckan!"
    );
  }

  /**
   * This method takes
   * @param autoType User interactable or not
   * @param eventType Type of event
   * @param timeStamp Date and time of the event
   * @param description Description of the event
   * @param symptomOptions Optional list of symptoms
   * @param causeOptions Optional list of causes
   * @param treatmentOptions Optional list of treatments
   * @returns @class Event, either UserInteractable or parent class
   * 
   * In effect, a general method for creating events. 
   */
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

  /**
   * This method adds the given event to storage for further purposes
   * @param event to be added
   */
  dispatchEvent(event: Event) {
    this._storage.addTriggeredEvent(event);
    this._controller.intervalHandler.eventBasedFactor(event.eventType);
  }

  /**
   * This method takes an eventType and sends out an event based
   * on the type.
   * @param eventType the type of event. 
   */
  chooseEventSwitch(eventType: number) {
    switch (eventType) {
      case 0:
        this.eatingEvent();
        break;
      case 1:
        this.insulinEvent();
        break;
      // Possibility to add more event types here
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

  /**
   * @constant Hard-coded method for sending out low blood-sugar warnings. 
   * Data-types and structure are clearly visible here.
   */
  lowBloodSugar() {
    const autoType = AutoType.USER_EVENT;
    const eventType = EventType.BLOOD_GLUCOSE_WARNING;
    const timeStamp = new Date();
    const description = 'Lågt blodsocker';

    const symptomOptions = new AnswerOptions([
      { optionString: 'Svettig', optionCorrect: true, optionChosen: false },
      { optionString: 'Svag', optionCorrect: true, optionChosen: false },
      { optionString: 'Huvudvärk', optionCorrect: false, optionChosen: false },
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
      { optionString: 'För lite mat', optionCorrect: true, optionChosen: false },
    ]);
    const treatmentOptions = new AnswerOptions([
      { optionString: 'Ät något', optionCorrect: true, optionChosen: false },
      { optionString: 'Ta insulin', optionCorrect: false, optionChosen: false },
      { optionString: 'Vila', optionCorrect: false, optionChosen: false },
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
