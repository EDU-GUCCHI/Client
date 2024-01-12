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

  /**
   * 
   * @param gotchi generated Gotchi to generate formula of
   * @returns number which denotes the static value of decrease for a
   * @param gotchi blood-glucose level.
   * 
   * TODO: This method 
   */
  public generateFormula(gotchi: Gotchi): number {
    /**
     * Baseline is the total value of 1 multiplied by constant enum values
     * which we in turn multiply the change value with.
     * 
     * As an example, baseline * Age.YOUNG_Adult * Weight.OVERWEIGHT
     * should return something akin to 0.85 - 0.95 (?)
     * 
     * Based on the data we received, the static value of chance for a 
     * persons blood-glucose level should be something in the fourth decimal place. In
     * other words, each second blood-glucose decreases with a value in the fourth
     * decimal place, for example 0.00029
     *
     */
    /*
        let sum = 0;

        this._baseline = 0.1;
        for (let enumAttribute of gotchi.constantValues()) {
          this._baseline *= enumAttribute.value;
        }
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

  /**
   * This method recalculates the factor of change for blood-glucose levels.
   * 
   * @param age age field of the Gotchi
   * @param weight weight field of the Gotchi
   * @param illnesses illnesses field of the Gotchi
   * @param eventType The type of event which occurred (exercise, eating e.g)
   * @returns the factor which blood-glucose is supposed to increase or decrease by
   */

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
