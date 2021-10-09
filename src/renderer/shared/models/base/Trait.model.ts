import { Effect } from './Effect.model';
import { v4 as uuidv4 } from 'uuid';

export enum TraitType {
    UNDEFINED = 'Undefined',

    NORMAL = 'Normal',
    PHYSICAL = 'Physical',
    MENTAL = 'Mental',
    PERSONALITY = 'Personality',
    DEVELOPMENT = 'Development',
    NATIONAL = 'National',
    SPECIAL = 'Special',
}
export class Trait {
    public id: string;
    public name: string;
    public type: TraitType;
    public description: string;
    public effects: Effect[] = [];
    public spritePath: string[];

    constructor(name: string, type: TraitType, description: string, sprite: string[]) {
        this.id = 'trait_' + uuidv4();
        this.name = name;
        this.type = type;
        this.description = description;
        this.spritePath = sprite;
    }
}
