import {Event} from '../data/event/Event';
import {AutoType, EventType} from '../data/event/EventTypes';
import {Gotchi} from '../data/gotchi/Gotchi';
import {EventDispatcher} from './event/EventDispatcher';
import {State} from './event/GotchiStateMachine';
import {EventQueue} from './EventQueue';

export class WeekPlanner {
  private _eventDispatcher: EventDispatcher;
  private _scheduledEventQueue: EventQueue;
  private _gotchi : Gotchi;

  public constructor(eventDispatcher : EventDispatcher, gotchi : Gotchi) {
    this._eventDispatcher = eventDispatcher;
    this._scheduledEventQueue = new EventQueue();
    this._gotchi = gotchi;
  }

  planWeek(gotchi : Gotchi) : Array<Event> {
    let exerciseTime = this.generateRandomTimeWithinBounds(30, 30, "17:00");
    let alcoholTime = this.generateRandomTimeWithinBounds(60, 60, "21.30");
    let breakfastTime = this.generateRandomTimeWithinBounds(30, 30, "08:00");
    let lunchTime = this.generateRandomTimeWithinBounds(30, 30, "12:00");
    let dinnerTime = this.generateRandomTimeWithinBounds(30, 30, "18:00");

    let exerciseDays = this.generateDistinctDays(gotchi.alcoholHabit);
    let partyDays = this.generateDistinctDays(gotchi.alcoholHabit);
    console.log(partyDays.entries());
    exerciseDays.sort();
    partyDays.sort();
    console.log("EXERCISE DAYS: " + exerciseDays);
    console.log("DRINKING DAYS: " + partyDays)

    let events : Array<Event> = new Array();
    for(let i = 1; i < 6; i++) {
      
      let breakfastEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, breakfastTime, gotchi.name + " ate breakfast");      
      let lunchEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, lunchTime, gotchi.name + " ate lunch");   
      let dinnerEvent = new Event(AutoType.AUTO_EVENT, EventType.FOOD_INTAKE, dinnerTime, gotchi.name + " ate dinner");
      events.push(breakfastEvent);
      events.push(lunchEvent);
      events.push(dinnerEvent);
      let workoutEvent : Event;
      let drinkingEvent : Event;
      if(exerciseDays.includes(i)) {
        workoutEvent = new Event(AutoType.AUTO_EVENT, EventType.EXERCISE, exerciseTime, gotchi.name + " went for exercise")
        events.push(workoutEvent);  
      }
      if(partyDays.includes(i)) {
        drinkingEvent = new Event(AutoType.AUTO_EVENT, EventType.ALCOHOL_INTAKE, alcoholTime, gotchi.name + " had a great time out with friends")
        events.push(drinkingEvent)
      }
    }
    events.forEach((event) => {
      console.log("EVENT: " + event.timeStamp.getDay() + "-" + event.timeStamp.getTime() + "-" + event.description);
    })
    return events;
  }

  compareEvents(eventA: Event, eventB: Event): number {
    return eventA.getTime() - eventB.getTime();
  }
  


  generateDistinctDays(numDays: number): number[] {
    if (numDays <= 0 || numDays > 5) {
      throw new Error('Invalid number of days. Must be between 1 and 5.');
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

  generateRandomTimeWithinBounds(lowerBoundMinutes: number, upperBoundMinutes: number, fixedTime: string): Date {
    const fixedDate = new Date();
    const [fixedHours, fixedMinutes] = fixedTime.split(':').map(Number);
    fixedDate.setHours(fixedHours, fixedMinutes, 0, 0);
  
    const lowerBound = new Date(fixedDate.getTime() - lowerBoundMinutes * 60 * 1000);
    const upperBound = new Date(fixedDate.getTime() + upperBoundMinutes * 60 * 1000);
  
    const randomTime = new Date(
      lowerBound.getTime() + Math.random() * (upperBound.getTime() - lowerBound.getTime())
    );
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
