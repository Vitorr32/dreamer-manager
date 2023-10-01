import { v4 as uuidv4 } from 'uuid';
import { Variables } from './Variable.model';
import { EntityType } from '../enums/Entities.enum';
import { EntityBase } from './Entity.model';
import { Culture, LanguageFluency } from '../enums/Culture.enum';
import { VariableType } from '../enums/VariableType';

export enum Gender {
    MALE = 'model.character.gender.male',
    FEMALE = 'model.character.gender.female',
}

export enum Affluence {
    DESTITUTE = 'model.character.affluence.destitute',
    VERY_POOR = 'model.character.affluence.very_poor',
    POOR = 'model.character.affluence.poor',
    MIDDLE_CLASS = 'model.character.affluence.middle_class',
    UPPER_MIDDLE_CLASS = 'model.character.affluence.upper_middle_class',
    RICH = 'model.character.affluence.rich',
    PROSPEROUS = 'model.character.affluence.prosperous',
    LUXURIOUS = 'model.character.affluence.luxurious',
    NOBILITY = 'model.character.affluence.nobility',
}

export enum CharacterType {
    STAFF = 'model.character.type.staff',
    ACTIVE_DREAMER = 'model.character.type.active_dreamer',
    RETIRED_DREAMER = 'model.character.type.retired_dreamer',
}

export enum Ethnicity {
    CAUCASIAN = 'model.character.ethnicity.germania',
    MEDITERRANEAN = 'model.character.ethnicity.mediterranean',
    EAST_ASIAN = 'model.character.ethnicity.sinae',
    STEPPE_NOMAD = 'model.character.ethnicity.sacae',
    INDIAN = 'model.character.ethnicity.indus',
    ARAB = 'model.character.ethnicity.mesopotamia',
    SUB_SAHARA_AFRICAN = 'model.character.ethnicity.abyssinia',
    MIXED = 'model.character.ethnicity.fuscus',
    AMERICAN_INDIAN = 'model.character.ethnicity.nova_terrae',
}

export enum Status {
    UNDEFINED = 'model.undefined',

    MOOD = 'model.character.status.mood',
    STRESS = 'model.character.status.stress',
    ENERGY = 'model.character.status.energy',
}

export enum Style {
    CLASSIC = 'model.paper_doll.style.conservative',
    PUNK = 'model.paper_doll.style.punk',
    GOTHIC = 'model.paper_doll.style.gothic',
}

export enum BodyType {
    UNDEFINED = 'model.undefined',

    ANOREXIC = 'model.character.body_type.anorexic',
    SKINNY = 'model.character.body_type.skinny',
    UNDERWEIGHT = 'model.character.body_type.underweight',
    AVERAGE = 'model.character.body_type.average',
    OVERWEIGHT = 'model.character.body_type.overweight',
    OBESE = 'model.character.body_type.obese',
    FIT = 'model.character.body_type.fit',
    MUSCULAR = 'model.character.body_type.muscular',
}

export enum CharacterVariablesKey {
    ID = 'id',
    NAME = 'name',
    SURNAME = 'surname',
    NICKNAME = 'nickname',
    BIRTHDAY = 'birthday',
    AGE = 'age',
    ETHNICITY = 'ethnicity',
    CULTURE = 'culture',
    LANGUAGE = 'language',
    FLUENCY = 'fluency',
    GENDER = 'gender',
    FLAGS = 'flags',
    AGENCY = 'agency',
    IS_PLAYER = 'isPlayer',
    TYPE = 'type',
    ACTIVE = 'isActive',
    NATIONALITY = 'nationality',
    HOMETOWN = 'hometown',
    RESIDENCE_LOCATION = 'residenceLocation',
    AFFLUENCE = 'standardOfLiving',
    TRAITS = 'traits',
    HEIGHT = 'height',
    WEIGHT = 'weight',
    FAT_PERCENTAGE = 'fatPercentage',
    PAPER_DOLL = 'paperDoll',
    BODY_TYPE = 'bodyType',

