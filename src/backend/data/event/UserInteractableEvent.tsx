import { Event } from "./Event";
import { AutoType, EventType } from "./EventTypes";

export class UserInteractableEvent extends Event {
    /* private readonly _answerOptions: [];
    private readonly _correctAnswers: []; */
    private readonly _symptomOptions: [];
    private readonly _correctSymptoms: [];
    private readonly _causeOptions: [];
    private readonly _correctCauses: [];
    private readonly _treatmentOptions: [];
    private readonly _correctTreatments: [];

    public constructor(
      id: number, 
      autoType: AutoType, 
      eventType: EventType, 
      timeStamp: Date, 
      bloodGlucoseChange: number, 
      description: string, 
      symptomOptions: [], 
      correctSymptoms: [], 
      causeOptions: [], 
      correctCauses: [], 
      treatmentOptions: [], 
      correctTreatments: []) 
      {
        super(id, autoType, eventType, timeStamp, bloodGlucoseChange, description);
        this._symptomOptions = symptomOptions;
        this._correctSymptoms = correctSymptoms;
        this._causeOptions = causeOptions;
        this._correctCauses = correctCauses;
        this._treatmentOptions = treatmentOptions;
        this._correctTreatments = correctTreatments;
        
    }
    get symptomOptions(): [] {
        return this._symptomOptions;
      }
      get correctSymptoms(): [] {
        return this._correctSymptoms;
      }
      get causeOptions(): [] {
        return this._causeOptions;
      }
      get correctCauses(): [] {
        return this._correctCauses;
      }
      get treatmentOptions(): [] {
        return this._treatmentOptions;
      }
      get correctTreatments(): [] {
        return this._correctTreatments;
      }
}