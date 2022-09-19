import { v4 as uuidv4 } from 'uuid';
import { EntityBase } from './Entity.model';
import { Variables, VariableType } from './Variable.model';

/**
 * Paper Dolls are the pre-generated sprites of the generated characters of the game, they are subdivided in the following sections, and when together form a full
 * Character sprites:
 *
 * Hair/Hairstyle = Has color, Form, Style and Ethnicity variants;
 * Face = Has form, emotion, color (eye color) and ethnicity variant;
 * Body = Has form, color (skin tone), weight, emotion; And it's the position base of the entire sprite
 * Upper Clothing = Has form and style variant
 * Lower Clothing = Has form and style variant;
 * Full body Clothing = Has form and style variant;
 * Upper underwear = Has form and style variant;
 * Lower Underwear = Has form and style variant;
 *
 * Each one of these sections has variants, such as skin color for skin pieces. Eye format for different ethinicities and so on.
 */
type DollPieces = {
    [key in Emotion]: {
        hairPiece: string;
        facePiece: string;
        bodyPiece: string;
        customFilePath?: string[];
        customFileAbsolutePath?: string;
    };
};

export enum PaperDollVariablesKey {
    ID = 'id',
    IS_CUSTOM = 'isCustom',
    UPPER_UNDERWEAR = 'upperUnderwear',
    LOWER_UNDERWEAR = 'lowerUnderwear',
    UPPER_CLOTHING = 'upperClothing',
    LOWER_CLOTHING = 'lowerClothing',
    FULL_BODY_CLOTHING = 'fullBodyClothing',
}

export enum CLOTHING_STATE {}

export const PaperDollEntityVariables: Variables = {
    [PaperDollVariablesKey.ID]: { key: PaperDollVariablesKey.ID, displayName: 'model.character.variables.id', type: VariableType.TEXT, read: true, edit: false },
    [PaperDollVariablesKey.IS_CUSTOM]: {
        key: PaperDollVariablesKey.IS_CUSTOM,
        displayName: 'model.paper_doll.variables.is_custom',
        type: VariableType.BOOLEAN,
        read: true,
        edit: true,
    },
    [PaperDollVariablesKey.UPPER_UNDERWEAR]: {
        key: PaperDollVariablesKey.UPPER_UNDERWEAR,
        displayName: 'model.paper_doll.variables.upper_underwear',
        type: VariableType.EXTERNAL_KEY,
        read: true,
        edit: true,
    },
    [PaperDollVariablesKey.LOWER_UNDERWEAR]: {
        key: PaperDollVariablesKey.LOWER_UNDERWEAR,
        displayName: 'model.paper_doll.variables.lower_underwear',
        type: VariableType.EXTERNAL_KEY,
        read: true,
        edit: true,
    },
    [PaperDollVariablesKey.UPPER_CLOTHING]: {
        key: PaperDollVariablesKey.UPPER_CLOTHING,
        displayName: 'model.paper_doll.variables.upper_clothing',
        type: VariableType.EXTERNAL_KEY,
        read: true,
        edit: true,
    },
    [PaperDollVariablesKey.LOWER_CLOTHING]: {
        key: PaperDollVariablesKey.LOWER_CLOTHING,
        displayName: 'model.paper_doll.variables.lower_clothing',
        type: VariableType.EXTERNAL_KEY,
        read: true,
        edit: true,
    },
    [PaperDollVariablesKey.FULL_BODY_CLOTHING]: {
        key: PaperDollVariablesKey.FULL_BODY_CLOTHING,
        displayName: 'model.paper_doll.variables.full_body_clothing',
        type: VariableType.EXTERNAL_KEY,
        read: true,
        edit: true,
    },
};

export class PaperDoll extends EntityBase {
    id: string;
    isCustom: boolean;

    //The hair/face/body piece of the paper doll are subdivided based on their emotions
    emotions: DollPieces;

    upperUnderwear: string;
    lowerUnderwear: string;
    upperClothing: string;
    lowerClothing: string;
    fullBodyClothing: string;

    constructor(id?: string) {
        super();

        this.id = id || `paper_doll_${uuidv4()}`;
        this.isCustom = false;
        this.emotions = {} as DollPieces;
    }
}

export enum Emotion {
    NEUTRAL = 'model.paper_doll.emotion.neutral',

    HAPPY = 'model.paper_doll.emotion.happy',
    EUPHORIC = 'model.paper_doll.emotion.euphoric',

    SCARED = 'model.paper_doll.emotion.scared',
    TERRIFIED = 'model.paper_doll.emotion.terrified',

    SAD = 'model.paper_doll.emotion.sad',
    DEPRESSED = 'model.paper_doll.emotion.depressed',

    EMBARRASSED = 'model.paper_doll.emotion.embarrassed',
    ASHAMED = 'model.paper_doll.emotion.ashamed',

    ANNOYED = 'model.paper_doll.emotion.annoyed',
    ANGRY = 'model.paper_doll.emotion.angry',
}
