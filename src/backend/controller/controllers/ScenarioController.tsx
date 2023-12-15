import { Storage } from '../../model/Storage';
import { EventController } from './EventController';
import { FormulaGenerator } from '../time/FormulaGenerator';
import { GUIController } from './GUIController';
import { IntervallHandler } from '../time/IntervalHandler';
import { NotificationController } from './NotificationController';
import { newGotchi } from '../../model/gotchi/GotchiRandomizer';
import { WeekPlanner } from '../../model/event/WeekPlanner';
import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { Alert } from 'react-native';

/**
 * @type Controller
 * @description
 * This class is responsible for a lot of stuff.
 * 
 */

export class ScenarioController {
  // has logic classes and access to stored data
  private _formulaGenerator: FormulaGenerator;
  private _storage: Storage;
  private _intervalHandler: IntervallHandler;
  private _GUIController: GUIController;
  private _notificationController: NotificationController;
  private _eventController: EventController;
  private _weekPlanner: WeekPlanner;
  // flow of program here:
  public constructor() {
    console.log('Controller: Created');
    // instantiate classes
    this._storage = new Storage();
    this._GUIController = new GUIController(this._storage.person);

    this._formulaGenerator = new FormulaGenerator();
    this._storage.increaseFactor = FormulaGenerator.generateIncreaseFactor();
    this._storage.decreaseFactor = FormulaGenerator.generateDecreaseFactor();

    this._notificationController = new NotificationController();
    this._eventController = new EventController(this._storage);
    this._weekPlanner = new WeekPlanner(this._storage.person);
    this._intervalHandler = new IntervallHandler(
      this._storage,
      this._storage.person,
      this._notificationController,
      this._eventController,
      this._weekPlanner
    );
  }
  checkPermissions = async () => {
    try {
      const settings = await notifee.getNotificationSettings();
      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        this.run(); // run app if permissions are authorized
      }
      else {
        await notifee.requestPermission();
        Alert.alert('Slå på notifikationer för en bättre upplevelse');
      }
    }
    catch (error) {
      console.error('Error checking notification permission:', error);
    }
  };
  public run() {
    console.log('Controller: Runs');
    // app flow
    //this._storage.person = newGotchi(this._GUIController.gotchisName); TODO: fix freeze bugg with gotchi randomizer
    //this.debugRandomizer(); use to test gothi randomizer
    this._storage.person = newGotchi(this._GUIController.gotchisName);
    this._weekPlanner.plannedWeek(this._storage.person);
    this._storage.bloodSugarFactor = this._formulaGenerator.generateFormula(
      this._storage.person,
    );
    //this._clock.startClock(); // start clock pulse
    let isWeekDay = this._intervalHandler.processWeek();
    if (isWeekDay) {
      this._intervalHandler.reprocessWeek();
      this._eventController.pointOfEntryEvent();
    }
    else {
      console.log("can't start scenario on weekends! Scenarios are available: MON - FRI");
    }
  }
  public terminate() {
    // end scenario
    console.log('Controller: Terminated');
    //this._clock.stopClock();
    //refresh classes for possible new scenario
    this._storage = new Storage();
    this._GUIController = new GUIController(this._storage.person);
    this._formulaGenerator = new FormulaGenerator();
    this._notificationController = new NotificationController();
    this._eventController = new EventController(this._storage);
    this._weekPlanner = new WeekPlanner(this._storage.person);
    //this._clock = new Clock();
    this._intervalHandler = new IntervallHandler(
      this._storage,
      this._storage.person,
      this._notificationController,
      this._eventController,
      this._weekPlanner
    );
  }
  public debugRandomizer() {
    let i = 0;
    for (i; i < 100; i++) {
      try {
        let g = newGotchi('subject');
      }
      catch (error) {
        console.log('Gotchi nr: ' + i + ' failed to randomize');
        break;
      }
      console.log('Gotchi nr: ' + i + ' success');
    }
  }

  get GUIController(): GUIController {
    return this._GUIController;
  }
  get storage(): Storage {
    return this._storage;
  }
  get eventDispatcher() {
    return this._eventController;
  }
}
