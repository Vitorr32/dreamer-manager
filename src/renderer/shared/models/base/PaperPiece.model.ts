import { v4 as uuidv4 } from 'uuid';
import { BodyType, Ethnicity, Gender, Style } from './Character.model';
import { EntityBase } from './Entity.model';
import { Emotion } from './PaperDoll.model';
import { Variables, VariableType } from './Variable.model';

export enum PieceType {
    HAIR = 'model.paper_piece.type.hair',
    FACE = 'model.paper_piece.type.face',
    BODY = 'model.paper_piece.type.body',
    UPPER_UNDERWEAR = 'model.paper_piece.type.upper_underwear',
    LOWER_UNDERWEAR = 'model.paper_piece.type.lower_underwear',
    UPPER_CLOTHING = 'model.paper_piece.type.upper_clothing',
    LOWER_CLOTHING = 'model.paper_piece.type.lower_clothing',
    FULL_BODY_CLOTHING = 'model.paper_piece.type.full_body_clothing',
}

export enum ClothingState {
    NORMAL,
    PARTIALLY_UNDRESSED,
    UNDRESSED,
}

export enum PaperPieceVariablesKey {
    ID = 'id',
    FILE_PATH = 'filePath',
    TYPE = 'type',
    STYLE = 'style',
    COLOR = 'color',
    EMOTION = 'emotion',
    ETHNICITY = 'ethnicity',
    BODY_TYPE = 'bodyType',
    GENDER = 'gender',
}

export const PaperPieceEntityVariables: Variables = {
    [PaperPieceVariablesKey.ID]: { key: PaperPieceVariablesKey.ID, displayName: 'model.character.variables.id', type: VariableType.TEXT, read: true, edit: false },
    [PaperPieceVariablesKey.FILE_PATH]: {
        key: PaperPieceVariablesKey.FILE_PATH,
        displayName: 'model.paper_piece.variables.file_path',
        type: VariableType.FILE_PATH,
        read: true,
        edit: true,
    },
    [PaperPieceVariablesKey.STYLE]: {
        key: PaperPieceVariablesKey.STYLE,
        displayName: 'model.paper_piece.variables.style',
        type: VariableType.ENUMERATOR_LIST,
        options: Object.values(Style).map((value) => value),
        read: true,
        edit: true,
    },
    [PaperPieceVariablesKey.COLOR]: { key: PaperPieceVariablesKey.COLOR, displayName: 'model.paper_piece.variables.color', type: VariableType.TEXT, read: true, edit: true },
    [PaperPieceVariablesKey.EMOTION]: {
        key: PaperPieceVariablesKey.EMOTION,
        displayName: 'model.paper_piece.variables.emotion',
        type: VariableType.ENUMERATOR_LIST,
        options: Object.values(Emotion).map((value) => value),
        read: true,
        edit: true,
    },
    [PaperPieceVariablesKey.ETHNICITY]: {
        key: PaperPieceVariablesKey.ETHNICITY,
        displayName: 'model.paper_piece.variables.ethnicity',
        type: VariableType.ENUMERATOR,
        options: Object.values(Ethnicity).map((value) => value),
        read: true,
        edit: true,
    },
    [PaperPieceVariablesKey.TYPE]: {
        key: PaperPieceVariablesKey.TYPE,
        displayName: 'model.paper_piece.variables.type',
        type: VariableType.ENUMERATOR,
        options: Object.values(PieceType).map((value) => value),
        read: true,
        edit: true,
    },
    [PaperPieceVariablesKey.GENDER]: {
        key: PaperPieceVariablesKey.GENDER,
        displayName: 'model.paper_piece.variables.gender',
        type: VariableType.ENUMERATOR,
        options: Object.values(Gender).map((value) => value),
        read: true,
        edit: true,
    },
};

export class PaperPiece extends EntityBase {
    static get _variables() {
        return PaperPieceEntityVariables;
    }

    id: string;

    fileName: string;

    filePath: string[];

    // The absolute path of the file in the computer, this is determined on the first load of the game at runtime
    absolutePath?: string;

    type: PieceType;

    gender: Gender;
}

export class HairPiece extends PaperPiece {
    style: Style[];

    color: string;

    type = PieceType.HAIR;

    constructor(id?: string) {
        super();

        this.id = id || `hair_piece_${uuidv4()}`;
    }
}

export class FacePiece extends PaperPiece {
    color: string;

    emotion: Emotion[];

    ethnicity?: Ethnicity;

    bodyType: BodyType;

    type = PieceType.FACE;

    constructor(id?: string) {
        super();

        this.id = id || `face_piece_${uuidv4()}`;
    }
}

export class BodyPiece extends PaperPiece {
    color: string;

    bodyType: BodyType;

    type = PieceType.BODY;

    constructor(id?: string) {
        super();

        this.id = id || `body_piece_${uuidv4()}`;
    }
}

export class UpperUnderwearPiece extends PaperPiece {
    style: Style[];

    type = PieceType.UPPER_UNDERWEAR;

    constructor(id?: string) {
        super();

        this.id = id || `upper_underwear_piece_${uuidv4()}`;
    }
}

export class LowerUnderwearPiece extends PaperPiece {
    style: Style[];

    type = PieceType.LOWER_UNDERWEAR;

    constructor(id?: string) {
        super();

        this.id = id || `lower_underwear_piece_${uuidv4()}`;
    }
}

export class UpperClothingPiece extends PaperPiece {
    style: Style[];

    type = PieceType.UPPER_CLOTHING;

    constructor(id?: string) {
        super();

        this.id = id || `upper_clothing_piece_${uuidv4()}`;
    }
}

export class LowerClothingPiece extends PaperPiece {
    style: Style[];

    type = PieceType.LOWER_CLOTHING;

    constructor(id?: string) {
        super();

        this.id = id || `lower_clothing_piece_${uuidv4()}`;
    }
}

export class FullBodyClothingPiece extends PaperPiece {
    style: Style[];

    type = PieceType.FULL_BODY_CLOTHING;

    constructor(id?: string) {
        super();

        this.id = id || `dress_piece_${uuidv4()}`;
    }
}
