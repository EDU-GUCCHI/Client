// responsibility of fetching/storing and displaying data in GUI
import { Gotchi } from "../data/Gotchi";
import { Storage } from "../data/Storage";

export class GUIController {
  private storage: Storage;
  private person: Gotchi;
  private bloodSugarSubscribers: ((newBloodSugar: string) => void)[] = [];
  
  public constructor(storage: Storage) {
    this.storage = storage;
    this.person = this.storage.getPerson();
  }
  setBloodSugar(newBloodSugar: number) {
    this.person.bloodValue = newBloodSugar;
    this.notifySubscribers(newBloodSugar.toString());
  }
  subscribeToBloodSugar(callback: (newBloodSugar: string) => void) {
    this.bloodSugarSubscribers.push(callback);
    return () => {
      const index = this.bloodSugarSubscribers.indexOf(callback);
      if (index !== -1) {
        this.bloodSugarSubscribers.splice(index, 1);
      }
    };
  }
  private notifySubscribers(newBloodSugar: string) { // Notify subscribers about changes in bloodSugar
    this.bloodSugarSubscribers.forEach((callback) => {
      callback(newBloodSugar);
    });
  }
}
