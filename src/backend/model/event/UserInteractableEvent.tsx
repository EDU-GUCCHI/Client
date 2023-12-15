import {AnswerOptions} from './AnswerOptions';
import {Event} from './Event';
import {AutoType, EventType} from './EventTypes';

/**
 * @type Model
 * @description
 * Container class representing events which require input
 * from the user of the application. Extends event for
 * relevant info to be presented to the user while new 
 * fields represent form information to be used and sent
 * back.
 */

export class UserInteractableEvent extends Event {
  private _symptomOptions: AnswerOptions;
  private _causeOptions: AnswerOptions;
  private _treatmentOptions: AnswerOptions;
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

  /**
   * Getters, setters
   */

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
  updateOptionsVariable(
    treatmentIndex: number,
    symptomIndexes: number[],
    causeIndexes: number[],
  ) {
    this._treatmentOptions.setOptionFlag(treatmentIndex);
    symptomIndexes.forEach(num => {
      this._symptomOptions.setOptionFlag(num);
    });
    causeIndexes.forEach(num => {
      this._causeOptions.setOptionFlag(num);
    });
  }
}
