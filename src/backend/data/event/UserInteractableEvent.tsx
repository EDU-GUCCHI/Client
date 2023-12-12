import { AnswerOptions } from "./AnswerOptions";
import { Event } from "./Event";
import { AutoType, EventType } from "./EventTypes";

export class UserInteractableEvent extends Event {
  private readonly _symptomOptions: AnswerOptions;
  private readonly _causeOptions: AnswerOptions;
  private readonly _treatmentOptions: AnswerOptions;
  private _answered: boolean;

  public constructor(
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    description: string,
    symptomOptions: AnswerOptions,
    causeOptions: AnswerOptions,
    treatmentOptions: AnswerOptions,
  ) {
    super(autoType, eventType, timeStamp, description);
    this._symptomOptions = symptomOptions;
    this._causeOptions = causeOptions;
    this._treatmentOptions = treatmentOptions;
    this._answered = false;
  }
  get symptomOptions(): object {
    return this._symptomOptions;
  }

  get causeOptions(): object {
    return this._causeOptions;
  }

  get treatmentOptions(): object {
    return this._treatmentOptions;
  }
  get answered(): boolean {
    return this._answered;
  }
  set answered(answered: boolean) {
    this._answered = answered;
  }
}