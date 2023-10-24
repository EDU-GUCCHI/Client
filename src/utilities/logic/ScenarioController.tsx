import { AlcoholHabit, EatingHabit, Exercise, Illness, SmokingHabit, Weight } from '../data/EnumAttributes';
import {Gotchi} from '../data/Gotchi';
import {FormulaGenerator} from './FormulaGenerator';

export class ScenarioController
{

    //private gotchi: Gotchi;
    
    /*
    public constructor(gotchi: Gotchi)
    {
        this.gotchi = new Gotchi(); // use randomGenerator returnObject here!
    }
    */
    //controlls entire flow of app logic (has access to all data modules)


    //this section for testing code, Comment out when not testing!

    private formulaGenerator: FormulaGenerator;
    private person: Gotchi;
    
    //flow of program here:
    public constructor()
    {
        console.log("Controller: Runs")

        this.formulaGenerator = new FormulaGenerator(); // create generator
        this.person = new Gotchi("subject",5,true,true, // create testsubject
            EatingHabit.CONSISTENT,
            Exercise.INACTIVE,
            Weight.NORMAL_WEIGHT,
            AlcoholHabit.SOCIAL_DRINKER,
            SmokingHabit.NON_SMOKER,
            [Illness.FEVER,Illness.PAIN]);

        this.formulaGenerator.generateFormula(this.person);
    }
}