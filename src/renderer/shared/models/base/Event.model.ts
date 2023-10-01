import { v4 as uuidv4 } from 'uuid';
import { VisualNovel } from './VisualNovel.model';
import { Effect } from './Effect.model';
import { Actor } from './Actor.model';
import { Flag } from '../interfaces/Flag.interface';
import { Trigger } from '../enums/Trigger.enum';

export class Event {
    public id: string;

    public displayName: string;

    public trigger: Trigger;

    public flags: Flag[] = [];

    // The Event can modify the world immediately by the means of "Effects", or he can have a full Visual Novel which effects happen on specific scenes.
    public visualNovel: VisualNovel | null;

    public effects: Effect[] | null;

    public actors: Actor[] | null;

    // If this event can happens more than one time, if true the event will not enter the "Already triggered events list" in the World state
    public unique: boolean;

    constructor(id: string | undefined = undefined, name: string, trigger: Trigger) {
        this.id = id || `event_${uuidv4()}`;
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
