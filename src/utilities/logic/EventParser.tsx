import { Event } from "../data/Event";
import { UserInteractableEvent } from "../data/UserInteractableEvent";

interface ParsedOption {
  option: string;
  correct: boolean;
  answered: boolean;
}

interface ParsedEvent {
  time: string;
  title: string;
  symptoms: ParsedOption[];
  treatment: ParsedOption[];
  cause: ParsedOption[];
}

interface ParsedDay {
  date: string;
  day: string;
  events: ParsedEvent[];
}

function parseEventsToFormat(events: Event[]): ParsedDay[] {
  const parsedDays: ParsedDay[] = [];

  events.forEach((event) => {
    const timestamp = event.timeStamp;
    const date = `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`;
    const day = getDayOfWeek(timestamp);

    let parsedDay = parsedDays.find((d) => d.date === date && d.day === day);

    if (!parsedDay) {
      parsedDay = { date, day, events: [] };
      parsedDays.push(parsedDay);
    }

    const parsedEvent: ParsedEvent = {
      time: formatTime(timestamp),
      title: event.description,
      symptoms: [],
      treatment: [],
      cause: [],
    };

    if (event instanceof UserInteractableEvent) {
      // If it's a UserInteractableEvent, populate the parsedEvent with its data
      parsedEvent.symptoms = parseOptions(event.symptomOptions, event.correctSymptoms);
      parsedEvent.treatment = parseOptions(event.treatmentOptions, event.correctTreatments);
      parsedEvent.cause = parseOptions(event.causeOptions, event.correctCauses);
    }

    parsedDay.events.push(parsedEvent);
  });

  return parsedDays;
}

function parseOptions(options: any[], correctOptions: any[]): ParsedOption[] {
  return options.map((option, index) => ({
    option,
    correct: correctOptions[index],
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