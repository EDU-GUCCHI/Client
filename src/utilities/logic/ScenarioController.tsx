import {Gotchi} from '../data/Gotchi';

export class ScenarioController
{
    private gotchi: Gotchi;
    
    constructor()
    {
        this.gotchi = new Gotchi(); // use randomGenerator here!
    }
    //controlls entire flow of app logic (has access to all data modules)
}