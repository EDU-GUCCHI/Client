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
  get symptomOptionsList(): object {
    return this._symptomOptions.options;
  }

  get causeOptions(): object {
    return this._causeOptions;
  }
  get causeOptionsList(): object {
    return this._causeOptions.options;
  }

  get treatmentOptions(): object {
    return this._treatmentOptions;
  }
  get treatmentOptionsList(): object {
    return this._treatmentOptions.options;
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
    if (
      treatmentIndex == null ||
      !symptomIndexes ||
      symptomIndexes.length < 1 ||
      !causeIndexes ||
      causeIndexes.length < 1
    ) {
      return;
    }
    this._treatmentOptions.setOptionFlag(treatmentIndex);
    symptomIndexes.forEach(num => {
      this._symptomOptions.setOptionFlag(num);
    });
    causeIndexes.forEach(num => {
      this._causeOptions.setOptionFlag(num);
    });
    //TODO: uppdatera

    /* console.log(this);
    console.log(this._treatmentOptions.toString());
    console.log(this._symptomOptions.toString());
    console.log(this._causeOptions.toString()); */
  }
}
