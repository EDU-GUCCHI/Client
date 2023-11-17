export class Clock
{
    interval: NodeJS.Timeout | null;
    private _observers: any[] = [];
    
    public constructor()
    {
        this._observers = [];
        this.interval = null;
    }
    
    public tickClock(): void 
    {
        this.notifyObservers(); //push update event to update bloodvalue
    }
    public startClock(): void
    {
        if (this.interval === null) 
        {
            this.interval = setInterval(this.tickClock.bind(this), 1000);
        }
    }
    public stopClock(): void
    {
        if (this.interval !== null) 
        {
            console.log("interval pulse stopped!");
            clearInterval(this.interval);
            this.interval = null;
            this.removeAllObservers();
        }
    }
    addObserver(observer: any): void 
    {
        this._observers.push(observer);
    }
    removeObserver(observer: any): void 
    {
        this._observers = this._observers.filter((obs) => obs !== observer);
    }
    removeAllObservers() 
    {
        this._observers = [];
    }
    private notifyObservers(): void 
    {
        this._observers.forEach((observer) => observer.update());
    }

    get observers(): any[] 
    {
        return this._observers;
    }
}