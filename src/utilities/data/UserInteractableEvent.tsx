import { Event } from "./Event";
import { AutoType, EventType } from "./EventTypes";

export class UserInteractableEvent extends Event {
    private readonly _answerOptions: [];
    private readonly _correctAnswers: [];

    public constructor(id: number, autoType: AutoType, eventType: EventType, timeStamp: Date, bloodGlucoseChange: number, description: string, answerOptions: [], correctAnswers: []){
        super(id, autoType, eventType, timeStamp, bloodGlucoseChange, description);
        this._answerOptions = answerOptions;
        this._correctAnswers = correctAnswers;
    }

    get answerOptions() {
        return this._answerOptions;
    }
    get correctAnswers() {
        return this._correctAnswers;
    }
}