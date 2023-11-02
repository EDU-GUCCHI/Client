import {
  EatingHabit,
  Exercise,
  Weight,
  AlcoholHabit,
  SmokingHabit,
  Illness,
  Gender,
} from './EnumAttributes';

export class Gotchi {
  //Person attributes
  private _name: string;
  private _age: number;
  private _bloodSugar: number;
  private _insulinPump: boolean;
  private _lchf: boolean;
  //Enum-attributes
  private _eatingHabit: EatingHabit;
  private _exercise: Exercise;
  private _weight: Weight;
  private _alcoholHabit: AlcoholHabit;
  private _smokingHabit: SmokingHabit;
  private _illnesses: Illness[];
  private _gender: Gender;

  //add age and gender to constructor and getters/setters
  public constructor(
    name: string,
    age: number,
    bloodSugar: number,
    insulinPump: boolean,
    lchf: boolean,
    eatingHabit: EatingHabit,
    exercise: Exercise,
    weight: Weight,
    alcoholHabit: AlcoholHabit,
    smokingHabit: SmokingHabit,
    illnesses: Illness[],
    gender: Gender,
  ) {
    this._name = name;
    this._age = age;
    this._bloodSugar = bloodSugar;
    this._insulinPump = insulinPump;
    this._lchf = lchf;
    this._illnesses = illnesses;
    this._smokingHabit = smokingHabit;
    this._alcoholHabit = alcoholHabit;
    this._weight = weight;
    this._exercise = exercise;
    this._eatingHabit = eatingHabit;
    this._gender = gender;
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
}
