import { Gotchi } from "../data/gotchi/Gotchi";

class JSONParser {
    //Takes json string, creates a ts object and reads that data to create and return a Gotchi object
    static toGotchi(json:string): Gotchi | null {
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
    static GotchiToJSON(gotchi: Gotchi): any {
        const jsonData = {
            mockGotchi: {
                name: gotchi.name,
                age: gotchi.age,
                bloodSugar: gotchi.bloodValue,
                insulinPump: gotchi.insulinPump,
                lchf: gotchi.lchf,
                eatingHabit: gotchi.eatHabit,
                exercise: gotchi.exercise,
                weight: gotchi.weight,
                alcoholHabit: gotchi.alcoholHabit,
                smokingHabit: gotchi.smokeHabit,
                illnesses: gotchi.illnesses,
                gender: gotchi.gender,
            },
        };
        return JSON.stringify(jsonData);
    }

}
