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
    // Simulation of fetching the new blood sugar value.
    // You would replace this with your actual logic to get the new value.
    const newBloodSugarValue = '223'; // Example new value

    // Call the passed callback function with the new value
    updateBloodSugarCallback(newBloodSugarValue);
  }
}
