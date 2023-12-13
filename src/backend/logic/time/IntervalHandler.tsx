import { Gotchi } from "../../data/gotchi/Gotchi";
import { EventDispatcher } from "../event/EventDispatcher";
import { GUIController } from "../controllers/GUIController";
import { NotificationDispatcher } from "../controllers/NotificationDispatcher";
import { Storage } from "../../data/Storage";
import { WeekPlanner } from "../WeekPlanner";
import { NotificationScheduler } from "../controllers/notificationScheduler";

export class IntervallHandler {
    private _bloodValue: number;
    private _increaseFactor: number;
    private _decreaseFactor: number;
    private _weektime: number;
    private _sec: number;
    private _person: Gotchi;
    private _GUIController: GUIController;
    private _notificationDispatcher: NotificationDispatcher;
    private _eventDispatcher: EventDispatcher;
    private _scenarioStartDate: Date;
    private _dateString: string;
    private _warningNotificationSent: Boolean;
    private _criticalWarningSent: Boolean;
    private _deathNotificationSent: Boolean;
    private _storage: Storage;
    private _weekplanner: WeekPlanner;

    public constructor(storage: Storage, person: Gotchi, GUIController: GUIController, notificationDispatcher: NotificationDispatcher, eventDispatcher: EventDispatcher, weekplanner: WeekPlanner) {
        this._person = person;
        this._storage = storage;
        this._sec = 0;
        this._dateString = "";
        this._scenarioStartDate = new Date();
        this._bloodValue = person.bloodValue;
        this._GUIController = GUIController;
        this._increaseFactor = 0;
        this._decreaseFactor = 0;
        this._weektime = 432000; // default value of 5 days in seconds
        this._notificationDispatcher = notificationDispatcher;
        this._eventDispatcher = eventDispatcher;
        this._weekplanner = weekplanner;
        this._warningNotificationSent = false;
        this._criticalWarningSent = false;
        this._deathNotificationSent = false;
        this.updateFactors();
    }

    public defineWeekTime() { // seconds from current time to friday (midnight)
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const daysUntilFriday = (5 - currentDay + 7) % 7;
        const fridayDate = new Date(currentDate);
        fridayDate.setDate(currentDate.getDate() + daysUntilFriday);
        fridayDate.setHours(23, 55, 0, 0);
        const timeDifferenceInSeconds = Math.floor((fridayDate.getTime() - currentDate.getTime()) / 1000);
        console.log(`Seconds until Friday 23:55: ${timeDifferenceInSeconds}`);
        this._weektime = timeDifferenceInSeconds;
    }
    public sendGotchiToHospital() {
        this._sec += 7200; // Gotchi at hospital for 2 hours
        this._bloodValue = 5; // reset bloodlevels
        this._person.bloodValue = this.bloodValue;
        let date = this.secondsToDate(this._sec);

        //Schemalägg när gotchin kommer ut ur sjukan
        //NotificationScheduler.scheduleNotification(date + 2 timmar);
        console.log("Your gotchi was treated at the hospital and is now fine.");
        console.log("Your gotchi got home at: " + this._dateString);
    }
    public formatDigitalClock(date: Date): string {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`;
    }
    public secondsToDate(seconds: number): Date {
        const milliseconds = seconds * 1000; // Convert seconds to milliseconds
        const currentDate = new Date();
        const date = new Date(currentDate.getTime() + milliseconds); // Create a new Date object using milliseconds
        const year: number = date.getFullYear();
        const month: number = date.getMonth() + 1; // Months are zero-based (0-11), so adding 1
        const day: number = date.getDate();
        const formattedTime = this.formatDigitalClock(date);
        this._dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${formattedTime}`;
        return date;
    }
    public dateToSeconds(date: Date): number {
        const currentDate = new Date();
        const milliseconds = date.getTime() - currentDate.getTime(); // Get the difference in milliseconds
        const seconds = milliseconds / 1000; // Convert milliseconds to seconds
        return seconds;
    }
    public updateFactors() {
        this.increaseFactor = this._storage.increaseFactor;
        this._decreaseFactor = this._storage.decreaseFactor;
    }

    // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    public decreaseBloodSugar() {
        this._bloodValue -= this._decreaseFactor;
        this._person.bloodValue = this._bloodValue;
        //console.log("Bloodsugar: " + this._bloodValue);
    }
    public increaseBloodSugar() {
        this._bloodValue += this._increaseFactor;
        this._person.bloodValue = this.bloodValue;
    }
    public negateValue(num: number): number { // flip value to be negative / positive
        return (num * -1);
    }
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
    public checkUpperTreshold() {
        let date;
        if (this._bloodValue > 8 && !this._warningNotificationSent) {
            //this._notificationDispatcher.SendBloodSugarWarning("Högt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            console.log("warning sent for high bloodsugar! at: " + this._dateString);
            this._warningNotificationSent = true;
        }
        else if (this._bloodValue > 10 && !this._criticalWarningSent) {
            //this._notificationDispatcher.SendBloodSugarWarning("Kritiskt högt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            console.log("critical warning sent for high bloodsugar! at: " + this._dateString);
            this._warningNotificationSent = true;
        }
        else if (this._bloodValue > 12 && !this._deathNotificationSent) {
            //this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._deathNotificationSent = true;
            console.log("Gotchi is sent to hospital because of high bloodsugar at: " + this._dateString);
            this.sendGotchiToHospital();
        }
    }
    public checkLowerThreshold() {
        let date;
        if (this._bloodValue < 4 && !this._warningNotificationSent) // check if to send notificationwarning
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Lågt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._eventDispatcher.LowBloodSugar();
            this._warningNotificationSent = true;
            console.log("warning of low bloodsugar sent at: " + this._dateString);
            //console.log("Blood sugar warning sent")
        }
        else if (this._bloodValue < 2 && !this._criticalWarningSent) {
            //this._notificationDispatcher.SendBloodSugarWarning("Kritiskt lågt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._eventDispatcher.LowBloodSugar();
            this._criticalWarningSent = true;
            console.log("warning of critically low bloodsugar sent at: " + this._dateString);
            //console.log("Critical Blood sugar warning sent")
        }
        else if (this._bloodValue < 1 && !this._deathNotificationSent) {
            //this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._deathNotificationSent = true;
            console.log("gotchi sent to hospital because of low bloodsugar at: " + this._dateString);
            // Schemalägg notif om att gotchin åkte till sjukhus
            this.sendGotchiToHospital();
            //console.log("Task failed successfully");
        }
    }
    public calculateDeltaTime() { // difference in time since start-Date in seconds
        let deltaDate = this.dateToSeconds(this._scenarioStartDate); // returns negative sec from startdate
        let secondsFromStart = this.negateValue(deltaDate);
        this._sec = secondsFromStart; // set increment to current date
    }
    public update(): void { // updates done every pulse
        this.decreaseBloodSugar(); // Update Values
        //this._GUIController.setBloodSugar(this._bloodValue); // update GUI element
        this.resetNotificationFlags();
        this.checkUpperTreshold();
        this.checkLowerThreshold();
        this._weekplanner.checkDate(); // Jämför datum i array av schemalagda events i weekplanner, om lika eller senare, pop och skapa event?
        this._sec++;
    }
    public processWeek(): Boolean {
        let currentDate = new Date();
        let day = currentDate.getDay();
        if (day == 6 || day == 7) {
            return false;
        }
        else {
            this._scenarioStartDate = new Date(); // assign current date as startpoint
            this.defineWeekTime(); // find how many seconds scenario should be
            while (this._sec <= this._weektime) { // seconds in a week
                this.update(); // process what happens every second
            }
            console.log("Entire week processed!");
            console.log("");
            console.log("");
            return true;
        }
        // TODO: 
        // implement to reprocess week from current time to end Date - DONE
        // cancel notifications if reprocessing is occured - DONE
        // week should always run to friday for current week, week can be started late! - DONE
        // ask notification scheduler to schedule notifications for entire week - NEED ACCURATE DATA BEFOREHAND
        // see to so that only active hours have events (from 06:00 in morning to 22:00 at night)
    }
    public reprocessWeek() {
        NotificationScheduler.cancelAllNotifications(); // async operation (can maybe cause issue)
        this.calculateDeltaTime(); // calculates the difference in time from start of scenario
        console.log("CURRENT PROCESS DATE: " + this.secondsToDate(this._sec));
        console.log("SECONDS FROM START-DATE: " + this._sec);
        while (this._sec <= this._weektime) { // seconds in a week
            this.update(); // process what happens every second
        }
        console.log("Entire week reprocessed!");
    }

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