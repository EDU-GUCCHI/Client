import {Event} from './Event';
import {AutoType} from './EventTypes';
import {UserInteractableEvent} from './UserInteractableEvent';

interface ParsedOption {
  option: string;
  correct: boolean;
}

interface ParsedEvent {
  interactable: boolean;
  time: string;
  title: string;
  symptoms: object;
  treatment: object;
  cause: object;
  dateObject: string;
  eventAnswered: boolean;
}

interface ParsedDay {
  date: string;
  day: string;
  events: ParsedEvent[];
}

function parseEventsToFormat(events: Event[]): ParsedDay[] {
  const parsedDays: ParsedDay[] = [];

  events.forEach(event => {
    let interactable;
    if (event.autoType === AutoType.AUTO_EVENT) {
      interactable = false;
    } else {
      interactable = true;
    }
    const timestamp = event.timeStamp;
    const date = `${timestamp.getDate()}/${
      timestamp.getMonth() + 1
    }/${timestamp.getFullYear()}`;
    const day = getDayOfWeek(timestamp);
    const dateObject = timestamp.toISOString();

    let parsedDay = parsedDays.find(d => d.date === date && d.day === day);

    if (!parsedDay) {
      parsedDay = {date, day, events: []};
      parsedDays.push(parsedDay);
    }

    const parsedEvent: ParsedEvent = {
      interactable: interactable,
      time: formatTime(timestamp),
      title: event.description,
      symptoms: [],
      treatment: [],
      cause: [],
      dateObject: dateObject,
      eventAnswered: event.answered,
    };

    if (event instanceof UserInteractableEvent) {
      // If it's a UserInteractableEvent, populate the parsedEvent with its data
      parsedEvent.symptoms = parseOptions(
        event.symptomOptionsList as {[key: string]: boolean},
      );
      parsedEvent.treatment = parseOptions(
        event.treatmentOptionsList as {[key: string]: boolean},
      );
      parsedEvent.cause = parseOptions(
        event.causeOptionsList as {[key: string]: boolean},
      );
    }

    parsedDay.events.push(parsedEvent);
  });

  return parsedDays;
}

function parseOptions(options: {[key: string]: boolean}): ParsedOption[] {
  // Check if options is an object and not null
  if (typeof options !== 'object' || options === null) {
    return [];
  }

  return Object.entries(options).map(([option, correct]) => ({
    option,
    correct,
  }));
}

function getDayOfWeek(date: Date): string {
  const days = [
    'Söndag',
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
  ];
  return days[date.getDay()];
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export {parseEventsToFormat};
