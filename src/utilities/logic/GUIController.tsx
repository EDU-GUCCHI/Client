// responsibility of fetching/storing and displaying data in GUI
import updateTextHandler from "../../screens/MyGotchi";
import { Gotchi } from "../data/Gotchi";
import { Storage } from "../data/Storage";

export class GUIController
{
    private storage: Storage;
    private person: Gotchi;

    public constructor(storage: Storage)
    {
        this.storage = storage;
        this.person = this.storage.getPerson();
    }

    public UpdateBloodSugar()
    {
        // fetch value from person in storage and update GUI
        //updateTextHandler("");
    }

}