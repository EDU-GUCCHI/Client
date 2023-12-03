import { Event } from "../data/event/Event";

export class EventQueue {
    private events: Event[] = [];
  
    addEvent(event: Event): void {
      this.events.push(event);
      this.sortEvents();
    }
  
    getNextEvent(): Event | undefined {
      return this.events.pop();
    }
  
    private sortEvents(): void {
      this.events.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
    }

    peek(): Event | undefined {
      return this.events.length > 0 ? this.events[this.events.length - 1] : undefined;
    }
  }