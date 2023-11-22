import {Gotchi} from '../data/gotchi/Gotchi';
import {Storage} from '../data/Storage';
export class WeekPlanner {
  private _storage: Storage;
  private _gotchi: Gotchi;
  private _gotchiStateMachine: GotchiStateMachine;

  public constructor(storage: Storage, gotchi: Gotchi) {
    this._storage = storage;
    this._gotchi = gotchi;
    this._gotchiStateMachine = new GotchiStateMachine(State.Idle);
  }
}
