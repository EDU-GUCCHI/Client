//subject
export class Clock
{
    private sec: number
    interval: NodeJS.Timeout | null;
    observers: never[];
    public constructor()
    {
        this.sec = 0;
        this.observers = [];
        this.interval = null;
    }
    public tickClock(): void 
    {
        this.sec++;
        console.log(`Clock Pulse second: ${this.sec}`);
        this.notifyObservers(); //push update event to update bloodvalue
    }
    public startClock(): void
    {
        if(this.interval === null)
        {
            this.interval = setInterval(this.tickClock.bind(this), 1000);
        }
    }
    public stopClock(): void
    {
        if(this.interval !== null)
        {
            console.log("pulse stopped!");
            clearInterval(this.interval)
            this.interval = null;
            this.removeAllObservers();
        }
    }
    public addObserver(observer): void 
    {
        this.observers.push(observer);
    }
    public removeObserver(observer): void
    {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    removeAllObservers() 
    {
        this.observers = [];
    }
    public notifyObservers(): void
    {
        this.observers.forEach(observer => observer.update());
    }
}