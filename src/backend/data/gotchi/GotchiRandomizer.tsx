import { Gender, EatingHabit, Exercise, Weight, AlcoholHabit, SmokingHabit, Illness, Age } from './EnumAttributes';
import { Gotchi } from './Gotchi';

export function newGotchi(name: string): Gotchi {
  const random = Math.random();

  var gender = Gender.FEMALE;
  var flip = coinFlip();
  if (flip === 1) {
    gender = Gender.MALE;
  }

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
    getRandomEnum(SmokingHabit),
    getRandomEnum(Gender),
    chosenIllnesses
  );
}

function getRandomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];
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
