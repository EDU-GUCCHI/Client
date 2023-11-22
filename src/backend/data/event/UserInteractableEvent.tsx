import { Event } from "./Event";
import { AutoType, EventType } from "./EventTypes";

export class UserInteractableEvent extends Event {
  /* private readonly _answerOptions: [];
    private readonly _correctAnswers: []; */
  private readonly _symptomOptions: {};
  private readonly _causeOptions: {};
  private readonly _treatmentOptions: {};

  public constructor(
    id: number,
    autoType: AutoType,
    eventType: EventType,
    timeStamp: Date,
    bloodGlucoseChange: number,
    description: string,
    symptomOptions: object,
    causeOptions: object,
    treatmentOptions: object,
  ) {
    super(id, autoType, eventType, timeStamp, bloodGlucoseChange, description);
    this._symptomOptions = symptomOptions;
    this._causeOptions = causeOptions;
    this._treatmentOptions = treatmentOptions;
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
}