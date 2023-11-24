import { EatingHabit, Exercise, AlcoholHabit } from './FrequencyEnum';
import { Age, Weight, Illness } from './ConstantEnum'
import { Gotchi } from './Gotchi';

export function newGotchi(name: string): Gotchi {
  const random = Math.random();

  let count = Math.floor(random * Object.keys(Illness).length);
  let illnesses = new Set();
  while(illnesses.size != count) {
    illnesses.add(getRandomEnum(Illness));
  }
  console.log(illnesses);
  const chosenIllnesses = Array.from(illnesses);
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

function getRandomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum as object).map(n => Number.parseInt(n)).filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function coinFlip(): number {
  return Math.round(Math.random()) + 1;
}
