//subject
export class Clock
{
    private sec: number
    public constructor()
    {
        this.sec = 0;
        this.startClock = this.startClock.bind(this); // Bind the method to the current instance
        this.interval = setInterval(this.startClock, 1000);
        this.observers = [];
    }
    public startClock(): void
    {
        this.sec++;
        console.log(`Updated value: ${this.sec}`);
        this.notifyObservers(); //push update event to update bloodvalue
    }
    public stopClock(): void
    {
        console.log("pulse stopped!");
        clearInterval(this.interval)
        this.removeAllObservers();
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