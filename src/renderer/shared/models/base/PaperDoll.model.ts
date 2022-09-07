import { Ethnicity, Style } from './Character.model';
import { v4 as uuidv4 } from 'uuid';
import { EntityBase } from './Entity.model';

/**
 * Paper Dolls are the pre-generated sprites of the generated characters of the game, they are subdivided in the following sections, and when together form a full
 * Character sprites:
 *
 * Hair/Hairstyle = Has color, Form, Style and Ethnicity variants;
 * Face = Has form, emotion, color (eye color) and ethnicity variant;
 * Body = Has form, color (skin tone), size, emotion, and ethnicity variant; And it's the position base of the entire sprite
 * Upper Clothing = Has form and style variant
 * Lower Clothing = Has form and style variant;
 * Full body Clothing = Has form and style variant;
 * Upper underwear = Has form and style variant;
 * Lower Underwear = Has form and style variant;
 *
 * Each one of these sections has variants, such as skin color for skin pieces. Eye format for different ethinicities and so on.
 */

export class PaperDoll extends EntityBase {
    id: string;
    isCustom: boolean;

    hairPiece: HairPiece;
    faceSetPieces: FaceSetPieces;
    bodyPiece: BodyPiece;

    upperUnderwear: UpperUnderwearPiece;
    lowerUnderwear: LowerUnderwearPiece;
    upperClothing: UpperClothingPiece;
    lowerClothing: LowerClothingPiece;
    fullBodyClothing: FullBodyClothingPiece;

    customFilePath: string[];

    constructor(id?: string) {
        super();

        this.id = id || `paper_doll_${uuidv4()}`;
    }
}

export class PaperPiece extends EntityBase {
    id: string;
    filePath: string[];
    editable: boolean;
}

export class HairPiece extends PaperPiece {
    style: Style;
    color: string;
    editable = true;

    constructor(id?: string) {
        super();

        this.id = id || `hair_piece_${uuidv4()}`;
    }
}

export class FaceSetPieces {
    baseEmotion: FacePiece;

    otherEmotions: { [key in Emotion]: FacePiece };
}

export class FacePiece extends PaperPiece {
    neutralEmotion?: FacePiece;
    color: string;
    emotion: Emotion;
    ethnicity: Ethnicity;
    editable = false;
}

export class BodyPiece extends PaperPiece {
    color: string;
    size: number;
    ethnicity: Ethnicity;
    editable = true; //May get Fatter/Skinner
}

export class UpperUnderwearPiece extends PaperPiece {
    style: Style;
    editable = true;
}

export class LowerUnderwearPiece extends PaperPiece {
    style: Style;
    editable = true;
}

export class UpperClothingPiece extends PaperPiece {
    style: Style;
    editable = true;
}

export class LowerClothingPiece extends PaperPiece {
    style: Style;
    editable = true;
}

export class FullBodyClothingPiece extends PaperPiece {
    style: Style;
    editable = true;
}

export enum Emotion {
    NEUTRAL = 'model.paper_doll.emotion.neutral',

    HAPPY = 'model.paper_doll.emotion.happy',
    SCARED = 'model.paper_doll.emotion.very_happy', //...TODO
}
