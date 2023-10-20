class TimeHandler
{

    constructor()
    {}

    public getTime(): number 
    {
        return new Date().getTime();
    }

    public getDay(): number
    {
        // Calculate milliseconds in a year
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;
        // Divide Time with a year
        const d = new Date();
        let days = Math.round(d.getTime() / day);

        return days;
    }

    public getDaysLeft()
    {
        //days left on current session
    }
}