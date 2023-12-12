import { Event } from "./Event";
import { AutoType, EventType } from "./EventTypes";

export class UserInteractableEvent extends Event {
  /* private readonly _answerOptions: [];
    private readonly _correctAnswers: []; */
  private readonly _symptomOptions: {};
  private readonly _causeOptions: {};
  private readonly _treatmentOptions: {};
  private _answered: boolean;

  public constructor(
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    description: string,
    symptomOptions: object,
    causeOptions: object,
    treatmentOptions: object,
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