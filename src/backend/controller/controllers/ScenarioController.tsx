import { Storage } from '../../model/Storage';
import { EventController } from './EventController';
import { FormulaGenerator } from '../time/FormulaGenerator';
import { GUIController } from './GUIController';
import { IntervalHandler } from '../time/IntervalHandler';
import { NotificationController } from './NotificationController';
import { newGotchi } from '../../model/gotchi/GotchiRandomizer';
import { WeekPlanner } from '../../model/event/WeekPlanner';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Alert } from 'react-native';
import { Clock } from '../time/Clock';

/**
 * @type Controller
 * @description
 * This class acts as the main controller for the entire back-end.
 */

export class ScenarioController {
  private _formulaGenerator: FormulaGenerator;
  private _storage: Storage;
  private _clock: Clock;
  private _intervalHandler: IntervalHandler;
  private _GUIController: GUIController;
  private _notificationController: NotificationController;
  private _eventController: EventController;
  private _weekPlanner: WeekPlanner;
  private _isLoading: boolean = false;

  /**
   * Constructor. Initializes all fields.
   */
  public constructor() {
    //console.log('Controller: Created');
    this._storage = new Storage(this);
    this._clock = new Clock();
    this._GUIController = new GUIController(this, this._clock);

    this._formulaGenerator = new FormulaGenerator();
    this._storage.increaseFactor = FormulaGenerator.generateIncreaseFactor();
    this._storage.decreaseFactor = FormulaGenerator.generateDecreaseFactor();

    this._notificationController = new NotificationController();
    this._eventController = new EventController(this._storage, this);
    this._weekPlanner = new WeekPlanner(this._storage.person);
    this._intervalHandler = new IntervalHandler(
      this._storage,
      this._storage.person,
      this._notificationController,
      this._eventController,
      this._weekPlanner,
    );
  }

  /**
   * This method sets the state of loading to true or false. Used 
   * when needing to display loading bar to the end-user.
   * 
   * TODO: This method needs to be called when the end-user finishes
   * a form.
   * 
   * @param isLoading Whether IntervalHandler is still calculating
   * @returns void
   */
  setLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    // Notify observers here if needed
  }

  /**
   * This method asynchronously checks whether the application has
   * permissions to send notifications or not.
   * @returns void
   */

  checkPermissions = async () => {
    this.setLoading(true);
    try {
      const settings = await notifee.getNotificationSettings();
      if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
        this.run(); // run app if permissions are authorized
      } else {
        await notifee.requestPermission();
        Alert.alert('Slå på notifikationer för en bättre upplevelse');
      }
    } catch (error) {
      console.error('Error checking notification permissions:', error);
    }
  };

  /**
   * This method is a point-of-entry method for the Controller to
   * initialize the Gotchi which will remain for the week, as well as
   * process eventual events, notifications e.g which pertain to that Gotchi.
   * @returns void
   */

  public run() {
    //console.log('Controller: Runs');
    this._storage.person = newGotchi(this._GUIController.gotchisName);
    this._weekPlanner.plannedWeek(this._storage.person);
    this._storage.bloodSugarFactor = this._formulaGenerator.generateFormula(
      this._storage.person,
    );
    this._eventController.pointOfEntryEvent();
    let isWeekDay = this._intervalHandler.processWeek();
    if (isWeekDay) {
      this.reprocessWeek();
    } else {
      console.log(
        "can't start scenario on weekends! Scenarios are available: MON - FRI",
      );
    }
  }

  /**
   * This method processes the week again. To be called when the user gives
   * input from forms.
   * @returns void 
   */

  public reprocessWeek() {
    this._intervalHandler.reprocessWeek();
    this._GUIController.resetIndex();
    this._GUIController.bloodSugarValues = this._storage.bloodSugarValues;
    this._GUIController.startUpdateBloodsugar();
    this.setLoading(false);
  }

  /**
   * When a week is finished, this method is called in order to re-initialize
   * all fields and begin anew.
   * @returns void
   */

  public terminate() {
    // end scenario
    console.log('Controller: Terminated');
    this._GUIController.stopUpdateBloodsugar();
    //refresh classes for possible new scenario
    this._storage = new Storage(this);
    this._GUIController = new GUIController(this, this._clock);
    this._formulaGenerator = new FormulaGenerator();
    this._notificationController = new NotificationController();
    this._eventController = new EventController(this._storage, this);
    this._weekPlanner = new WeekPlanner(this._storage.person);
    this._clock = new Clock();
    this._intervalHandler = new IntervalHandler(
      this._storage,
      this._storage.person,
      this._notificationController,
      this._eventController,
      this._weekPlanner,
    );
  }

  /**
   * Getters, setters.
   */

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
  get isLoading() {
    return this._isLoading;
  }
  get intervalHandler(): IntervalHandler {
    return this._intervalHandler;
  }
  get eventController(): EventController {
    return this._eventController;
  }

}
