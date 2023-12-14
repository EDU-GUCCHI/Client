/**
 * @type Model
 * @description
 * Enum-attributes for events. Enums contained here affect
 * 1) How events are presented to the user
 * 2) How and whether events can be interacted with
 * 3) How blood-glucose values are effected
 */

/**
 * AUTO_EVENT Refers to events concerning the blood value and are not
 * interactable USER_EVENT Refers to events requiring input from the user
 */

export enum AutoType {
  AUTO_EVENT,
  USER_EVENT
}

/**
 * Event types denote the categories of events and affect what information is 
 * presented in the application, what type of forms we send out and how we update
 * the blood-glucose value
 */

export enum EventType{
    EXERCISE = "Exercise",
    FOOD_INTAKE = "Eating",
    ALCOHOL_INTAKE = "Partying",
    INSULIN_INJECTION = "Self-help",
    BLOOD_GLUCOSE_WARNING = "What",
    SLEEP = "Sleeping",
    NOTHING = "Undefined"
    //MORE?
}
