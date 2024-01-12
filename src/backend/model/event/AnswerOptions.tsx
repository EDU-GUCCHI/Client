/**
 * @type interface, model
 * 
 * This type and class holds options for the user to answer
 * when receiving forms.
 */

export type Option = {
  optionString: string;
  optionCorrect: boolean;
  optionChosen: boolean;
};

export class AnswerOptions {
  
  private _options: Option[];
  private _answered: boolean;

  constructor(options?: Option[]) {
    this._options = options || this.getDefaultOptions();
    this._answered = false;
  }
  get options(): Option[] {
    return this._options;
  }
  public setAnswered() {
    this._answered = true;
  }
  public answered(): boolean {
    return this._answered;
  }
  public setOptionFlag(index: number) {
    this._options[index].optionChosen = true;
  }
  toString(): string {
    const optionsString = this._options
      .map(
        (option, index) =>
          `Option ${index + 1}: ${option.optionString} (Correct: ${
            option.optionCorrect
          }, Chosen: ${option.optionChosen})`,
      )
      .join('\n');

    return `Answer Options:\n${optionsString}\nAnswered: ${this._answered}`;
  }

  private getDefaultOptions(): Option[] {
    return [
      {optionString: 'Option 1', optionCorrect: false, optionChosen: false},
      {optionString: 'Option 2', optionCorrect: false, optionChosen: false},
      {optionString: 'Option 3', optionCorrect: true, optionChosen: false},
    ];
  }
}
