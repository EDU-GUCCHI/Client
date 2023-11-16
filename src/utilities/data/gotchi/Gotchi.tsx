import { Gender, EatingHabit, Age, Exercise, Weight, AlcoholHabit, SmokingHabit, Illness } from './EnumAttributes';

export class Gotchi {

  private _name: string;
  private _bloodSugar: number;
  private _insulinPump: boolean;
  private _lchf: boolean;

  private _age : Age;
  private _eatingHabit: EatingHabit;
  private _exercise: Exercise;
  private _weight: Weight;
  private _alcoholHabit: AlcoholHabit;
  private _smokingHabit: SmokingHabit;
  private _illnesses: Illness[];
  private _gender: Gender;

  public constructor(
    name:         string,
    bloodSugar:   number,
    insulinPump:  boolean,
    lchf:         boolean,
    age:          Age,
    eatingHabit:  EatingHabit,
    exercise:     Exercise,
    weight:       Weight,
    alcoholHabit: AlcoholHabit,
    smokingHabit: SmokingHabit,
    gender:       Gender,
    illnesses:    Illness[]
  ) {
    this._name = name;
    this._bloodSugar = bloodSugar;
    this._insulinPump = insulinPump;
    this._lchf = lchf;
    this._age = age;
    this._smokingHabit = smokingHabit;
    this._alcoholHabit = alcoholHabit;
    this._weight = weight;
    this._exercise = exercise;
    this._eatingHabit = eatingHabit;
    this._gender = gender;
    this._illnesses = illnesses;
  }
  //getters-setters
  get name(): string {
    return this._name;
  }
  get age(): number {
    return this._age;
  }
  get bloodValue(): number {
    return this._bloodSugar;
  }
  get insulinPump(): boolean {
    return this._insulinPump;
  }
  get lchf(): boolean {
    return this._lchf;
  }
  get eatHabit(): EatingHabit {
    return this._eatingHabit;
  }
  get exercise(): Exercise {
    return this._exercise;
  }
  get weight(): Weight {
    return this._weight;
  }
  get alcoholHabit(): AlcoholHabit {
    return this._alcoholHabit;
  }
  get smokeHabit(): SmokingHabit {
    return this._smokingHabit;
  }
  get illnesses(): Illness[] {
    return this._illnesses;
  }
  get gender(): Gender {
    return this._gender;
  }
  // Setters for private attributes
  set name(name: string) {
    this._name = name;
  }
  set bloodValue(bloodValue: number) {
    this._bloodSugar = bloodValue;
  }
  set insulinPump(insulinPump: boolean) {
    this._insulinPump = insulinPump;
  }
  set lchf(lchf: boolean) {
    this._lchf = lchf;
  }
  set eatHabit(eatHabbit: EatingHabit) {
    this._eatingHabit = eatHabbit;
  }
  set exercise(exercise: Exercise) {
    this._exercise = exercise;
  }
  set weight(weight: Weight) {
    this._weight = weight;
  }
  set alcoholHabit(alcoholHabbit: AlcoholHabit) {
    this._alcoholHabit = alcoholHabbit;
  }
  set smokeHabit(smokeHabbit: SmokingHabit) {
    this._smokingHabit = smokeHabbit;
  }
  set illnesses(illnesses: Illness[]) {
    this._illnesses = illnesses;
  }
  

  ageStringRepresentation(this: any) {
    switch(this._age) {
      case Age.YOUNG_ADULT : return "Ung vuxen";
      case Age.ADULT : return "Vuxen";
      case Age.SENIOR : return "Senior";
    }
    return "Undefined";
  }
  genderStringRepresentation(this: any) {
    switch(this._gender) {
      case Gender.MALE : return "Man";
      case Gender.FEMALE : return "Kvinna"
    }
    return "Undefined";
  }

  eatingHabitStringRepresentation(this: any) {
    switch(this._eatingHabit) {
      case EatingHabit.VOLATILE : return "Äter inkonsistent";
      case EatingHabit.CONSISTENT : return "Äter konsistent";
    }
    return "Undefined";
  }
  exerciseHabitStringRepresentation(this: any) {
    switch(this._exercise) {
      case Exercise.VERY_ACTIVE : return "Tränar ofta";
      case Exercise.ACTIVE : return "Tränar regelbundet";
      case Exercise.INACTIVE : return "Tränar sällan";
    }
    return "Undefined";
  }
  smokingHabitStringRepresentation(this: any) {
    switch(this._smokingHabit) {
      case SmokingHabit.HEAVY_SMOKER : return "Vanerökare";
      case SmokingHabit.SOCIAL_SMOKER : return "Röker socialt";
      case SmokingHabit.NON_SMOKER : return "Icke-rökare";
    }
    return "Undefined";
  }
}
