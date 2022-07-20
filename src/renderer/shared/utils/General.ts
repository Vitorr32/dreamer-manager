import cloneDeep from 'lodash/cloneDeep';
import { store } from 'renderer/redux/store';
import { Actor } from '../models/base/Actor.model';
import { Character } from '../models/base/Character.model';
import { Relationship } from '../models/base/Relationship.model';
import { Variables } from '../models/base/Variable.model';
import { World } from '../models/base/World.model';
import { Entity } from '../models/enums/Entities.enum';

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

export function GetVariablesOfEntity(entity: Entity): Variables {
    switch (entity) {
        case Entity.CHARACTERS:
            return Character.getEntityVariables();
        case Entity.ACTORS:
            return Actor.getEntityVariables();
        case Entity.WORLD_STATE:
            return World.getEntityVariables();
        case Entity.RELATIONSHIP:
            return Relationship.getEntityVariables();
        default:
            return null;
    }
}

export function GetEntitiesOfEntity(entity: Entity): any[] {
    switch (entity) {
        case Entity.CHARACTERS:
            return store.getState().database.characters;
        case Entity.FLAGS:
            return store.getState().database.flags;
        default:
            console.error('Searched for unknown entity: ' + entity);
            return [];
    }
}
