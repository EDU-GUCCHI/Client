import { Gotchi } from '../../model/gotchi/Gotchi';
import { EventController } from '../controllers/EventController';
import { GUIController } from '../controllers/GUIController';
import { NotificationController } from '../controllers/NotificationController';
import { Storage } from '../../model/Storage';
import { WeekPlanner } from '../../model/event/WeekPlanner';
import { EventType } from '../../model/event/EventTypes';

/**
 * This class is responsible for taking the data we have
 * available and processing each interval of time from
 * a point to the end of the week for the Gotchi and
 * scheduling notifications based on the blood-glucose levels
 * it finds. 
 */
export class IntervalHandler {
  private _bloodValue: number;
  private _increaseFactor: number;
  private _decreaseFactor: number;
  private _weektime: number;
  private _sec: number;
  private _updateIncrement: number;
  private _person: Gotchi;
  private _notificationController: NotificationController;
  private _eventController: EventController;
  private _scenarioStartDate: Date;
  private _dateString: string;
  private _warningNotificationSent: Boolean;
  private _criticalWarningSent: Boolean;
  private _deathNotificationSent: Boolean;
  private _storage: Storage;
  private _weekplanner: WeekPlanner;
  private _bloodSugarValues: number[];
  private _tempFactor: number;
  private _secLeftOnFactor: number;

  /**
   * Constructor. Takes
   * @param storage data we have available
   * @param gotchi Gotchi we have available
   * @param notificationController controller for sending Notifications. 
   * @param eventController controller for handling events. Can likely be removed
   * @param weekplanner helper class for generating a given week of events. Can likely be removed
   */
  public constructor(
    storage: Storage,
    gotchi: Gotchi,
    notificationController: NotificationController,
    eventController: EventController,
    weekplanner: WeekPlanner,
  ) {
    this._person = gotchi;
    this._storage = storage;
    this._bloodSugarValues = [];
    this._sec = 0;
    this._dateString = '';
    this._scenarioStartDate = new Date();
    this._bloodValue = gotchi.bloodValue;
    this._increaseFactor = 0;
    this._decreaseFactor = 0;
    this._updateIncrement = 0;
    this._tempFactor = 0;
    this._secLeftOnFactor = 0;
    this._weektime = 432000; // default value of 5 days in seconds
    this._notificationController = notificationController;
    this._eventController = eventController;
    this._weekplanner = weekplanner;
    this._warningNotificationSent = false;
    this._criticalWarningSent = false;
    this._deathNotificationSent = false;
    this.updateFactors();
  }

  /**
   * This method is responsible for calculating the amount of time
   * left from now until the end of Friday, 23:55, setting its
   * own internal field to this value.
   * @returns void
   */
  public defineWeekTime() {
  
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysUntilFriday = (5 - currentDay + 7) % 7;
    const fridayDate = new Date(currentDate);
    fridayDate.setDate(currentDate.getDate() + daysUntilFriday);
    fridayDate.setHours(23, 55, 0, 0);
    const timeDifferenceInSeconds = Math.floor(
      (fridayDate.getTime() - currentDate.getTime()) / 1000,
    );
    //console.log(`Seconds until Friday 23:55: ${timeDifferenceInSeconds}`);
    this._weektime = timeDifferenceInSeconds;
  }

  /**
   * This method is to be used if the Gotchis blood value falls below
   * critical levels. If it does, it's sent to a hospital for 7200 
   * seconds which is reflected by adding the same amount of time
   * to the amount of time we have left to calculate.
   * @returns void
   */
  public sendGotchiToHospital() {
    this._sec += 7200; // Gotchi at hospital for 2 hours
    this._bloodValue = 5; // reset bloodlevels
    this._person.bloodValue = this.bloodValue;
    let date = this.secondsToDate(this._sec);
    //NotificationScheduler.scheduleNotification(date);
    //console.log("Your gotchi was treated at the hospital and is now fine.");
    //console.log("Your gotchi got home at: " + this._dateString);
  }

  /**
   * This method is responsible for returning a formatted date
   * @param date 
   * @returns 
   */
  public formatDigitalClock(date: Date): string {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  }

