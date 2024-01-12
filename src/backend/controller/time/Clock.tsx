/**
 * @deprecated
 * This class was used to tick for time when we developed a real-time
 * application.
 */
export class Clock {
    interval: NodeJS.Timeout | null;
    private _observers: any[] = [];

    public constructor() {
        this._observers = [];
        this.interval = null;
    }

    public tickClock(): void {
        this.notifyObservers();
    }
    public startClock(): void {
        if (this.interval === null) {
            this.interval = setInterval(this.tickClock.bind(this), 5000);
        }
    }
    public stopClock(): void {
        if (this.interval !== null) {
            console.log("interval pulse stopped!");
            clearInterval(this.interval);
            this.interval = null;
            this.removeAllObservers();
        }
    }
    addObserver(observer: any): void {
        this._observers.push(observer);
    }
    removeObserver(observer: any): void {
        this._observers = this._observers.filter((obs) => obs !== observer);
    }
    removeAllObservers() {
        this._observers = [];
    }
    private notifyObservers(): void {
        this._observers.forEach((observer) => observer.setBloodSugar());
    }
    get observers(): any[] {
        return this._observers;
    }
}