import { EatingHabit, Exercise, Weight, AlcoholHabit, SmokingHabit, Illness } from './EnumAttributes';
import {Gotchi} from './Gotchi';

const mockGotchiData = {
  name: "Mocki Gotchi",
  bloodSugar: 120,
  insulinPump: true,
  lchf: false,
  eatingHabit: EatingHabit.Healthy,
  exercise: Exercise.Moderate,
  weight: Weight.Normal,
  alcoholHabit: AlcoholHabit.Occasional,
  smokingHabit: SmokingHabit.NonSmoker,
  illnesses: [Illness.FEVER, Illness.PAIN],
};

const mockGotchi = new Gotchi(
  mockGotchiData.name,
  mockGotchiData.bloodSugar,
  mockGotchiData.insulinPump,
  mockGotchiData.lchf,
  mockGotchiData.eatingHabit,
  mockGotchiData.exercise,
  mockGotchiData.weight,
  mockGotchiData.alcoholHabit,
  mockGotchiData.smokingHabit,
  mockGotchiData.illnesses
);
