//assigned values are the factor for the given enum. Used to generate formula 
export enum EatingHabit
{
    CONSISTENT = 2,
    VOLATILE = 1,
}
export enum Age 
{
    YOUNG_ADULT = 0.5,
    ADULT = 1,
    SENIOR = 1.5
}
export enum Exercise 
{
    VERY_ACTIVE = 2,
	ACTIVE = 1,
	INACTIVE = -1
}
export enum Weight
{
    OVERWEIGHT = -1,
	NORMAL_WEIGHT = 1,
	UNDERWEIGHT = -2
}
export enum AlcoholHabit
{
    HEAVY_DRINKER = -1,
	SOCIAL_DRINKER = -0.5,
	SOBER = 0
}
export enum SmokingHabit
{
    HEAVY_SMOKER = -3,
	SOCIAL_SMOKER = -1,
	NON_SMOKER = 0
}
export enum Illness
{
    FEVER = 2,
    PAIN = -1,
    ACUTE_Disease = 1,
    GLUKAGON = -3,
	KORTISONBEHANDLING = 0,
	ÖVERPROD_SKÖLDKÖRTELHORMON = 1,
	ÖVERPROD_KORTISOL = 2
}
//Values here?
export enum Gender
{
    MALE,
    FEMALE,
    OTHER
}