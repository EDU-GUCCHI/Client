import {
  Gender,
  EatingHabit,
  Exercise,
  Weight,
  AlcoholHabit,
  SmokingHabit,
  Illness,
} from './EnumAttributes';

export class Gotchi {
  //Person attributes
  private name: string;
  private age: number;
  private bloodSugar: number;
  private insulinPump: boolean;
  private lchf: boolean;
  //Enum-attributes
  private gender: Gender;
  private eatingHabit: EatingHabit;
  private exercise: Exercise;
  private weight: Weight;
  private alcoholHabit: AlcoholHabit;
  private smokingHabit: SmokingHabit;
  private illnesses: Illness[];

  public constructor(
    name: string,
    age: number,
    gender: Gender,
    bloodSugar: number,
    insulinPump: boolean,
    lchf: boolean,
    eatingHabit: EatingHabit,
    exercise: Exercise,
    weight: Weight,
    alcoholHabit: AlcoholHabit,
    smokingHabit: SmokingHabit,
    illnesses: Illness[],
  ) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.bloodSugar = bloodSugar;
    this.insulinPump = insulinPump;
    this.lchf = lchf;
    this.illnesses = illnesses;
    this.smokingHabit = smokingHabit;
    this.alcoholHabit = alcoholHabit;
    this.weight = weight;
    this.exercise = exercise;
    this.eatingHabit = eatingHabit;
  }
  //getters-setters
  getName(): string {
    return this.name;
  }
  getBloodValue(): number {
    return this.bloodSugar;
  }
  getGender(): Gender {
    return this.gender;
  }
  getAge(): number {
    return this.age;
  }
  getInsulinPump(): boolean {
    return this.insulinPump;
  }
  getLchf(): boolean {
    return this.lchf;
  }
  getEatHabbit(): EatingHabit {
    return this.eatingHabit;
  }
  getExercise(): Exercise {
    return this.exercise;
  }
  getWeight(): Weight {
    return this.weight;
  }
  getAlcoholHabit(): AlcoholHabit {
    return this.alcoholHabit;
  }
  getSmokingHabit(): SmokingHabit {
    return this.smokingHabit;
  }
  getIllnesses(): Illness[] {
    return this.illnesses;
  }
  // Setters for private attributes
  setName(name: string): void {
    this.name = name;
  }
  setBloodValue(bloodValue: number): void {
    this.bloodSugar = bloodValue;
  }
  setGender(gender: Gender): void {
    this.gender = gender;
  }
  setAge(age: number): void {
    this.age = age;
  }
  setInsulinPump(insulinPump: boolean): void {
    this.insulinPump = insulinPump;
  }
  setLchf(lchf: boolean): void {
    this.lchf = lchf;
  }
  setEatHabbit(eatHabbit: EatingHabit): void {
    this.eatingHabit = eatHabbit;
  }
  setExercise(exercise: Exercise): void {
    this.exercise = exercise;
  }
  setWeight(weight: Weight): void {
    this.weight = weight;
  }
  setAlcoholHabbit(alcoholHabbit: AlcoholHabit): void {
    this.alcoholHabit = alcoholHabbit;
  }
  setSmokeHabbit(smokeHabbit: SmokingHabit): void {
    this.smokingHabit = smokeHabbit;
  }
  setIllnesses(illnesses: Illness[]): void {
    this.illnesses = illnesses;
  }
  stringRepresentation() : string {
    return `\n> Name: ${this.name}\n` +
    `> Age: ${this.age}\n` +
    `> Blood Sugar: ${this.bloodSugar}\n` +
    `> Insulin Pump: ${this.insulinPump ? 'Yes' : 'No'}\n` +
    `> Gender: ${this.gender}\n` + 
    `> LCHF: ${this.lchf ? 'Yes' : 'No'}\n` +
    `> Eating Habit: ${this.eatingHabit}\n` +
    `> Exercise: ${this.exercise}\n` +
    `> Weight: ${this.weight}\n` +
    `> Alcohol Habit: ${this.alcoholHabit}\n` +
    `> Smoking Habit: ${this.smokingHabit}\n` +
    `> Illnesses: ${this.illnesses.join(', ')}`;
  }
}
