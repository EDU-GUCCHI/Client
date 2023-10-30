import { EatingHabit, Exercise, Weight, AlcoholHabit, SmokingHabit, Illness, Gender } from './EnumAttributes';
import { Gotchi } from './Gotchi';

type GotchiData = {
  name: string;
  age: number;
  bloodSugar: number;
  insulinPump: boolean;
  lchf: boolean;
  eatingHabit: EatingHabit;
  exercise: Exercise;
  weight: Weight;
  alcoholHabit: AlcoholHabit;
  smokingHabit: SmokingHabit;
  illnesses: Illness[];
  gender: Gender;
};

const mockGotchiData: GotchiData = {
  name: 'Mocki',
  age: 25, // assuming age as 25 for example
  bloodSugar: 120,
  insulinPump: true,
  lchf: false,
  eatingHabit: EatingHabit.CONSISTENT,
  exercise: Exercise.ACTIVE,
  weight: Weight.NORMAL_WEIGHT,
  alcoholHabit: AlcoholHabit.SOCIAL_DRINKER,
  smokingHabit: SmokingHabit.NON_SMOKER,
  illnesses: [Illness.FEVER, Illness.PAIN],
  gender: Gender.MALE, // assuming male gender
};

const {
  name,
  age,
  bloodSugar,
  insulinPump,
  lchf,
  eatingHabit,
  exercise,
  weight,
  alcoholHabit,
  smokingHabit,
  illnesses,
  gender,
} = mockGotchiData;

export const mockGotchi = new Gotchi(
  name,
  age,
  bloodSugar,
  insulinPump,
  lchf,
  eatingHabit,
  exercise,
  weight,
  alcoholHabit,
  smokingHabit,
  illnesses,
  gender,
);
