import { Attribute } from './Attribute.model';
import { Flag } from './Event.model';
import { Trait } from './Trait.model';
import { v4 as uuidv4 } from 'uuid';
import { Variable, VariableType } from './Variable.model';

export enum Kinship {
    UNDEFINED,

    PARENT,
    SIBLING,
    CHILD,

    MAX_KINSHIP,
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum Ethnicity {
    CAUCASIAN = 'caucasian',
    INDIAN = 'indian',
    ASIAN = 'asian',
    AFRICAN = 'african',
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

export interface Sprite {
    path: string[];
}

export const CharacterEntityVariables: Variable = {
    id: { type: VariableType.TEXT, read: true, edit: false },
    name: { type: VariableType.TEXT, read: true, edit: true },
    surname: { type: VariableType.TEXT, read: true, edit: true },
    nickname: { type: VariableType.TEXT, read: true, edit: true },
    birthday: { type: VariableType.DATE, read: true, edit: true },
    age: { type: VariableType.NUMBER, read: true, edit: true },
    ethnicity: { type: VariableType.ENUMERATOR, options: Object.values(Ethnicity).map((value) => value), read: true, edit: true },
    gender: { type: VariableType.ENUMERATOR, options: Object.values(Gender).map((value) => value), read: true, edit: true },
    // age: { type: EntityVariable.NUMBER, read: true, edit: true },
    // age: { type: EntityVariable.NUMBER, read: true, edit: true },
    // age: { type: EntityVariable.NUMBER, read: true, edit: true },
    // age: { type: EntityVariable.NUMBER, read: true, edit: true },
    // birth
};

export class Character {
    static _Variables: { [key: string]: { type: VariableType; options?: string[]; read: boolean; edit: boolean } } = CharacterEntityVariables;
    //Absolute Basic values of the character, these will never change
    // ID Pattern : CHAR_*NUMBER*
    public id: string;
    public sprites: Sprite[];
    public name: string;
    public surname: string;
    public nickname: string;
    public age: number;
    public birthday: Date;
    //Modifiers that affects the relationships of this character, such as previous events or decisions, otherwise use default calculations
    public relationshipsModifiers?: string[];

    //Current state of the character attributes that should be serialized in case of save
    public baseMood: number = 50;
    public baseStress: number = 0;
    public baseEnergy: number = 100;

    public ethnicity: Ethnicity = Ethnicity.CAUCASIAN;
    public gender: Gender = Gender.FEMALE;
    public family: KinshipObject[] = [];
    public traits: Trait[] = [];
    public flags: Flag[] = [];

    constructor(id?: string, sprites?: Sprite[], name?: string, surname?: string, nickname?: string, birthday?: Date) {
        this.id = id || `char_${uuidv4()}`;
        this.sprites = sprites || [];
        this.name = name || '';
        this.surname = surname || '';
        this.nickname = nickname || '';
        this.birthday = birthday;
    }
}
