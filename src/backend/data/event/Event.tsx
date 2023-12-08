// an event

//event type: enum (automatic event, user event)

import { State } from '../../logic/event/GotchiStateMachine';
import {AutoType, EventType} from './EventTypes';



export  class Event {
  private readonly _autoType: AutoType;
  private readonly _eventType: EventType;
  private readonly _timeStamp: Date;
  private readonly _description: string;
  //State can be used to set state in stateMachine

  //What other attributes are needed? 
  //ID? 

  public constructor(autoType: AutoType, eventType: EventType, timeStamp: Date, description: string) {
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

  getTime() {
    return this._timeStamp.getTime();
  }

  toString() {
    return this._autoType + " "
  }
}
