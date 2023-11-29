import { Gotchi } from "./gotchi/Gotchi";
import { newGotchi } from './gotchi/GotchiRandomizer';
import { Event } from "./event/Event";
import { parseEventsToFormat } from "../logic/event/EventParser";
import { AlcoholHabit, EatingHabit, Exercise} from "./gotchi/FrequencyEnum";
import { Age, Weight, Illness} from "./gotchi/ConstantEnum";

export class Storage {
  // store/initialize all data storage classes here, ex: Gotchi
  private _person: Gotchi;
  private _baseFactor: number;
  private _tempFactor: number;
  //add attr. for storing Events. Array/map?. Store pre-defined events or store triggered events or both?
  private _triggeredEvents: Event[];

  private _increaseFactor: number;
  private _decreaseFactor: number;

  public constructor() {
    this._person = new Gotchi(
      "",
      5,
      false,
      false,
      Age.SENIOR,
      EatingHabit.VOLATILE,
      Exercise.INACTIVE,
      Weight.UNDERWEIGHT,
      AlcoholHabit.HEAVY_DRINKER,
      true,
      Illness.FEVER);
    
    this._baseFactor = 0.0;
    this._triggeredEvents = [];
    this._increaseFactor = 0;
    this._decreaseFactor = 0;
    this._tempFactor = 0;
  }
  // getters-setters here
  get person(): Gotchi {
    return this._person;
  }
  get tempFactor(): number {
    return this._tempFactor;
  }
  set tempFactor(tempfac: number) {
    this._tempFactor = tempfac;
  }
  get increaseFactor(): number {
    return this._increaseFactor;
  }
  set increaseFactor(incfac: number) {
    this._increaseFactor = incfac;
  }
  get decreaseFactor(): number {
    return this._decreaseFactor;
  }
  set decreaseFactor(decfac: number){
    this._decreaseFactor = decfac;
  }
  set person(newPerson: Gotchi) {
    this._person = newPerson;
  }
  get baseFactor(): number {
    return this._baseFactor;
  }
  set baseFactor(factor: number) {
    this._baseFactor = factor;
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