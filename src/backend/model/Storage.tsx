import { Gotchi } from "./gotchi/Gotchi";
import { Event } from "./event/Event";
import { parseEventsToFormat } from "./event/EventParser";
import { AlcoholHabit, EatingHabit, Exercise } from "./gotchi/FrequencyEnum";
import { Age, Weight, Illness } from "./gotchi/ConstantEnum";

/**
 * @type Repository
 * @description for storing information that is needed for 
 * further use. 
 */

export class Storage {

  private _person: Gotchi;
  private _bloodSugarFactor: number;
  private _triggeredEvents: Event[];
  private _increaseFactor: number;
  private _decreaseFactor: number;

  /**
   * Constructor needs to initialize an "Emp
 * This class is responsiblety" Gotchi, otherwise
   * it simply initializes all field-variables to default-values.
   */

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

    this._bloodSugarFactor = 0.0;
    this._triggeredEvents = [];
    this._increaseFactor = 0;
    this._decreaseFactor = 0;
  }

  /**
   * Getters, setters
   */

  get person(): Gotchi {
    return this._person;
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
  set decreaseFactor(decfac: number) {
    this._decreaseFactor = decfac;
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

  /**
   * Returns a parsed version of all events. Function
   * imported from @class EventParser
   */

  get eventsJson() {
    return parseEventsToFormat(this.triggeredEvents);
  }

  /**
   * Appends a triggered event to the list
   * @param newEvent Event to add
   */

  addTriggeredEvent(newEvent: Event): void {
    this._triggeredEvents.push(newEvent);
  }
}