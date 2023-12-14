import { Event } from "./Event";

/**
 * @type Model
 * @description
 * This class simply represents a queue of events
 * in order of time the event should be scheduled.
 */

export class EventQueue {
  private events: Event[] = [];


  /**
   * This method takes an event and pushes it to
   * the end of the queue. 
   * @param event to be added
   */

  addEvent(event: Event): void {
    this.events.push(event);
    this.sortEvents();
  }

  /**
   * @returns the head of the queue.
   */

  getNextEvent(): Event | undefined {
    return this.events.pop();
  }

  /**
   * This method sorts the queue in order of time they
   * should be scheduled.
   */

  private sortEvents(): void {
    this.events.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
  }

  /**
   * Effectively a peek() method present in most queues and stacks.
   * @returns the head of the queue without removing it. Undefined if no
   * event is found.
   */

  peek(): Event | undefined {
    return this.events.length > 0 ? this.events[this.events.length - 1] : undefined;
  }
}