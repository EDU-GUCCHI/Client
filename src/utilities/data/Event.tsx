// an event

//event type: enum (automatic event, user event)

import {AutoType, EventType} from './EventTypes';


export class Event {
  private readonly _id: number;
  private readonly _autoType: AutoType;
  private readonly _eventType: EventType;
  private readonly _timeStamp: Date;
  private readonly _bloodGlucoseChange: number;
  //What other attributes are needed? 
  //ID? 

  public constructor(id: number, autoType: AutoType, eventType: EventType, timeStamp: Date, bloodGlucoseChange: number) {
    this._id = id;
    this._autoType = autoType;
    this._eventType = eventType;
    this._timeStamp = timeStamp;
    this._bloodGlucoseChange = bloodGlucoseChange;
  }

  get id() {
    return this._id;
  }
  get autoType(): AutoType {
    return this._autoType;
  }
  get eventType(): EventType {
    return this._eventType;
  }
  get timeStamp() {
    return this._timeStamp;
  }
  get bloodGlucoseChange() {
    return this._bloodGlucoseChange;
  }
}
