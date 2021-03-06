import { Attribute } from './Attribute.model';
import { Flag } from './Event.model';
import { Trait } from './Trait.model';
import { v4 as uuidv4 } from 'uuid';
import { CustomVariables, Variables, VariableType } from './Variable.model';
import { Kinship } from './Kinship.model';
import { Entity } from '../enums/Entities.enum';
import { EntityBase } from './Entity.model';

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

export interface Sprite {
    path: string[];
}

export const CharacterEntityVariables: Variables = {
    id: { key: 'id', displayName: 'model.character.variables.id', type: VariableType.TEXT, read: true, edit: false },
    name: { key: 'name', displayName: 'model.character.variables.name', type: VariableType.TEXT, read: true, edit: true },
    surname: { key: 'surname', displayName: 'model.character.variables.surname', type: VariableType.TEXT, read: true, edit: true },
    nickname: { key: 'nickname', displayName: 'model.character.variables.nickname', type: VariableType.TEXT, read: true, edit: true },
    birthday: { key: 'birthday', displayName: 'model.character.variables.birthday', type: VariableType.DATE, read: true, edit: true },
    age: { key: 'age', displayName: 'model.character.variables.age', type: VariableType.NUMBER, read: true, edit: true },
    ethnicity: {
        key: 'ethnicity',
        displayName: 'model.character.variables.ethnicity',
        type: VariableType.ENUMERATOR,
        options: Object.values(Ethnicity).map((value) => value),
        read: true,
        edit: false,
    },
    gender: {
        key: 'gender',
        displayName: 'model.character.variables.gender',
        type: VariableType.ENUMERATOR,
        options: Object.values(Gender).map((value) => value),
        read: true,
        edit: true,
    },
    flags: {
        key: 'flags',
        displayName: 'model.character.variables.flags',
        type: VariableType.EXTERNAL_KEY_LIST,
        externalEntity: Entity.FLAGS,
        read: true,
        edit: true,
    },
    agency: {
        key: 'agency',
        displayName: 'model.character.variables.agency',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.AGENCY,
        read: true,
        edit: true,
    },
    isPlayer: { key: 'isPlayer', displayName: 'model.character.variables.isPlayer', type: VariableType.BOOLEAN, read: true, edit: false },
    isStaff: { key: 'isStaff', displayName: 'model.character.variables.isPlayer', type: VariableType.BOOLEAN, read: true, edit: true },
};

export class Character extends EntityBase {
    static get _variables() {
        return CharacterEntityVariables;
    }
    // ID Pattern : CHAR_*NUMBER*
    public id: string;
    public sprites: Sprite[];
    public name: string;
    public surname: string;
    public nickname: string;
    public age: number;
    public birthday: Date;

    public isPlayer: boolean;
    public isStaff: boolean;
    //The character may be unemployed
    public agency?: string;

    //Current state of the character attributes that should be serialized in case of save
    public baseMood: number = 50;
    public baseStress: number = 0;
    public baseEnergy: number = 100;

    public ethnicity: Ethnicity = Ethnicity.CAUCASIAN;
    public gender: Gender = Gender.FEMALE;
    public family: Kinship[] = [];
    public traits: Trait[] = [];
    public flags: Flag[] = [];
    public relationshipsModifiers: string[] = [];

    constructor(id?: string, sprites?: Sprite[], name?: string, surname?: string, nickname?: string, birthday?: Date) {
        super();

        this.id = id || `char_${uuidv4()}`;
        this.sprites = sprites || [];
        this.name = name || '';
        this.surname = surname || '';
        this.nickname = nickname || '';
        this.birthday = birthday;
    }
}
