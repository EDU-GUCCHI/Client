// responsibility of fetching/storing and displaying data in GUI
import { Gotchi } from "../data/Gotchi";
import { Storage } from "../data/Storage";

export class GUIController {
  private storage: Storage;
  private person: Gotchi;

  public constructor(storage: Storage) {
    this.storage = storage;
    this.person = this.storage.getPerson();
  }
  public UpdateBloodSugar(updateBloodSugarCallback: (value: string) => void) {
    const newBloodSugarValue = this.person.bloodValue.toString();
    updateBloodSugarCallback(newBloodSugarValue);
  }
}
