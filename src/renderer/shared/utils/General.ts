import cloneDeep from 'lodash/cloneDeep';
import { Character } from '../models/base/Character.model';
import { Variables } from '../models/base/Variable.model';
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
        // return Actor[keyof Actor];
        default:
            return null;
    }
}
