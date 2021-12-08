import { Effect } from './Effect.model';
import { v4 as uuidv4 } from 'uuid';

export enum TraitType {
    UNDEFINED = 'model.undefined',

    NORMAL = 'model.trait.type.normal',
    PHYSICAL = 'model.trait.type.physical',
    MENTAL = 'model.trait.type.mental',
    PERSONALITY = 'model.trait.type.personality',
    DEVELOPMENT = 'model.trait.type.development',
    NATIONAL = 'model.trait.type.national',
    SPECIAL = 'model.trait.type.special',
}

export class Trait {
    public id: string;
    public name: string;
    public type: TraitType;
    public description: string;
    public spawnable: boolean;
    public effects: Effect[];
    public spritePath: string[];

    constructor() {
        this.id = 'trait_' + uuidv4();
        this.name = '';
        this.type = TraitType.UNDEFINED;
        this.description = '';
        this.spritePath = [];
        this.spawnable = false;
        this.effects = [new Effect()];
    }
}
