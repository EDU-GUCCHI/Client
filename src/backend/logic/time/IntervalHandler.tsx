import { Gotchi } from "../../data/gotchi/Gotchi";
import { EventDispatcher } from "../event/EventDispatcher";
import { Clock } from "./Clock";
import { GUIController } from "../controllers/GUIController";
import { NotificationDispatcher } from "../controllers/NotificationDispatcher";
import { Storage } from "../../data/Storage";
import { WeekPlanner } from "../WeekPlanner";
import { NotificationScheduler } from "../controllers/notificationScheduler";

export class IntervallHandler
{
    private _bloodValue: number;
    private _increaseFactor: number;
    private _decreaseFactor: number;
    private _sec: number;
    private _person: Gotchi;
    private _GUIController: GUIController;
    private _notificationDispatcher: NotificationDispatcher;
    private _eventDispatcher: EventDispatcher;
    private _scenarioStartDate: number;
    private _dateString: string;

    private _warningNotificationSent: Boolean;
    private _criticalWarningSent: Boolean;
    private _deathNotificationSent: Boolean;
    private _storage: Storage;
    private _weekplanner: WeekPlanner;

    public constructor(storage: Storage, person: Gotchi, GUIController: GUIController, notificationDispatcher: NotificationDispatcher, eventDispatcher: EventDispatcher, weekplanner: WeekPlanner)
    {
        this._person = person;
        this._storage = storage;
        this._sec = 0;
        this._dateString = "";
        this._scenarioStartDate = Date.now();
        this._bloodValue = person.bloodValue;
        this._GUIController = GUIController;
        this._increaseFactor = 0;
        this._decreaseFactor = 0;
        this._notificationDispatcher = notificationDispatcher;
        this._eventDispatcher = eventDispatcher;
        this._weekplanner = weekplanner;

        this._warningNotificationSent = false;
        this._criticalWarningSent = false;
        this._deathNotificationSent = false;
        this.updateFactors();
    }

    public sendGotchiToHospital()
    {
        this._sec += 7200;
        this._bloodValue = 5;
        this._person.bloodValue = this.bloodValue;
        let date = this.secondsToDate(this._sec);
        //NotificationScheduler.scheduleNotification(date);
        console.log("Your gotchi was treated at the hospital and is now fine.");
        console.log("Your gotchi got home at: " + this._dateString);
    }
    public formatDigitalClock(date: Date): string {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`;
      }
    public secondsToDate(seconds: number): Date 
    {
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
    public updateFactors()
    {
        this.increaseFactor = this._storage.increaseFactor;
        this._decreaseFactor = this._storage.decreaseFactor;
    }
    public decreaseBloodSugar() // TODO: send to event dispatcher to dispatch relevant events based on bloodusgar level
    {
        this._bloodValue -= this._decreaseFactor;
        this._person.bloodValue = this._bloodValue;
        //console.log("Bloodsugar: " + this._bloodValue);
    }
    public increaseBloodSugar()
    {
        this._bloodValue += this._increaseFactor;
        this._person.bloodValue = this.bloodValue;
    }
    public negateValue() // flip value to be negative / positive
    {
        this._bloodValue = (this._bloodValue * -1);
        this._person.bloodValue = this._bloodValue;
    }
    public resetNotificationFlags()
    {
        if(this._bloodValue >= 4 && this._bloodValue <= 8)
        {
            this._warningNotificationSent = false;
        }
        if(this._bloodValue >= 2 && this._bloodValue <= 10)
        {
            this._criticalWarningSent = false;
        }
        if(this._bloodValue >= 1 && this._bloodValue <= 12)
        {
            this._deathNotificationSent = false;
        }
    }
    public checkUpperTreshold()
    {
        let date;
        if(this._bloodValue > 8 && !this._warningNotificationSent)
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Högt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            console.log("warning sent for high bloodsugar! at: " + this._dateString);
            this._warningNotificationSent = true;
        }
        else if(this._bloodValue > 10 && !this._criticalWarningSent)
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Kritiskt högt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            console.log("critical warning sent for high bloodsugar! at: " + this._dateString);
            this._warningNotificationSent = true;
        }
        else if(this._bloodValue > 12 && !this._deathNotificationSent)
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._deathNotificationSent = true;
            console.log("Gotchi is sent to hospital because of high bloodsugar at: " + this._dateString);
            this.sendGotchiToHospital();
            // send gotchi to hospital
        }
    }
    public checkLowerThreshold()
    {
        let date;
        if(this._bloodValue < 4 && !this._warningNotificationSent) // check if to send notificationwarning
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Lågt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._eventDispatcher.LowBloodSugar();
            this._warningNotificationSent = true;
            console.log("warning of low bloodsugar sent at: " + this._dateString);
            //console.log("Blood sugar warning sent")
        }
        else if(this._bloodValue < 2 && !this._criticalWarningSent) 
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Kritiskt lågt blodsocker");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._eventDispatcher.LowBloodSugar();
            this._criticalWarningSent = true;
            console.log("warning of critically low bloodsugar sent at: " + this._dateString);
            //console.log("Critical Blood sugar warning sent")
        }
        else if(this._bloodValue < 1 && !this._deathNotificationSent)
        {
            //this._notificationDispatcher.SendBloodSugarWarning("Du lyckades inte ta hand om din Gotchi");
            date = this.secondsToDate(this._sec);
            //NotificationScheduler.scheduleNotification(date);
            this._deathNotificationSent = true;
            console.log("gotchi sent to hospital because of low bloodsugar at: " + this._dateString);
            this.sendGotchiToHospital();
            //console.log("Task failed successfully");
            // send gotchi to hospital
        }
    }
    public update(): void // updates done every pulse
    {
        this.decreaseBloodSugar(); // Update Values
        //this._GUIController.setBloodSugar(this._bloodValue); // update GUI element
        this.resetNotificationFlags();
        this.checkUpperTreshold();
        this.checkLowerThreshold();
        //Jämför datum i array av schemalagda events i weekplanner, om lika eller senare, pop och skapa event?
        this._weekplanner.checkDate();
        this._sec++;
    }
    public processWeek()
    {
        while(this._sec <= 432000) // seconds in a week
        {
            this.update(); // process what happens every second
        }
        console.log("entire week processed!");
        // increment entire week. (make sure death state doest just stop interval)
        // format seconds to proper timestamp
        // save timestamps
        // ask notification scheduler to schedule notifications for entire week
        // print out notification statements
    }
    
    get bloodValue(): number 
    {
        return this._bloodValue;
    }
    set bloodValue(value: number) 
    {
        this._bloodValue = value;
    }
    get increaseFactor(): number 
    {
        return this._increaseFactor;
    }
    set increaseFactor(value: number) 
    {
        this._increaseFactor = value;
    }
}