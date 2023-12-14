import { Gotchi } from '../../model/gotchi/Gotchi';
import { } from '../../model/gotchi/FrequencyEnum';
import { Age, Illness, Weight } from '../../model/gotchi/ConstantEnum';
import { EventType } from '../../model/event/EventTypes';

/**
 * @type Helper
 * @type Model
 * @description
 * This class is responsible for 
 * 1) At construction time to generate the default value that
 *    the blood-glucose should change every interval. 
 * 2) Within the scope of generating a new schedule to generate
 *    new blood-glucose change levels if a Gotchi is working out,
 *    eating e.g
 */

export class FormulaGenerator {
  private _baseline: number;

  public constructor() {
    this._baseline = 1;
  }

  public generateFormula(person: Gotchi): number {
    this._baseline = 0.1;
    for (let enumAttribute of person.constantValues()) {
      this._baseline *= enumAttribute.value;
    }
    /**
     * Baseline är den totala sammansättningen av 1 * konstanta enum-värden
     * som vi i sin tur multiplicerar vidare på
     *
     * Så exempelvis baseline * Age.YOUNG_ADULT * Weight.OVERWEIGHT * Illness.FEVER
     * Bör returnera någonting i stil med 0.85 - 0.95 (?)
     * För eating-event verkar det som att decimal-spannet vi ska multiplicera med är
     * något i stil med 0.00026
     *
     */
    /*
        let sum = 0;
        sum += person.alcoholHabit;
        sum += person.eatHabit;
        sum += person.exercise;
        sum += person.smokeHabit;
        sum += person.weight;
        let illnesses = person.illnesses;
        for(let sickness in illnesses)
        {
            sum += illnesses[sickness];
        }
        console.log("Generated factor: " + sum);
        return sum;*/
    return 0.1;
  }
  get baseline(): number {
    return this._baseline;
  }
  set baseLine(baseline: number) {
    this._baseline = baseline;
  }

  public calculateFactor(age: Age, weight: Weight, illnesses?: Illness[], eventType?: EventType): number {
    let factor = this._baseline * age * weight;
    if (illnesses && illnesses.length > 0) {
      illnesses.forEach(illness => {
        factor *= illness;
      });
    }
    if (eventType) {
      factor *= eventType;
    }
    return factor;
  }
  public static generateIncreaseFactor(): number {
    return 0.001;
  }
  public static generateDecreaseFactor(): number {
    return 0.001;
  }
}
