import { EatingHabit, Exercise, AlcoholHabit } from './FrequencyEnum';
import { Age, Weight, Illness } from './ConstantEnum'
import { Gotchi } from './Gotchi';

/**
 * @type Model
 * @type Helper
 * @description
 * This method returns a randomized Gotchi for the user to take
 * care of during the week. 
 * 
 * @param name Name chosen by the user during setup
 * @returns A randomized @class Gotchi-object. Method stems
 * from requirement from client regarding randomized experiences
 * from user to user.  
 */

export function newGotchi(name: string): Gotchi {
  return new Gotchi(
    name,
    getRandomNumber(4, 6),
    coinFlip() == 1,
    coinFlip() == 1,
    getRandomEnum(Age),
    getRandomEnum(EatingHabit),
    getRandomEnum(Exercise),
    getRandomEnum(Weight),
    getRandomEnum(AlcoholHabit),
    coinFlip() == 1,
    getRandomEnum(Illness)
  );
}

/**
 * This function takes a category of enums and returns a random value
 * @param anEnum Category of Enums
 * @returns A randomly selected value within that category
 */

function getRandomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum as object).map(n => Number.parseInt(n)).filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

/**
 * This function selects a random number between
 * @param min the minimum value and
 * @param max the maximum value.
 * @returns The number selected
 */
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pretty much what it says. The function returns a coinflip
 * for boolean values in the constructor.
 */

function coinFlip(): number {
  return Math.round(Math.random()) + 1;
}
