import {
    PLACEHOLDER_PIECE_BODY_FEMALE,
    PLACEHOLDER_PIECE_BODY_MALE,
    PLACEHOLDER_PIECE_FACE_FEMALE,
    PLACEHOLDER_PIECE_FACE_MALE,
    PLACEHOLDER_PIECE_HAIR_FEMALE,
    PLACEHOLDER_PIECE_HAIR_MALE,
} from 'renderer/shared/Constants';
import { v4 as uuidv4 } from 'uuid';
import { VariableType } from '../enums/VariableType';
import { Gender } from './Character.model';
import { Emotion } from '../enums/sprite/Emotion.enum';
import { EntityBase } from './Entity.model';
import { BodyPiece, FacePiece, HairPiece } from './PaperPiece.model';
import { Variables } from './Variable.model';

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
export type DollPieces = {
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
    static get variables() {
        return PaperDollEntityVariables;
    }

    id: string;

    isCustom: boolean;

    // The hair/face/body piece of the paper doll are subdivided based on their emotions
    emotions: DollPieces;

    upperUnderwear: string;

    lowerUnderwear: string;

    upperClothing: string;

    lowerClothing: string;

    fullBodyClothing: string;

    constructor(gender: Gender, id?: string, baseBody?: BodyPiece, baseFace?: FacePiece, baseHair?: HairPiece) {
        super();

        this.id = id || `paper_doll_${uuidv4()}`;
        this.isCustom = false;
        this.emotions = {
            [Emotion.NEUTRAL]: {
                hairPiece: baseHair || gender === Gender.FEMALE ? PLACEHOLDER_PIECE_HAIR_FEMALE : PLACEHOLDER_PIECE_HAIR_MALE,
                bodyPiece: baseBody || gender === Gender.FEMALE ? PLACEHOLDER_PIECE_BODY_FEMALE : PLACEHOLDER_PIECE_BODY_MALE,
                facePiece: baseFace || gender === Gender.FEMALE ? PLACEHOLDER_PIECE_FACE_FEMALE : PLACEHOLDER_PIECE_FACE_MALE,
            },
        } as DollPieces;
    }
}
