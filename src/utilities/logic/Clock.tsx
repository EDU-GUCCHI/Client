export class Clock
{
    private sec: number

    public constructor()
    {
        this.sec = 0;
        this.startClock = this.startClock.bind(this); // Bind the method to the current instance
        this.interval = setInterval(this.startClock, 1000);
    }

    public startClock(): void
    {
        this.sec++;
        console.log(`Updated value: ${this.sec}`);
        //push update event
    }
}