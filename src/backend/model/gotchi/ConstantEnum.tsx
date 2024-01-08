/** 
 * @type Model
 * @description
 * The following enum-categories represent the constant factors 
 * which affect blood-glucose values. The logic is that age, 
 * weight and something like an illneess doesn't change during 
 * a given work-week and factored in together represent how 
 * blood-glucose values would change in an idle situation.
 */

export enum DiabetesType {
    Type1 = -0.5,
    Type2 = 2.5 
}

export enum Age {
    YOUNG_ADULT = 5,
    ADULT = 10,
    SENIOR = 20
}
export enum Weight {
    OVERWEIGHT = -1,
    NORMAL_WEIGHT = 1,
    UNDERWEIGHT = -2
}
export enum Illness {
    NONE = 0,
    FEVER = 2,
    PAIN = -1,
    ACUTE_Disease = 1,
    GLUKAGON = -3,
    KORTISONBEHANDLING = 0,
    ÖVERPROD_SKÖLDKÖRTELHORMON = 1,
    ÖVERPROD_KORTISOL = 2
}