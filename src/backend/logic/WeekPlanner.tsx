import { Event } from '../data/event/Event';
import { AutoType, EventType } from '../data/event/EventTypes';
import { EatingHabit } from '../data/gotchi/FrequencyEnum';
import { Gotchi } from '../data/gotchi/Gotchi';
import { EventDispatcher } from './event/EventDispatcher';
import { State } from './event/GotchiStateMachine';
import { EventQueue } from './EventQueue';

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

  get exerciseHabitIncrement(): number {
    return this._exerciseHabitIncrement;
  }
  // Setters for private attributes
  set exerciseHabitIncrement(num : number) {
    this._exerciseHabitIncrement = num;
  }
  decrementExerciseHabitIncrement() {
    this._exerciseHabitIncrement--;
  }

  get alcoholHabitIncrement(): number {
    return this._alcoholHabitIncrement;
  }
  // Setters for private attributes
  set alcoholHabitIncrement(num: number) {
    this.alcoholHabitIncrement = num;
  }

  decrementAlcoholHabitIncrement() {
    this._alcoholHabitIncrement--;
  }

  planWeek(gotchi: Gotchi): Array<Event> {

    console.log(JSON.stringify(gotchi));
    let day = 1; // Change to new Date() to change to todays date
    let events: Array<Event> = new Array();
    let exerciseDays = this.selectDistinctDays(gotchi.exercise);
    let partyDays = this.selectDistinctDays(gotchi.alcoholHabit);
    exerciseDays.sort();
    partyDays.sort();

    for (let i = day; i < 6; i++) {
      let breakfastTime;
      let lunchTime;
      let dinnerTime;
      if(gotchi.eatHabit == EatingHabit.CONSISTENT) {
        let breakfastTime = this.selectRandomTimeWithBounds(i, 30, 30, "08:00");
        let lunchTime = this.selectRandomTimeWithBounds(i, 30, 30, "12:00");
        let dinnerTime = this.selectRandomTimeWithBounds(i, 30, 30, "18:00");
        let breakfastEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, breakfastTime, gotchi.name + " ate breakfast");
        let lunchEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, lunchTime, gotchi.name + " ate lunch");
        let dinnerEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, dinnerTime, gotchi.name + " ate dinner");
        events.push(breakfastEvent);
        events.push(lunchEvent);
        events.push(dinnerEvent);
      } else if(gotchi.eatHabit == EatingHabit.VOLATILE) {
        console.log("THE EATING HABIT IS VOLATILE");
        let lunchTime = this.selectRandomTimeWithBounds(i, 60, 60, "12:00");
        let dinnerTime = this.selectRandomTimeWithBounds(i, 60, 60, "19:00");
        let lunchEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, lunchTime, gotchi.name + " ate lunch");
        let dinnerEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, dinnerTime, gotchi.name + " ate dinner");
        events.push(lunchEvent);
        events.push(dinnerEvent);
      }
      let exerciseTime = this.selectRandomTimeWithBounds(i, 30, 30, "17:00");
      let alcoholTime = this.selectRandomTimeWithBounds(i, 60, 60, "21:30");
      let workoutEvent: Event;
      let drinkingEvent: Event;
      if (exerciseDays.includes(i)) {
        if(this._exerciseHabitIncrement > 0) {
          workoutEvent = new Event(AutoType.AUTO_EVENT, EventType.EXERCISE, exerciseTime, gotchi.name + " went for exercise")
          events.push(workoutEvent);
        }
      }
      if (partyDays.includes(i)) {
        if(this._alcoholHabitIncrement > 0) {
          drinkingEvent = new Event(AutoType.AUTO_EVENT, EventType.ALCOHOL_INTAKE, alcoholTime, gotchi.name + " had a great time out with friends")
          events.push(drinkingEvent)
        }
      }
    }
    events.forEach((event) => {
      console.log("EVENT: " + event.timeStamp.getDay() + "-" + event.timeStamp.getTime().toFixed(4) + "-" + event.description);
    })
    return events;
  }

  compareEvents(eventA: Event, eventB: Event): number {
    return eventA.getTime() - eventB.getTime();
  }

  selectDistinctDays(numDays: number): number[] {
    if (numDays < 0 || numDays > 5) {
      console.log("Invalid number of days given to distinct-day generator.")
      console.log("Number of days given: " + numDays)
    }

    const weekdays = [1, 2, 3, 4, 5]; // Monday to Friday
    const selectedDays: number[] = [];

    while (selectedDays.length < numDays) {
      const randomIndex = Math.floor(Math.random() * weekdays.length);
      const randomDay = weekdays[randomIndex];

      if (!selectedDays.includes(randomDay)) {
        selectedDays.push(randomDay);
      }
    }

    return selectedDays;
  }

  selectRandomTimeWithBounds(day: number, lowerBoundMinutes: number, upperBoundMinutes: number, fixedTime: string): Date {
    const fixedDate = new Date();

    const [fixedHours, fixedMinutes] = fixedTime.split(':').map(Number);
    fixedDate.setHours(fixedHours, fixedMinutes, 0, 0);

    const lowerBound = new Date(fixedDate.getTime() - lowerBoundMinutes * 60 * 1000);
    const upperBound = new Date(fixedDate.getTime() + upperBoundMinutes * 60 * 1000);

    const randomTime = new Date(
      lowerBound.getTime() + Math.random() * (upperBound.getTime() - lowerBound.getTime())
    );
    randomTime.setDate(day);
    return randomTime;
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
