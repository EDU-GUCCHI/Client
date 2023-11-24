import {EatingHabit, Exercise, AlcoholHabit} from './FrequencyEnum';
import {Age, Weight, Illness} from './ConstantEnum'

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
  private _illnesses: Illness;
  private _gender: boolean;


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
    gender:       boolean,
    illnesses:    Illness
  ) {
    this._name = name;
    this._bloodSugar = bloodSugar;
    this._insulinPump = insulinPump;
    this._lchf = lchf;
    this._age = age;
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
  get illnesses(): Illness {
    return this._illnesses;
  }
  get gender(): boolean {
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
  set illnesses(illnesses: Illness) {
    this._illnesses = illnesses;
  }
  
  staticValues() : any {
    let arr = [];
    arr.push(this._age);
    arr.push(this._weight);
    arr.push(this._illnesses);
    return arr;
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
    if(this._gender) {
      return "Kvinna"
    } else {
      return "Man";
    }
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
}
