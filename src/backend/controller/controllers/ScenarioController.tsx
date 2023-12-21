import {Storage} from '../../model/Storage';
import {EventController} from './EventController';
import {FormulaGenerator} from '../time/FormulaGenerator';
import {GUIController} from './GUIController';
import {IntervallHandler} from '../time/IntervalHandler';
import {NotificationController} from './NotificationController';
import {newGotchi} from '../../model/gotchi/GotchiRandomizer';
import {WeekPlanner} from '../../model/event/WeekPlanner';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import {Alert} from 'react-native';
import {Clock} from '../time/Clock';

import React from 'react';
export const ScenarioControllerContext = React.createContext(null);

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
  private _clock: Clock;
  private _intervalHandler: IntervallHandler;
  private _GUIController: GUIController;
  private _notificationController: NotificationController;
  private _eventController: EventController;
  private _weekPlanner: WeekPlanner;
  private _isLoading: boolean = false;
  // flow of program here:
  public constructor() {
    console.log('Controller: Created');
    // instantiate classes
    this._storage = new Storage();
    this._clock = new Clock();
    this._GUIController = new GUIController(this, this._clock);

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
      this._weekPlanner,
      this._isLoading,
    );
  }
  setLoading(isLoading) {
    this._isLoading = isLoading;
    this.onLoadingChange(isLoading);
  }
  onLoadingChange = isLoading => {};

  checkPermissions = async () => {
    this.setLoading(true);
    try {
      const settings = await notifee.getNotificationSettings();

      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        console.log('Loading', this._isLoading);
        this.run(); // run app if permissions are authorized
        this.setLoading(false);
      } else {
        await notifee.requestPermission();
        Alert.alert('Slå på notifikationer för en bättre upplevelse');
      }
    } catch (error) {
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
    this._eventController.pointOfEntryEvent();
    let isWeekDay = this._intervalHandler.processWeek();

    if (isWeekDay) {
      // change this. just a placeholder for logic
      this.reprocessWeek(); // abstract this method to just processWeek
      // on exit stop clock and remove observers
    } else {
      console.log(
        "can't start scenario on weekends! Scenarios are available: MON - FRI",
      );
    }
  }
  public reprocessWeek() {
    this._intervalHandler.reprocessWeek();
    this._GUIController.resetIndex();
    this._GUIController.bloodSugarValues = this._storage.bloodSugarValues;
    this._GUIController.startUpdateBloodsugar();
  }
  public terminate() {
    // end scenario
    console.log('Controller: Terminated');
    this._GUIController.stopUpdateBloodsugar();
    //refresh classes for possible new scenario
    this._storage = new Storage();
    this._GUIController = new GUIController(this, this._clock);
    this._formulaGenerator = new FormulaGenerator();
    this._notificationController = new NotificationController();
    this._eventController = new EventController(this._storage);
    this._weekPlanner = new WeekPlanner(this._storage.person);
    this._clock = new Clock();
    this._intervalHandler = new IntervallHandler(
      this._storage,
      this._storage.person,
      this._notificationController,
      this._eventController,
      this._weekPlanner,
      this._isLoading,
    );
  }
  public debugRandomizer() {
    let i = 0;
    for (i; i < 100; i++) {
      try {
        let g = newGotchi('subject');
      } catch (error) {
        console.log('Gotchi nr: ' + i + ' failed to randomize');
        break;
      }
      console.log('Gotchi nr: ' + i + ' success');
    }
  }

  set gotchiBloodValue(value: number) {
    this._storage.person.bloodValue = value;
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
