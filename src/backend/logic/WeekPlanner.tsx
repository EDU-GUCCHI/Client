import {Event} from '../data/event/Event';
import {AutoType, EventType} from '../data/event/EventTypes';
import {Gotchi} from '../data/gotchi/Gotchi';
import {Storage} from '../data/Storage';
import {EventDispatcher} from './event/EventDispatcher';
import {State} from './event/GotchiStateMachine';
import {EventQueue} from './EventQueue';

export class WeekPlanner {
  private _eventDispatcher: EventDispatcher;
  private _scheduledEventQueue: EventQueue;

  public constructor(eventDispatcher: EventDispatcher) {
    this._eventDispatcher = eventDispatcher;
    this._scheduledEventQueue = new EventQueue();
    this.testSchedule();
  }
  //Create scheduled event and add to the queue
  createScheduledEvent(
    id: number,
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    bloodGlucoseChange: number,
    description: string,
    state: State,
  ) {
    let scheduledEvent = new Event(
      id,
      autoType,
      eventType,
      timeStamp,
      bloodGlucoseChange,
      description,
      state,
    );
    this._scheduledEventQueue.addEvent(scheduledEvent);
    return scheduledEvent;
  }
  //Compare the current time to the Date on the earliest scheduled event, if the current time is past the one in the event, it triggers
  checkDate() {
    const peekedEvent = this._scheduledEventQueue.peek();

    if (peekedEvent) {
      const currentDate = new Date();
      if (currentDate.getTime() >= peekedEvent.timeStamp.getTime()) {
        this.triggerEvent();
        return true;
      }
    }
    // Return false if there is no peeked event
    return false;
  }
  //Dispatches the event, ie adds it to the event list in storage
  triggerEvent() {
    const eventToTrigger = this._scheduledEventQueue.getNextEvent();
    if (eventToTrigger) {
      this._eventDispatcher.dispatchEvent(eventToTrigger);
    }
  }
  //Just a random event that should trigger 20 seconds after calling.
  testSchedule() {
    const currentDate = new Date();
    this.createScheduledEvent(
      1,
      AutoType.AUTO_EVENT,
      EventType.FOOD_INTAKE,
      new Date(currentDate.getTime() + 20 * 1000),
      5,
      'Scheduled Event Test',
      State.Social,
    );
  }
}
