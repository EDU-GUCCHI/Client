import { Gotchi } from "./gotchi/Gotchi";
import { newGotchi } from './gotchi/GotchiRandomizer';
import { Event } from "./event/Event";
import { parseEventsToFormat } from "../logic/event/EventParser";

export class Storage {
  // store/initialize all data storage classes here, ex: Gotchi
  private _person: Gotchi;
  private _bloodSugarFactor: number;
  //add attr. for storing Events. Array/map?. Store pre-defined events or store triggered events or both?
  private _triggeredEvents: Event[];

  public constructor() {
    this._person = newGotchi('');
    this._bloodSugarFactor = 0.0;
    this._triggeredEvents = [];
  }
  // getters-setters here
  get person(): Gotchi {
    return this._person;
  }
  set person(newPerson: Gotchi) {
    this._person = newPerson;
  }
  get bloodSugarFactor(): number {
    return this._bloodSugarFactor;
  }
  set bloodSugarFactor(factor: number) {
    this._bloodSugarFactor = factor;
  }
  get triggeredEvents() {
    return this._triggeredEvents;
  }
  get eventsJson() {
    return parseEventsToFormat(this.triggeredEvents);
  }
  addTriggeredEvent(newEvent: Event): void {
    this._triggeredEvents.push(newEvent);
  }
}