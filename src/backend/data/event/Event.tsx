import {AutoType, EventType} from './EventTypes';

export class Event {
  private readonly _autoType: AutoType;
  private readonly _eventType: EventType;
  private readonly _timeStamp: Date;
  private readonly _description: string;

  public constructor(
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    description: string,
  ) {
    this._autoType = autoType;
    this._eventType = eventType;
    this._timeStamp = timeStamp;
    this._description = description;
  }

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
  updateOptionsVariable(
    treatmentIndex: number,
    symptomIndexes: number[],
    causeIndexes: number[],
  ): void {
    //do nothing, needed a function to override as I did not find a way to call a specific function in UserInteractableEvent otherwise
  }
}
