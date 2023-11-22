import {Exercise} from '../data/gotchi/EnumAttributes';
import {Gotchi} from '../data/gotchi/Gotchi';
import {Storage} from '../data/Storage';
import cron from 'node-cron';
export class WeekPlanner {
  private _storage: Storage;
  private _gotchi: Gotchi;
  private _gotchiStateMachine: GotchiStateMachine;

  public constructor(storage: Storage, gotchi: Gotchi) {
    this._storage = storage;
    this._gotchi = gotchi;
    this._gotchiStateMachine = new GotchiStateMachine(State.Idle);
  }

  //Kan testa om något sånt här fungerar, man kan schemalägga event till specifika tidpunkter
  public scheduleEvents(): void {
    if (this._gotchi.exercise == Exercise.ACTIVE) {
      // Schedule exercise at 8 AM every other day, kolla node cron för syntax på schedule
      cron.schedule('*/2 8 * * *', () => {
        console.log('Scheduled exercise');
        // Add event for exercise, behöver känna till eventdispatcher
        this._gotchiStateMachine.transitionTo(State.Exercise);
      });
    }
  }
}
