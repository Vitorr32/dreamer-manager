import { Attribute } from './Attribute.model';
import { Flag } from './Event.model';
import { Trait } from './Trait.model';

export enum Kinship {
    UNDEFINED,

    PARENT,
    SIBLING,
    CHILD,

    MAX_KINSHIP,
}

export enum Gender {
    UNDEFINED,

    MALE,
    FEMALE,

    MAX_GENDERS,
}

export enum Ethnicity {
    UNDEFINED,

    CAUCASSIAN,
    INDO,
    ASIAN,
    AFRICAN,

    MAX_ETHINICITIES,
}

export enum Status {
    UNDEFINED = 'model.undefined',

    MOOD = 'model.character.status.mood',
    STRESS = 'model.character.status.stress',
    ENERGY = 'model.character.status.energy',
}

export interface KinshipObject {
    character_id: string;
    kinship: Kinship;
}

export class Character {
    //Absolute Basic values of the character, these will never change
    // ID Pattern : CHAR_*NUMBER*
    public id?: string;
    public spritePaths?: string[];
    public name?: string;
    public surname?: string;
    public age?: number;
    public birthday?: Date;
    //Modifiers that affects the relationships of this character, such as previous events or decisions, otherwise use default calculations
    public relationshipsModifiers?: string[];

    //Current state of the character attributes that should be serialized in case of save
    public baseMood: number = 50;
    public baseStress: number = 0;
    public baseEnergy: number = 100;

    public ethnicity: Ethnicity = Ethnicity.UNDEFINED;
    public gender: Gender = Gender.UNDEFINED;
    public family: KinshipObject[] = [];
    public traits: Trait[] = [];
    public flags: Flag[] = [];
    public attributes: Attribute[] = [];
    public spriteNames: string[] = ['default_child', 'default_teen', 'default_adult'];

    constructor() {}
}
