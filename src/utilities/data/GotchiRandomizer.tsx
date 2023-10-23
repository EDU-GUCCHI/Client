import { EatingHabit, Exercise, Weight, AlcoholHabit, SmokingHabit, Illness} from './EnumAttributes';
import { Gotchi } from './Gotchi';

export function newGotchi(name : string) {
    const random = Math.random();

    var insulinPump = false;
    var lchf = false;
    var flip = Math.round(Math.random()) + 1;
    if(flip == 1) {
        insulinPump = true;
    }
    flip = Math.round(Math.random()) + 1;
    if(flip == 1) {
        lchf = true;
    }

    const eatingHabits      = Object.values(EatingHabit);
    const exerciseHabits    = Object.values(Exercise);
    const weights           = Object.values(Weight);
    const alcoholHabits     = Object.values(AlcoholHabit);
    const smokingHabits     = Object.values(SmokingHabit);
    const illnesses         = Object.values(Illness);

    const chosenEatingHabit     = eatingHabits[Math.floor(random * eatingHabits.length)];
    const chosenExerciseHabit   = exerciseHabits[Math.floor(random * exerciseHabits.length)];
    const chosenWeight          = weights[Math.floor(random * weights.length)];
    const chosenAlcoholHabit    = alcoholHabits[Math.floor(random * alcoholHabits.length)];
    const chosenSmokingHabit    = smokingHabits[Math.floor(random * smokingHabits.length)];

    let count = Math.floor(random * illnesses.length);
    let chosenIllnesses = [];
    const shuffle = (illnesses: string[]) => { 
        return illnesses.sort(() => Math.random() - 0.5); 
    }; 
    for(let i = 0; i < count; i++) {
        chosenIllnesses.push(illnesses.pop);
    }
    return new Gotchi
    (
        name,
        8,
        insulinPump,
        lchf,
        chosenEatingHabit,
        chosenExerciseHabit,
        chosenWeight,
        chosenAlcoholHabit,
        chosenSmokingHabit,
        chosenIllnesses
    );
}