    // Languages
    ELBEAN = 'elbean',
    WAKOKUAN = 'wakokuan',
    LECHIAN = 'lechian',
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
    [CharacterVariablesKey.CULTURE]: {
        key: CharacterVariablesKey.CULTURE,
        displayName: 'model.character.variables.culture',
        type: VariableType.ENUMERATOR,
        options: Object.values(Culture).map((value) => value),
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.ELBEAN]: {
        key: CharacterVariablesKey.ELBEAN,
        displayName: 'model.character.variables.elbean',
        groupBy: 'model.character.variables.languages',
        type: VariableType.ENUMERATOR,
        options: Object.values(LanguageFluency).map((value) => value),
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.WAKOKUAN]: {
        key: CharacterVariablesKey.WAKOKUAN,
        displayName: 'model.character.variables.wakokuan',
        groupBy: 'model.character.variables.languages',
        type: VariableType.ENUMERATOR,
        options: Object.values(LanguageFluency).map((value) => value),
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.LECHIAN]: {
        key: CharacterVariablesKey.LECHIAN,
        displayName: 'model.character.variables.lechian',
        groupBy: 'model.character.variables.languages',
        type: VariableType.ENUMERATOR,
        options: Object.values(LanguageFluency).map((value) => value),
        read: true,
        edit: true,
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
        externalEntity: EntityType.FLAGS,
        read: true,
        edit: true,
    },
    agency: {
        key: CharacterVariablesKey.AGENCY,
        displayName: 'model.character.variables.agency',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.AGENCY,
        read: true,
        edit: true,
    },
    nationality: {
        key: CharacterVariablesKey.NATIONALITY,
        displayName: 'model.character.variables.nationality',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.NATIONS,
        read: true,
        edit: false,
    },
    hometown: {
        key: CharacterVariablesKey.HOMETOWN,
        displayName: 'model.character.variables.hometown',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.CITIES,
        read: true,
        edit: false,
    },
    residenceLocation: {
        key: CharacterVariablesKey.RESIDENCE_LOCATION,
        displayName: 'model.character.variables.residence_location',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.CITIES,
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.AFFLUENCE]: {
        key: CharacterVariablesKey.AFFLUENCE,
        displayName: 'model.character.variables.affluence',
        type: VariableType.ENUMERATOR,
        options: Object.values(Affluence).map((value) => value),
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
    isPlayer: { key: CharacterVariablesKey.IS_PLAYER, displayName: 'model.character.variables.isPlayer', type: VariableType.BOOLEAN, read: true, edit: false },
    isActive: { key: CharacterVariablesKey.ACTIVE, displayName: 'model.character.variables.isActive', type: VariableType.BOOLEAN, read: true, edit: true },
    traits: {
        key: CharacterVariablesKey.TRAITS,
        displayName: 'model.character.variables.nationality',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.TRAITS,
        read: true,
        edit: false,
    },
    [CharacterVariablesKey.HEIGHT]: {
        key: CharacterVariablesKey.HEIGHT,
        displayName: 'model.character.variables.height',
        type: VariableType.NUMBER,
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.WEIGHT]: {
        key: CharacterVariablesKey.WEIGHT,
        displayName: 'model.character.variables.weight',
        type: VariableType.NUMBER,
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.FAT_PERCENTAGE]: {
        key: CharacterVariablesKey.FAT_PERCENTAGE,
        displayName: 'model.character.variables.fat_percentage',
        type: VariableType.NUMBER,
        read: true,
        edit: false,
    },
    [CharacterVariablesKey.PAPER_DOLL]: {
        key: CharacterVariablesKey.PAPER_DOLL,
        displayName: 'model.character.variables.paperDoll',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.PAPER_DOLL,
        read: true,
        edit: true,
    },
    [CharacterVariablesKey.BODY_TYPE]: {
        key: CharacterVariablesKey.BODY_TYPE,
        displayName: 'model.character.variables.bodyType',
        type: VariableType.ENUMERATOR,
        options: Object.values(BodyType).map((value) => value),
        read: true,
        edit: false,
    },
};

export class Character extends EntityBase {
    static get variables() {
        return CharacterEntityVariables;
    }

    public name: string;

    public surname: string;

    public nickname: string;

    public age: number;

    public birthday: Date;

    public paperDoll: string;

    // If this character is available if they have the correct age, otherwise they will only appear after a event effect.
    public isActive: boolean;

    // The id of the Nation that this character has citizenship.
    public nationality: string;

    // The id of City where this character was born and raised.
    public hometown: string;

    // The id of the the City where the character currently lives in
    public residenceLocation: string;

    // How wealth is the standard of living of this character.
    public standardOfLiving: Affluence;

    // The type of character, currently it can be a Staff, Dreamer or a Retired Dreamer (That can be a staff)
    public type: CharacterType;

    public height: number;

    public weight: number;

    public fatPercentage: number;

    public bodyType: BodyType;

    public isPlayer: boolean;

    // The character may be unemployed
    public agency?: string;

    // What languages does this character know, and what is his fluency on them?
    public elbean: LanguageFluency;

    public wakokuan: LanguageFluency;

    public lechian: LanguageFluency;

    public ethnicity: Ethnicity;

    public culture: Culture;

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

    public calculateBodyType(): BodyType {
        if (!this.weight || !this.height || !this.fatPercentage) {
            return BodyType.UNDEFINED;
        }

        const heightInMeters = this.height / 100;
        const bmi = this.weight / (heightInMeters * heightInMeters);

        if (Number.isNaN(bmi)) {
            return BodyType.UNDEFINED;
        }

        if (bmi < 19 && this.fatPercentage < 5) {
            return BodyType.ANOREXIC;
        }
        if (bmi < 19 && this.fatPercentage < 10) {
            return BodyType.SKINNY;
        }
        if (bmi < 19) {
            return BodyType.UNDERWEIGHT;
        }
        if (bmi < 25 && this.fatPercentage < 20) {
            return BodyType.FIT;
        }
        if (bmi < 25) {
            return BodyType.AVERAGE;
        }
        if (this.fatPercentage < 20) {
            return BodyType.MUSCULAR;
        }
        if (this.fatPercentage < 30) {
            return BodyType.OVERWEIGHT;
        }
        return BodyType.OBESE;
    }
}
