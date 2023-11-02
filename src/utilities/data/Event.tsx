// an event

//event type: enum (automatic event, user event)

import {EventTypes} from './EventTypes';

export class Event {
  private readonly _eventType: EventTypes;
  //What other attributes are needed? 
  //ID? 
  //Type of event? eg eating training etc?

  public constructor(eventType: EventTypes) {
    this._eventType = eventType;
  }

  get eventType(): EventTypes {
    return this._eventType;
  }
}