  /**
   * This method takes
   * @param seconds integer
   * @returns date and time
   * which the @param seconds leads to. In other words,
   * which date and time we get if we add x seconds to todays date.
   */
  public secondsToDate(seconds: number): Date {
    const milliseconds = seconds * 1000; // Convert seconds to milliseconds
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() + milliseconds); // Create a new Date object using milliseconds
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1; // Months are zero-based (0-11), so adding 1
    const day: number = date.getDate();
    const formattedTime = this.formatDigitalClock(date);
    this._dateString = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')} ${formattedTime}`;
    return date;
  }

  /**
   * Helper method. Takes
   * @param date 
   * in order to calculate the seconds left from the current date until
   * that date. 
   * @returns the count of seconds.
   */
  public dateToSeconds(date: Date): number {
    const currentDate = new Date();
    const milliseconds = date.getTime() - currentDate.getTime(); // Get the difference in milliseconds
    const seconds = milliseconds / 1000; // Convert milliseconds to seconds
    return seconds;
  }

  /**
   * This method is responsible for updating the factor of 
   * increase pertaining to blood-glucose level.
   */
  public updateFactors() {
    this.increaseFactor = this._storage.increaseFactor;
    this._decreaseFactor = this._storage.decreaseFactor;
  }

  /**
   * This method is responsible for decreasing the 
   * blood-sugar level for calculation purposes.
   * TODO: Send to event dispatcher to dispatch relevant events based on blood-glucose level
   */
  public decreaseBloodSugar() {
    this._bloodValue -= this._decreaseFactor;
    this._person.bloodValue = this._bloodValue;
    //console.log("Bloodsugar: " + this._bloodValue);
  }

  /**
   * This method takes a number and negates it.
   * @param num Blood-glucose change
   * @returns The inverted value of the blood-glucose change
   */
  public negateValue(num: number): number {
    return num * -1;
  }

  /**
   * This method is used for resetting notification flags.
   * The use-case is for making sure that we don't send the
   * same notification twice if a blood-glucose level would
   * exceed a certain point, then fall until the same point
   * is reached (effectively notifying twice)
   * @returns void
   */

  public resetNotificationFlags() {
    if (this._bloodValue >= 4 && this._bloodValue <= 8) {
      this._warningNotificationSent = false;
    }
    if (this._bloodValue >= 2 && this._bloodValue <= 10) {
      this._criticalWarningSent = false;
    }
    if (this._bloodValue >= 1 && this._bloodValue <= 12) {
      this._deathNotificationSent = false;
    }
  }

    /**
   * This method checks upper threshold boundaries of blood-glucose
   * values which are dangerous and schedules notifications if any
   * values are reached. 
   * @returns void
   */

  public checkUpperTreshold() {
    let date;
    if (this._bloodValue > 8 && !this._warningNotificationSent) {
      //this._notificationDispatcher.SendBloodSugarWarning("Högt blodsocker");
      date = this.secondsToDate(this._sec);
      //NotificationScheduler.scheduleNotification(date);
      console.log('warning sent for high bloodsugar! at: ' + this._dateString);
      this._warningNotificationSent = true;
    } else if (this._bloodValue > 10 && !this._criticalWarningSent) {
      //this._notificationDispatcher.SendBloodSugarWarning("Kritiskt högt blodsocker");
      date = this.secondsToDate(this._sec);
      //NotificationScheduler.scheduleNotification(date);
      console.log(
        'critical warning sent for high bloodsugar! at: ' + this._dateString,
      );
      this._warningNotificationSent = true;
    } else if (this._bloodValue > 12 && !this._deathNotificationSent) {
      //this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
      date = this.secondsToDate(this._sec);
      //NotificationScheduler.scheduleNotification(date);
      this._deathNotificationSent = true;
      console.log(
        'Gotchi is sent to hospital because of high bloodsugar at: ' +
        this._dateString,
      );
      this.sendGotchiToHospital();
    }
  }

  /**
   * This method checks lower threshold boundaries of blood-glucose
   * values which are dangerous and schedules notifications if any
   * values are reached. 
   * @returns void
   */

  public checkLowerThreshold() {
    let date;
    if (this._bloodValue < 4 && !this._warningNotificationSent) {
      // check if to send notificationwarning
      //this._notificationDispatcher.SendBloodSugarWarning("Lågt blodsocker");
      date = this.secondsToDate(this._sec);
      //NotificationScheduler.scheduleNotification(date);
      //this._eventController.LowBloodSugar();
      this._warningNotificationSent = true;
      //console.log("warning of low bloodsugar sent at: " + this._dateString);
      //console.log("Blood sugar warning sent")
    } else if (this._bloodValue < 2 && !this._criticalWarningSent) {
      //this._notificationDispatcher.SendBloodSugarWarning("Kritiskt lågt blodsocker");
      date = this.secondsToDate(this._sec);
      //NotificationScheduler.scheduleNotification(date);
      //this._eventController.LowBloodSugar();
      this._criticalWarningSent = true;
      //console.log("warning of critically low bloodsugar sent at: " + this._dateString);
      //console.log("Critical Blood sugar warning sent")
    } else if (this._bloodValue < 1 && !this._deathNotificationSent) {
      //this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
      date = this.secondsToDate(this._sec);
      //NotificationScheduler.scheduleNotification(date);
      this._deathNotificationSent = true;
      //console.log("Gotchi sent to hospital because of low bloodsugar at: " + this._dateString);
      // Schemalägg notif om att gotchin åkte till sjukhus
      this.sendGotchiToHospital();
      //console.log("Task failed successfully");
    }
  }

  /**
   * This method calculates the Delta Time since the starting
   * date in seconds. 
   * @returns void
   */

  public calculateDeltaTime() {
    // difference in time since start-Date in seconds
    let deltaDate = this.dateToSeconds(this._scenarioStartDate); // returns negative sec from startdate
    let secondsFromStart = this.negateValue(deltaDate);
    this._sec = secondsFromStart; // set increment to current date
  }
  
  /**
   * Helper method. 
   * @returns void
   */

  public useTempFactor() {
    this._bloodValue += this._tempFactor;
    this._person.bloodValue = this.bloodValue;
    this._secLeftOnFactor--;

    if (this._secLeftOnFactor <= 0) {
      this._tempFactor = 0;
      this._secLeftOnFactor = 0;
    }
  }


  /**
   * This method is responsible for calculating the entire scope of
   * effects which returns a list of scheduled notifications e.g. With N
   * amount of seconds left until Friday, this method is called N amount of times.
   * @returns void
   */

  public update(): void {
    // updates done every pulse
    if (this._tempFactor == 0) {
      this.decreaseBloodSugar(); // Update Values
    }
    else {
      this.useTempFactor();
    }

    this.resetNotificationFlags();
    this.checkUpperTreshold();
    this.checkLowerThreshold();
    if (this._updateIncrement == 5) {
      this._bloodSugarValues.push(this._bloodValue); // add bloodvalue every 5 sec intervall
      this._updateIncrement = 0;
    }
    if (this._weekplanner.checkDate(this.secondsToDate(this._weektime))) {
      let event = this._weekplanner.eventQueue.getNextEvent();
      if (event) {
        console.log('SCHEDULED: ' + event.toString());
        // Set bloodsugar to new value based on event
        this._notificationController.scheduleNotification(
          event?.description,
          event?.eventType,
          event?.timeStamp,
        );
      }
    }
    this._updateIncrement++;
    this._sec++;
  }

  /**
   * This method is similar to the method below with the added caveat of checking
   * whether we're allowed to process or not.
   * @returns Boolean: whether the process was able to finish or not.
   * If the week-day is Sunday or Saturday we can't run (as per requirements)
   */
  public processWeek(): Boolean {
    // preprocesses entire week of events, returns false if current day is saturday - sunday and true otherwise
    let currentDate = new Date();
    let day = currentDate.getDay();
    if (day == 0 || day == 6) {
      return false;
    } else {
      this._scenarioStartDate = new Date(); // assign current date as startpoint
      this._bloodSugarValues = [];
      this.defineWeekTime(); // find how many seconds scenario should be
      while (this._sec <= this._weektime) {
        // seconds in a week
        this.update(); // process what happens every second
      }
      this._updateIncrement = 0;
      this._storage.bloodSugarValues = this._bloodSugarValues;
      console.log('Bloodsugar at start: ' + this._bloodSugarValues[0]);
      console.log('Entire week processed!');
      console.log('');
      console.log('');
      return true;
    }
    // TODO:
    // implement to reprocess week from current time to end Date - DONE
    // cancel notifications if reprocessing is occured - DONE
    // week should always run to friday for current week, week can be started late! - DONE
    // ask notification scheduler to schedule notifications for entire week - NEED ACCURATE DATA BEFOREHAND
    // make logic to receive the weekplanner - NOT DONE
    // see to so that only active hours have events (from 06:00 in morning to 22:00 at night) - NOT DONE
  }

  /**
   * This method is a wrapper which would be called from the ScenarioController context. Cancels all
   * notifications and performs the processes which we need in order to reschedule all notifications
   * based on the trajectory of the blood-glucose level.
   * @returns void
   */

  public reprocessWeek() {
    this._notificationController.cancelAllNotifications(); // async operation (can possibly cause issue)
    this.calculateDeltaTime(); // calculates the difference in time from start of scenario
    console.log('CURRENT PROCESS DATE: ' + this.secondsToDate(this._sec));
    console.log('SECONDS FROM START-DATE: ' + this._sec);
    this._bloodSugarValues = [];
    while (this._sec <= this._weektime) {
      // seconds in a week
      this.update(); // process what happens every second
    }
    this._updateIncrement = 0;
    this._storage.bloodSugarValues = this._bloodSugarValues;
    console.log('Entire week reprocessed!');
  }

  /**
   * This method is responsible for shifting blood-glucose 
   * change when an event is found during a given time-span
   * 
   * @param eventType type of event which would be triggered
   * during the period of a week
   * 
   * TODO: add all events that can be triggered
   */
  
  public eventBasedFactor(eventType: EventType) {
    switch (eventType) {
      case EventType.FOOD_INTAKE:
        this._tempFactor = 0.5;
        this._secLeftOnFactor = 3600; // Apply factor for 1h
        break;
      case EventType.INSULIN_INJECTION:
        console.log('Insulin injection');
      case EventType.ALCOHOL_INTAKE:
        this._tempFactor = 1.2;
        this._secLeftOnFactor = 4000;
      default:
        break;
    }
  }

  /**
   * Getters, setters.
   */

  get bloodValue(): number {
    return this._bloodValue;
  }
  set bloodValue(value: number) {
    this._bloodValue = value;
  }
  get increaseFactor(): number {
    return this._increaseFactor;
  }
  set increaseFactor(value: number) {
    this._increaseFactor = value;
  }
}
