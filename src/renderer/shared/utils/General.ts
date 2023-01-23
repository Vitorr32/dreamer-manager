import cloneDeep from 'lodash/cloneDeep';
import { store } from 'renderer/redux/store';
import { Actor } from '../models/base/Actor.model';
import { Character } from '../models/base/Character.model';
import { Dreamer } from '../models/base/Dreamer.model';
import { Trigger, Source } from '../models/base/Effect.model';
import { DynamicEntity } from '../models/base/EntityVariableValue.model';
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
        case EntityType.DREAMER:
            return Dreamer.getEntityVariables();
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

export function GetEntityTypeOfDynamicEntity(dynamicEntity: DynamicEntity): EntityType {
    switch (dynamicEntity) {
        case DynamicEntity.ALL_ACTORS:
            return EntityType.ACTORS;
        case DynamicEntity.ALL_DREAMERS_OF_STUDIO:
        case DynamicEntity.SELF_PRODUCER:
            return EntityType.DREAMER;
        case DynamicEntity.EVERYONE:
        case DynamicEntity.EVERYONE_ON_AGENCY:
        case DynamicEntity.SELF:
        case DynamicEntity.SELF_FRIENDS:
        case DynamicEntity.SELF_RIVALS:
        case DynamicEntity.ALL_STAFF_OF_AGENCY:
            return EntityType.CHARACTERS;
        default:
            console.error('Unknown dynamic entity:');
            return null;
    }
}

export function FilterPossibleDynamicEntitiesForTriggerType(effectTriggerType: Trigger, effectSource: Source): DynamicEntity[] {
    switch(effectTriggerType) {
        case Trigger.ON_INTERACTION_START:
            return [DynamicEntity.SELF, DynamicEntity.SELF_FRIENDS, DynamicEntity.SELF_RIVALS];
        case Trigger.ON_EVENT_START:
            return [DynamicEntity.ALL_ACTORS, DynamicEntity.PROTAGONIST];
        case Trigger.ON_RECORD_START:
            return [DynamicEntity.SELF, DynamicEntity.SELF_FRIENDS, DynamicEntity.SELF_RIVALS];
        case Trigger.ON_SHOW_START:
            return [DynamicEntity.EVERYONE];
        case Trigger.ON_TRAINING_START:
            return [];
        default:
            return [];
    }
}
