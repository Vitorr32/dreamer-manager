import { Ethnicity, Style } from './Character.model';
import { EntityBase } from './Entity.model';
import { Emotion } from './PaperDoll.model';
import { Variables, VariableType } from './Variable.model';
import { v4 as uuidv4 } from 'uuid';

export enum PaperPieceVariablesKey {
    ID = 'id',
    FILE_PATH = 'filePath',
    STYLE = 'style',
    COLOR = 'color',
    LOWER_UNDERWEAR = 'lowerUnderwear',
    UPPER_CLOTHING = 'upperClothing',
    LOWER_CLOTHING = 'lowerClothing',
    FULL_BODY_CLOTHING = 'fullBodyClothing',
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
        type: VariableType.ENUMERATOR,
        options: Object.values(Style).map((value) => value),
        read: true,
        edit: true,
    },
    [PaperPieceVariablesKey.COLOR]: { key: PaperPieceVariablesKey.COLOR, displayName: 'model.paper_piece.variables.color', type: VariableType.TEXT, read: true, edit: true },
};

export class PaperPiece extends EntityBase {
    static get _variables() {
        return PaperPieceEntityVariables;
    }

    id: string;
    filePath: string[];
}

export class HairPiece extends PaperPiece {
    style: Style;
    color: string;

    constructor(id?: string) {
        super();

        this.id = id || `hair_piece_${uuidv4()}`;
    }
}

export class FacePiece extends PaperPiece {
    neutralEmotion?: FacePiece;
    color: string;
    emotion: Emotion;
    ethnicity: Ethnicity;
    weight: number;

    constructor(id?: string) {
        super();

        this.id = id || `face_piece_${uuidv4()}`;
    }
}

export class BodyPiece extends PaperPiece {
    color: string;
    weight: number;

    constructor(id?: string) {
        super();

        this.id = id || `body_piece_${uuidv4()}`;
    }
}

export class UpperUnderwearPiece extends PaperPiece {
    style: Style;
    editable = true;

    constructor(id?: string) {
        super();

        this.id = id || `upper_underwear_piece_${uuidv4()}`;
    }
}

export class LowerUnderwearPiece extends PaperPiece {
    style: Style;
    editable = true;

    constructor(id?: string) {
        super();

        this.id = id || `lower_underwear_piece_${uuidv4()}`;
    }
}

export class UpperClothingPiece extends PaperPiece {
    style: Style;
    editable = true;

    constructor(id?: string) {
        super();

        this.id = id || `upper_clothing_piece_${uuidv4()}`;
    }
}

export class LowerClothingPiece extends PaperPiece {
    style: Style;
    editable = true;

    constructor(id?: string) {
        super();

        this.id = id || `lower_clothing_piece_${uuidv4()}`;
    }
}

export class FullBodyClothingPiece extends PaperPiece {
    style: Style;
    editable = true;

    constructor(id?: string) {
        super();

        this.id = id || `dress_piece_${uuidv4()}`;
    }
}
