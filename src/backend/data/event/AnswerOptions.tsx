export type Option = {
    optionString: string;
    optionCorrect: boolean
};
export class AnswerOptions {
    private _options: Option[];
    private _answered: boolean;

    constructor(options?: Option[]) {
        this._options = options || this.getDefaultOptions();
        this._answered = false;

    }
    public setAnswered(){
        this._answered = true;
    }
    public answered(): boolean {
        return this._answered;
    }
    
    private getDefaultOptions(): Option[] {
        return [
            { optionString: 'Option 1', optionCorrect: false },
            { optionString: 'Option 2', optionCorrect: false },
            { optionString: 'Option 3', optionCorrect: true },
        ];
    }
}