export enum AutoType {
  AUTO_EVENT, // non user interactable (eating, sleeping, working out)
  USER_EVENT, // User interactable (use insulin pump)
}

//TODO: Ge dessa värden som ska påverka blodsockerfaktorn

export enum EventType{
    EXERCISE,
    FOOD_INTAKE,
    ALCOHOL_INTAKE,
    INSULIN_INJECTION,
    BLOOD_GLUCOSE_WARNING,
    SLEEP,
    NOTHING
    //MORE?
}
