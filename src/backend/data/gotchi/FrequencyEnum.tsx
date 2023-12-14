/** 
 * @type Model
 * @description 
 * The following enum-categories represent the values that can
 * affect blood-glucose values within a given time-frame. Compared
 * to @class ConstantEnum these habits are what determine how 
 * blood-glucose would change in a time-frame during a given 
 * week with selected habits. 
 * 
 * As an example, The HEAVY_DRINKER enum would cause @class 
 * WeekPlanner to select three distinct days during a week where 
 * the Gotchi decides to consume alcohol. 
*/

export enum EatingHabit {
    CONSISTENT,
    VOLATILE
}
export enum Exercise {
    VERY_ACTIVE = 4,
    ACTIVE = 2,
    INACTIVE = 0
}
export enum AlcoholHabit {
    HEAVY_DRINKER = 3,
    SOCIAL_DRINKER = 1,
    SOBER = 0
}