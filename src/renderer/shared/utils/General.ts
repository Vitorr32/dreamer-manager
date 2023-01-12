import cloneDeep from 'lodash/cloneDeep';
import { store } from 'renderer/redux/store';
import { Actor } from '../models/base/Actor.model';
import { Character } from '../models/base/Character.model';
import { PaperDoll } from '../models/base/PaperDoll.model';
import { PaperPiece } from '../models/base/PaperPiece.model';
import { Relationship } from '../models/base/Relationship.model';
import { Variables } from '../models/base/Variable.model';
import { World } from '../models/base/World.model';
import { EntityType } from '../models/enums/Entities.enum';

export function AreArraysEqual(array1: any[], array2: any[]): boolean {
    if (!array1 && !array2) {
        return true;
    } else if (!array1 || !array2) {
        return false;
    } else {
        return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
    }
}

export function CopyClassInstance<T>(object: T): T {
    if (Array.isArray(object)) {
        return cloneDeep(object);
    }

    return Object.assign(Object.create(Object.getPrototypeOf(object)), cloneDeep(object));
}

export function GetVariablesOfEntity(entity: EntityType): Variables {
    switch (entity) {
        case EntityType.CHARACTERS:
            return Character.getEntityVariables();
        case EntityType.ACTORS:
            return Actor.getEntityVariables();
        case EntityType.WORLD_STATE:
            return World.getEntityVariables();
        case EntityType.RELATIONSHIP:
            return Relationship.getEntityVariables();
        case EntityType.PAPER_DOLL:
            return PaperDoll.getEntityVariables();
        case EntityType.PAPER_PIECE:
            return PaperPiece.getEntityVariables();
        default:
            return null;
    }
}

export function GetEntitiesOfEntity(entity: EntityType): any[] {
    switch (entity) {
        case EntityType.CHARACTERS:
            return store.getState().database.characters;
        case EntityType.FLAGS:
            return store.getState().database.flags;
        default:
            console.error('Searched for unknown entity: ' + entity);
            return [];
    }
}
