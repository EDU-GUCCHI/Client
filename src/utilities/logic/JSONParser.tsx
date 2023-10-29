import { Gotchi } from "../data/Gotchi";

class JSONParser {
    //Takes json string, creates a ts object and reads that data to create and return a Gotchi object
    static parse(json:string): Gotchi | null {
        if(!json) return null;

        const data = JSON.parse(json);

        return new Gotchi(
        data.name || "",
        data.age || 30,
        data.bloodSugar || 100,
        data.insulinPump || false,
        data.lchf || false,
        data.eatingHabit || EatingHabit.CONSISTENT,
        data.exercise || Exercise.ACTIVE,
        data.weight || Weight.NORMAL_WEIGHT,
        data.alcoholHabit || AlcoholHabit.SOBER,
        data.smokingHabit || SmokingHabit.NON_SMOKER,
        data.illnesses || [],
        data.gender || Gender.OTHER
        );
    }
    //Takes a Gotchi object, creates and returns a JSON string with those attributes
    //TODO: Kolla om vi behöver göra något angående enum. just nu returnerar getters numeriska värden 
    static toJSON(gotchi: Gotchi): any {
        const jsonData = {
            mockGotchi: {
                name: gotchi.getName(),
                age: gotchi.getAge(),
                bloodSugar: gotchi.getBloodValue(),
                insulinPump: gotchi.getInsulinPump(),
                lchf: gotchi.getLchf(),
                eatingHabit: gotchi.getEatHabbit(),
                exercise: gotchi.getExercise(),
                weight: gotchi.getWeight(),
                alcoholHabit: gotchi.getAlcoholHabbit(),
                smokingHabit: gotchi.getSmokeHabbit(),
                illnesses: gotchi.getIllnesses(),
                gender: gotchi.getGender(),
            },
        };
        return JSON.stringify(jsonData);
    }

}
