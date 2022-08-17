import { Trait } from './Trait.model';
import { v4 as uuidv4 } from 'uuid';
import { Variables, VariableType } from './Variable.model';
import { Entity } from '../enums/Entities.enum';
import { EntityBase } from './Entity.model';
import { PaperDoll } from './Parperdoll.model';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum Affluency {
    DESTITUTE = 'model.character.affluency.destitute',
    VERY_POOR = 'model.character.affluency.very_poor',
    POOR = 'model.character.affluency.poor',
    MIDDLE_CLASS = 'model.character.affluency.middle_class',
    UPPER_MIDDLE_CLASS = 'model.character.affluency.upper_middle_class',
    RICH = 'model.character.affluency.rich',
    PROSPEROUS = 'model.character.affluency.prosperous',
    LUXURIOUS = 'model.character.affluency.luxurious',
    NOBILITY = 'model.character.affluency.nobility',
}

export enum CharacterType {
    STAFF = 'model.character.type.staff',
    ACTIVE_DREAMER = 'model.character.type.active_dreamer',
    RETIRED_DREAMER = 'model.character.type.retired_dreamer',
}

export enum FamilySituation {
    SUPPORTIVE = 'model.character.family.supportive',
    STABLE = 'model.character.family.stable',
    UNSTABLE = 'model.character.family.unstable',
    ORPHAN = 'model.character.family.orphan',
    WAR_ORPHAN = 'model.character.family.war_orphan',
    WIDOWER = 'model.character.family.widower',
    WIDOW = 'model.character.family.widow',
    WAR_WIDOW = 'model.character.family.war_widow',
    DIVORCED = 'model.character.family.divorced',
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

export enum Style {
    CLASSIC,
    NEW_WAVE,
    PUNK,
    GOTHIC,
}

export enum CharacterVariablesKey {
    ID = 'id',
    NAME = 'name',
    SURNAME = 'surname',
    NICKNAME = 'nickname',
    BIRTHDAY = 'birthday',
    AGE = 'age',
    ETHNICITY = 'ethnicity',
    GENDER = 'gender',
    FLAGS = 'flags',
    AGENCY = 'agency',
    IS_PLAYER = 'isPlayer',
    TYPE = 'type',
    ACTIVE = 'isActive',
    NATIONALITY = 'nationality',
    HOMETOWN = 'hometown',
    RESIDENCE_LOCATION = 'residenceLocation',
    AFFLUENCY = 'standardOfLiving',
    FAMILY_SITUATION = 'familySituation',
    TRAITS = 'traits',
}

export const CharacterEntityVariables: Variables = {
    id: { key: CharacterVariablesKey.ID, displayName: 'model.character.variables.id', type: VariableType.TEXT, read: true, edit: false },
    name: { key: CharacterVariablesKey.NAME, displayName: 'model.character.variables.name', type: VariableType.TEXT, read: true, edit: true },
    surname: { key: CharacterVariablesKey.SURNAME, displayName: 'model.character.variables.surname', type: VariableType.TEXT, read: true, edit: true },
    nickname: { key: CharacterVariablesKey.NICKNAME, displayName: 'model.character.variables.nickname', type: VariableType.TEXT, read: true, edit: true },
    birthday: { key: CharacterVariablesKey.BIRTHDAY, displayName: 'model.character.variables.birthday', type: VariableType.DATE, read: true, edit: true },
    age: { key: CharacterVariablesKey.AGE, displayName: 'model.character.variables.age', type: VariableType.NUMBER, read: true, edit: true },
    ethnicity: {
        key: CharacterVariablesKey.ETHNICITY,
        displayName: 'model.character.variables.ethnicity',
        type: VariableType.ENUMERATOR,
        options: Object.values(Ethnicity).map((value) => value),
        read: true,
        edit: false,
    },
    gender: {
        key: CharacterVariablesKey.GENDER,
        displayName: 'model.character.variables.gender',
        type: VariableType.ENUMERATOR,
        options: Object.values(Gender).map((value) => value),
        read: true,
        edit: true,
    },
    flags: {
        key: CharacterVariablesKey.FLAGS,
        displayName: 'model.character.variables.flags',
        type: VariableType.EXTERNAL_KEY_LIST,
        externalEntity: Entity.FLAGS,
        read: true,
        edit: true,
    },
    agency: {
        key: CharacterVariablesKey.AGENCY,
        displayName: 'model.character.variables.agency',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.AGENCY,
        read: true,
        edit: true,
    },
    nationality: {
        key: CharacterVariablesKey.NATIONALITY,
        displayName: 'model.character.variables.nationality',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.NATIONS,
        read: true,
        edit: false,
    },
    hometown: {
        key: CharacterVariablesKey.HOMETOWN,
        displayName: 'model.character.variables.hometown',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.CITIES,
        read: true,
        edit: false,
    },
    residenceLocation: {
        key: CharacterVariablesKey.RESIDENCE_LOCATION,
        displayName: 'model.character.variables.residence_location',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.CITIES,
        read: true,
        edit: true,
    },
    affluency: {
        key: CharacterVariablesKey.AFFLUENCY,
        displayName: 'model.character.variables.affluency',
        type: VariableType.ENUMERATOR,
        options: Object.values(Affluency).map((value) => value),
        read: true,
        edit: true,
    },
    type: {
        key: CharacterVariablesKey.TYPE,
        displayName: 'model.character.variables.type',
        type: VariableType.ENUMERATOR,
        options: Object.values(CharacterType).map((value) => value),
        read: true,
        edit: true,
    },
    family: {
        key: CharacterVariablesKey.FAMILY_SITUATION,
        displayName: 'model.character.variables.family',
        type: VariableType.ENUMERATOR,
        options: Object.values(FamilySituation).map((value) => value),
        read: true,
        edit: true,
    },
    isPlayer: { key: CharacterVariablesKey.IS_PLAYER, displayName: 'model.character.variables.isPlayer', type: VariableType.BOOLEAN, read: true, edit: false },
    isActive: { key: CharacterVariablesKey.ACTIVE, displayName: 'model.character.variables.isActive', type: VariableType.BOOLEAN, read: true, edit: true },
    traits: {
        key: CharacterVariablesKey.TRAITS,
        displayName: 'model.character.variables.nationality',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.TRAITS,
        read: true,
        edit: false,
    },
};

export class Character extends EntityBase {
    static get _variables() {
        return CharacterEntityVariables;
    }
    // ID Pattern : CHAR_*NUMBER*
    public id: string;
    public name: string;
    public surname: string;
    public nickname: string;
    public age: number;
    public birthday: Date;
    public paperDoll: PaperDoll;
    // If this character is available if they have the correct age, otherwise they will only appear after a event effect.
    public isActive: boolean;
    // The id of the Nation that this character has citizenship.
    public nationality: string;
    // The id of City where this character was born and raised.
    public hometown: string;
    // The id of the the City where the character currently lives in
    public residenceLocation: string;
    // How wealth is the standard of living of this character.
    public standardOfLiving: Affluency;
    // Family situation that can influence traits and traumas
    public familySituation: FamilySituation;
    // The type of character, currently it can be a Staff, Dreamer or a Retired Dreamer (That can be a staff)
    public type: CharacterType;

    public isPlayer: boolean;
    //The character may be unemployed
    public agency?: string;

    public ethnicity: Ethnicity = Ethnicity.CAUCASIAN;
    public gender: Gender = Gender.FEMALE;
    public traits: string[] = [];
    public flags: string[] = [];
    public sprites: string[] = [];
    public relationshipsModifiers: string[] = [];

    constructor(id?: string, sprites?: string[], name?: string, surname?: string, nickname?: string, birthday?: Date) {
        super();

        this.id = id || `char_${uuidv4()}`;
        this.sprites = sprites || [];
        this.name = name || '';
        this.surname = surname || '';
        this.nickname = nickname || '';
        this.birthday = birthday;
    }
}
