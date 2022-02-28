import { ConditionTree } from './ConditionTree';
import { v4 as uuidv4 } from 'uuid';
import { VisualNovel } from './VisualNovel.model';

export interface Trigger {
    //In what circumstances should this event happen.
    condition: ConditionTree;
    //Get all the actors to participate in the event, the number of conditions determine the number of actors
    queryActorsConditions: ConditionTree[];
}

export interface Flag {
    // Flag ID, if not set the default will be event
    id: string;
    //If not informed, the name will be the ID + Flag index in array
    displayName: string;
    //The ID of the event this flag is associated with
    eventID: string;
    // Date time of the moment this flag was applied on the actor
    appliedTime: Date;
    //Whatever the flag has a time to expire or will never expire / expire manually by another event
    permanent: boolean;
    //How many hours after the applied time this flag will expire, only necessary if the flag is not permanent.
    hoursToExpire: number | undefined;
    //Is this flag applied to the world state?
    global: boolean;
}

export enum ActorType {
    GENERIC_TYPE,
    DYNAMIC_TYPE,
    SPECIFIC_TYPE,
}

export interface Actor {
    //If this event actors are pooled on the moment that the event happens.
    actorType: ActorType;
    // Generic sprite path
    spriteFileName?: string;
    //If the actor is a specific character, just put the id here.
    characterID?: string;
    //Condition to be checked to select the actor in case of dynamic casting
    actorCastingCondition?: ConditionTree;
    // Actor object ID
    id: string;
    // Actor alias that the user may change to better edit the event, or if the actor is generic, the name that will appear on the dialogue screen.
    alias?: string;
}

export class Event {
    public id: string;
    public displayName: string;

    public trigger: Trigger;
    public flags: Flag[] = [];
    public visualNovel: VisualNovel | null;
    public actors: Actor[] | null = null;
    //If this event can happens more than one time, if true the event will not enter the "Already triggered events list" in the World state
    public unique: boolean;

    constructor(id: string | undefined = undefined, name: string, trigger: Trigger) {
        this.id = id || 'event_' + uuidv4();
        this.displayName = name;
        this.trigger = trigger;
        this.unique = false;
    }
}
