import {
  Gender,
  EatingHabit,
  Exercise,
  Weight,
  AlcoholHabit,
  SmokingHabit,
  Illness,
} from './EnumAttributes';
import {Gotchi} from './Gotchi';

export function newGotchi(name: string): Gotchi {
  const random = Math.random();

  var gender = Gender.FEMALE;
  var insulinPump = false;
  var lchf = false;
  var age = getRandomNumber(20, 80);
  var flip = coinFlip();
  if (flip === 1) {
    gender = Gender.MALE;
  }
  flip = coinFlip();
  if (flip === 1) {
    insulinPump = true;
  }
  flip = coinFlip();
  if (flip === 1) {
    lchf = true;
  }

  const eatingHabits = Object.keys(EatingHabit).filter(key => isNaN(Number(key)));
  const exerciseHabits = Object.keys(Exercise).filter(key => isNaN(Number(key)));
  const weights = Object.keys(Weight).filter(key => isNaN(Number(key)));
  const alcoholHabits = Object.keys(AlcoholHabit).filter(key => isNaN(Number(key)));
  const smokingHabits = Object.keys(SmokingHabit).filter(key => isNaN(Number(key)));
  const illnesses = Object.keys(Illness).filter(key => isNaN(Number(key)));

  const chosenEatingHabit   = eatingHabits[Math.floor(random * eatingHabits.length)];
  const chosenExerciseHabit = exerciseHabits[Math.floor(random * exerciseHabits.length)];
  const chosenWeight        = weights[Math.floor(random * weights.length)];
  const chosenAlcoholHabit  = alcoholHabits[Math.floor(random * alcoholHabits.length)];
  const chosenSmokingHabit  = smokingHabits[Math.floor(random * smokingHabits.length)];

  let count = Math.floor(random * illnesses.length);
  let chosenIllnesses = [];
  illnesses.sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    chosenIllnesses.push(illnesses.pop());
  }
  return new Gotchi(
    name,
    age,
    gender,
    8,
    insulinPump,
    lchf,
    chosenEatingHabit,
    chosenExerciseHabit,
    chosenWeight,
    chosenAlcoholHabit,
    chosenSmokingHabit,
    chosenIllnesses,
  );
}

function coinFlip(): number {
  return Math.round(Math.random()) + 1;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
