import { Event } from "../../data/event/Event";
import { AutoType } from "../../data/event/EventTypes";
import { UserInteractableEvent } from "../../data/event/UserInteractableEvent";

interface ParsedOption {
  option: string;
  correct: boolean;
  answered: boolean;
}

interface ParsedEvent {
  interactable: boolean;
  time: string;
  title: string;
  symptoms: object;
  treatment: object;
  cause: object;
}

interface ParsedDay {
  date: string;
  day: string;
  events: ParsedEvent[];
}

function parseEventsToFormat(events: Event[]): ParsedDay[] {
  const parsedDays: ParsedDay[] = [];

  events.forEach((event) => {
    let interactable;
    if (event.autoType === AutoType.AUTO_EVENT) {
      interactable = false;
    } else {
      interactable = true;
    }
    const timestamp = event.timeStamp;
    const date = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`;
    const day = getDayOfWeek(timestamp);

    let parsedDay = parsedDays.find((d) => d.date === date && d.day === day);

    if (!parsedDay) {
      parsedDay = { date, day, events: [] };
      parsedDays.push(parsedDay);
    }

    const parsedEvent: ParsedEvent = {
      interactable: interactable,
      time: formatTime(timestamp),
      title: event.description,
      symptoms: [],
      treatment: [],
      cause: [],
    };

    if (event instanceof UserInteractableEvent) {
      // If it's a UserInteractableEvent, populate the parsedEvent with its data
      parsedEvent.symptoms = parseOptions(event.symptomOptions as { [key: string]: boolean });
      parsedEvent.treatment = parseOptions(event.treatmentOptions as { [key: string]: boolean });
      parsedEvent.cause = parseOptions(event.causeOptions as { [key: string]: boolean });
    }

    parsedDay.events.push(parsedEvent);
  });

  return parsedDays;
}

function parseOptions(options: { [key: string]: boolean }): ParsedOption[] {
  // Check if options is an object and not null
  if (typeof options !== 'object' || options === null) {
    return [];
  }

  return Object.entries(options).map(([option, correct]) => ({
    option,
    correct,
    answered: false,
  }));
}

function getDayOfWeek(date: Date): string {
  const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  return days[date.getDay()];
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export { parseEventsToFormat };