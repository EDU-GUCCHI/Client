import { Event } from '../data/event/Event';
import { AutoType, EventType } from '../data/event/EventTypes';
import { EatingHabit } from '../data/gotchi/FrequencyEnum';
import { Gotchi } from '../data/gotchi/Gotchi';
import { EventDispatcher } from './event/EventDispatcher';
import { EventQueue } from './EventQueue';

/**
 * WeekPlanner
 * 
 * At point of entry into a week this class is responsible for generating non-interactable events 
 * which impact the autonomous calculations on the blood-glucose level of a Gotchi 
 */

export class WeekPlanner {
  private _eventDispatcher: EventDispatcher;
  private _scheduledEventQueue: EventQueue;
  private _gotchi: Gotchi;
  private _exerciseHabitIncrement;
  private _alcoholHabitIncrement;

  /**
   * 
   * @param eventDispatcher
   * @param gotchi Identity generated from overarching classes. The identity defines 
   * the count of times a week can contain different types of events. 
   */
  public constructor(eventDispatcher: EventDispatcher, gotchi: Gotchi) {
    this._eventDispatcher = eventDispatcher;
    this._scheduledEventQueue = new EventQueue();
    this._gotchi = gotchi;
    this._exerciseHabitIncrement = gotchi.exercise;
    this._alcoholHabitIncrement = gotchi.alcoholHabit;
  }

  /**
   * Getters, setters
   */

  get exerciseHabitIncrement(): number {
    return this._exerciseHabitIncrement;
  }
  set exerciseHabitIncrement(num: number) {
    this._exerciseHabitIncrement = num;
  }

  get alcoholHabitIncrement(): number {
    return this._alcoholHabitIncrement;
  }
  set alcoholHabitIncrement(num: number) {
    this.alcoholHabitIncrement = num;
  }

  /**
   * This method is responsible for generating the required data ( with some 
   * helper methods, @function selectRandomTimeWithBounds and @function selectDistinctDays ) 
   * 
   * @param gotchi The individual which contains the parameters required for 
   * calculating a week of activities
   * 
   * @returns an [] of Events. These contain timestamps for scheduling 
   * notifications and calculating the next blood-glucose value within the
   * context of the interval handler.
   */

  planWeek(gotchi: Gotchi): Array<Event> {

    let events: Array<Event> = new Array();
    let exerciseDays = this.selectDistinctDays(gotchi.exercise);
    let partyDays = this.selectDistinctDays(gotchi.alcoholHabit);

    let today = new Date();
    let todaysDay = today.getDay();
    
    if(todaysDay == 0 || todaysDay == 6) {
      throw new Error("All Gotchis are free during the weekend");
    }
    let daysUntilFriday = 6 - todaysDay;
    console.log("Days until Friday: " + daysUntilFriday);

    for (let i = 0; i < daysUntilFriday; i++) {
      if (gotchi.eatHabit == EatingHabit.CONSISTENT) {
        let breakfastTime = this.selectRandomTimeWithBounds(today, 30, 30, "08:00");
        let lunchTime = this.selectRandomTimeWithBounds(today, 30, 30, "12:00");
        let dinnerTime = this.selectRandomTimeWithBounds(today, 30, 30, "18:00");
        let breakfastEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, breakfastTime, gotchi.name + " ate breakfast");
        let lunchEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, lunchTime, gotchi.name + " ate lunch");
        let dinnerEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, dinnerTime, gotchi.name + " ate dinner");

        events.push(breakfastEvent);
        events.push(lunchEvent);
        events.push(dinnerEvent);
      } else if (gotchi.eatHabit == EatingHabit.VOLATILE) {
        let lunchTime = this.selectRandomTimeWithBounds(today, 60, 60, "12:00");
        let dinnerTime = this.selectRandomTimeWithBounds(today, 60, 60, "19:00");

        let lunchEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, lunchTime, gotchi.name + " ate lunch");
        let dinnerEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, dinnerTime, gotchi.name + " ate dinner");
        events.push(lunchEvent);
        events.push(dinnerEvent);
      }
      let exerciseTime = this.selectRandomTimeWithBounds(today, 30, 30, "17:00");
      let alcoholTime = this.selectRandomTimeWithBounds(today, 60, 60, "21:30");

      let workoutEvent: Event;
      let drinkingEvent: Event;
      if (exerciseDays.includes(i)) {
        workoutEvent = new Event(AutoType.AUTO_EVENT, EventType.EXERCISE, exerciseTime, gotchi.name + " went for exercise");
        events.push(workoutEvent);
      }
      if (partyDays.includes(i)) {
        drinkingEvent = new Event(AutoType.AUTO_EVENT, EventType.ALCOHOL_INTAKE, alcoholTime, gotchi.name + " had a great time out with friends");
        events.push(drinkingEvent);
      }
      today.setDate(today.getDate() + 1);
    }
    return events;
  }

  /**
   * 
   * @param date 
   * Weekday to select (in Date() format, ie 1 for Monday, 2 for
   * Wednesday etc)
   * 
   * @param lowerBoundMinutes 
   * Lower bound of minutes allowed to randomize between
   * 
   * @param upperBoundMinutes 
   * Upper bound of mintues allowed to randomize between
   * 
   * @param fixedTime 
   * Point of time we're able to randomize between
   * 
   * @returns 
   * A @class Date() object with time set in above parameters. For instance,
   * a method call with 1, 30, 30, "18:00" would generate a date object
   * with time set between 17:30 and 18:30. This in turn to pass along
   * to an @class Event() constructor
   */

  selectRandomTimeWithBounds(date: Date, lowerBoundMinutes: number, upperBoundMinutes: number, fixedTime: string): Date {
    //const today = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();

    const fixedDate = new Date(currentYear, currentMonth, currentDay);
    fixedDate.setDate(fixedDate.getDate() + date.getDay() - fixedDate.getDay());
    const [fixedHours, fixedMinutes] = fixedTime.split(':').map(Number);
    fixedDate.setHours(fixedHours, fixedMinutes, 0, 0);

    const lowerBound = new Date(fixedDate.getTime() - lowerBoundMinutes * 60 * 1000);
    const upperBound = new Date(fixedDate.getTime() + upperBoundMinutes * 60 * 1000);
    const randomTime = new Date(
      lowerBound.getTime() + Math.random() * (upperBound.getTime() - lowerBound.getTime())
    );

    return randomTime;
  }

  /**
   * This method is responsible for selecting a @param numberOfDays 
   * of distinct, random days in a span. A Gotchi has a set of 
   * activities which they perform (affecting blood-glucose). 
   * This method selects the days in which these events are sheduled
   * 
   * @param numberOfDays Count of days an activity needs to be
   * performed
   * @returns An array of numbers ordered (from lowest to highest)
   * by the weekdays they'll be performed.
   */

  selectDistinctDays(numberOfDays: number): number[] {
    const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday
    const selectedDays: number[] = [];
    while (selectedDays.length < numberOfDays) {
      const randomIndex = Math.floor(Math.random() * weekdays.length);
      const randomDay = weekdays[randomIndex];

      if (!selectedDays.includes(randomDay)) {
        selectedDays.push(randomDay);
      }
    }
    selectedDays.sort();
    return selectedDays;
  }



  //Create scheduled event and add to the queue
  createScheduledEvent(
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    description: string,
  ) {
    let scheduledEvent = new Event(
      autoType,
      eventType,
      timeStamp,
      description,
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
}
