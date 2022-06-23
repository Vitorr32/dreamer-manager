import { ConditionTree } from './ConditionTree';
import { v4 as uuidv4 } from 'uuid';
import { VisualNovel } from './VisualNovel.model';
import { Effect } from './Effect.model';
import { Actor } from './Actor.model';

export interface Trigger {
    //In what circumstances should this event happen.
    condition: ConditionTree;
    //Get all the actors to participate in the event, the number of conditions determine the number of actors
    queryActorsConditions: ConditionTree[];
}

export interface Flag {
    // Flag ID, if not set the default will be event_flag_*random uuiv4 key wihtout asterisks*
    id: string;
    //If not informed, the name will be the ID + Flag index in array
    displayName: string;
    //The ID of the event this flag is associated with
    eventID: string;
    // Date time of the moment this flag was applied on the actor
    appliedTime?: Date | null;
    //Whatever the flag has a time to expire or will never expire / expire manually by another event
    permanent: boolean;
    //How many hours after the applied time this flag will expire, only necessary if the flag is not permanent.
    hoursToExpire?: number | null;
    //Is this flag applied to the world state?
    global: boolean;
}

export class Event {
    public id: string;
    public displayName: string;

    public trigger: Trigger;
    public flags: Flag[] = [];
    //The Event can modify the world immediately by the means of "Effects", or he can have a full Visual Novel which effects happen on specific scenes.
    public visualNovel: VisualNovel | null;
    public effects: Effect[] | null;
    public actors: Actor[] | null;
    //If this event can happens more than one time, if true the event will not enter the "Already triggered events list" in the World state
    public unique: boolean;

    constructor(id: string | undefined = undefined, name: string, trigger: Trigger) {
        this.id = id || 'event_' + uuidv4();
        this.displayName = name;
        this.trigger = trigger;
        this.unique = false;
    }

    public getActor(id: string): Actor | null {
        return this.actors ? this.actors.find((actor) => actor.id === id) : null;
    }

    public modifyActor(actor: Actor): void {
        const index = this.actors.findIndex((iteratedActor) => iteratedActor.id === actor.id);

        if (index === -1) {
            if (this.actors) {
                this.actors.push(actor);
            } else {
                this.actors = [actor];
            }
        } else {
            this.actors[index] = actor;
        }
    }
}
