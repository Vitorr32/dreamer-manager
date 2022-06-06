import { v4 as uuidv4 } from 'uuid';

export enum KinshipType {
    PARENT,
    SIBLING,
}

export class Kinship {
    id: string;
    //Source and target will work like follows: If kinship type is "Parent" the source is the parent, and the target is the child.
    //To avoid implied kinships (such as having both a "Parent" and "Child of" ) they will alyways be top-down when possible.
    sourceCharacterID: string;
    targetCharacterID: string;
    type: KinshipType;

    constructor(sourceCharacterID: string, targetCharacterID: string, type: KinshipType, customID?: string) {
        this.id = customID || `kinship_${uuidv4()}`;
        this.sourceCharacterID = sourceCharacterID;
        this.targetCharacterID = targetCharacterID;
        this.type = type;
    }
}
