import { AutoType, EventType } from './EventTypes';

/**
 * @type Model
 * @description
 * Container class representing timestamped events which the 
 * Gotchi performs during a week. These are markedly uninteractable 
 * as per the inheriting @class UserInteractableEvent. 
 */

export class Event {

  private readonly _autoType: AutoType;
  private readonly _eventType: EventType;
  private readonly _timeStamp: Date;
  private readonly _description: string;

  /**
   * 
   * @param autoType The type of event for the purpose 
   * of @class IntervalHandler to know what to send to the
   * GUI.
   * @param eventType The type of event for the purpose
   * of @class Intervalhandler to know what to send to the 
   * GUI in terms of text-content and forms.
   * @param timeStamp When the event is to be scheduled
   * @param description What text to display to the user
   */

  public constructor(autoType: AutoType, eventType: EventType, timeStamp: Date, description: string) {
    this._autoType = autoType;
    this._eventType = eventType;
    this._timeStamp = timeStamp;
    this._description = description;
  }

  /**
   * Getters, setters
   */

  get autoType() {
    return this._autoType;
  }
  get eventType() {
    return this._eventType;
  }
  get timeStamp() {
    return this._timeStamp;
  }
  get description() {
    return this._description;
  }
  
  /**
   * To-string method
   * @returns a string representation of this object
   */

  toString() {
    return "EVENT: " + this.timeStamp.toLocaleDateString() + "\t" + this.timeStamp.toLocaleTimeString() + "\t" + this.description;
  }
}
