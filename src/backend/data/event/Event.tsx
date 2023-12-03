// an event

//event type: enum (automatic event, user event)

import { State } from '../../logic/event/GotchiStateMachine';
import {AutoType, EventType} from './EventTypes';



export  class Event {
  private readonly _id: number;
  private readonly _autoType: AutoType;
  private readonly _eventType: EventType;
  private readonly _timeStamp: Date;
  private readonly _bloodGlucoseChange: number;
  private readonly _description: string;
  //State can be used to set state in stateMachine
  private _state: State;

  
  //What other attributes are needed? 
  //ID? 

  public constructor(id: number, autoType: AutoType, eventType: EventType, timeStamp: Date, bloodGlucoseChange: number, description: string, state?: State) {
    this._id = id;
    this._autoType = autoType;
    this._eventType = eventType;
    this._timeStamp = timeStamp;
    this._bloodGlucoseChange = bloodGlucoseChange;
    this._description = description;
    this._state = state || State.Idle;
    
  }

  get id() {
    return this._id;
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
  get bloodGlucoseChange() {
    return this._bloodGlucoseChange;
  }
  get description() {
    return this._description;
  }
}
