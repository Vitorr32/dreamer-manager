import { Condition } from "./Condition.model";
import { Scene } from "./Scene.model";

export interface Trigger {
    //Check if the event should activate
    condition: Condition;
    //Get all the actors to participate in the event, the number of conditions determine the number of actors
    queryActorsConditions: Condition[];
}

export interface Flag {
    // Flag Name pattern : Context_Name_#FlagNumber
    id: string;
    name: string;
    //The ID of the event this flag is associated with
    eventID: string;

    // Datetime of the moment this flag was applied on the actor
    appliedTime: Date;

    //Whetever the flag has a time to expire or will never expire/ expire manually by another event
    permanent: boolean;

    //How many minutes after the trigger the flag will last
    hoursToExpire: number | undefined;
}

export class Event {
    public id?: string;
    public eventName?: string;

    public trigger?: Trigger;
    public flags: Flag[] = [];
    //Flag that determine if event has visual scenes or should be an background event that modifies global variables only
    public isVisualNovelEvent: boolean = false;
    //Time in minutes that takes to an event wich trigger is positive to happen, if 0 the event triggers immediately
    public meanTimeToHappen: number = 0;
    public scenes?: Scene;
    public conditions: Condition[] = [];

    constructor() {

    }
}
