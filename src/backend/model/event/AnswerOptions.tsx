export type Option = {
  optionString: string;
  optionCorrect: boolean;
  optionChosen: boolean;
};
export class AnswerOptions {
  private _options: Option[];
  //om vi behöver spara att en del av eventet har besvarats
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

  private getDefaultOptions(): Option[] {
    return [
      {optionString: 'Option 1', optionCorrect: false, optionChosen: false},
      {optionString: 'Option 2', optionCorrect: false, optionChosen: false},
      {optionString: 'Option 3', optionCorrect: true, optionChosen: false},
    ];
  }
}
