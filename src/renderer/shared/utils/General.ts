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
import { VariableOperator, Variables } from '../models/base/Variable.model';
import { World } from '../models/base/World.model';
import { EntityType } from '../models/enums/Entities.enum';
import { Trait } from '../models/base/Trait.model';
import { Attribute } from '../models/base/Attribute.model';

export function AreArraysEqual(array1: any[], array2: any[]): boolean {
    if (!array1 && !array2) {
        return true;
    } if (!array1 || !array2) {
        return false;
    } 
        return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
    
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
        case EntityType.TRAITS:
            return Trait.getEntityVariables();
        case EntityType.ATTRIBUTES:
            return Attribute.getEntityVariables();
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
            console.error(`Searched for unknown entity: ${  entity}`);
            return [];
    }
}

export function GetEntityTypeOfDynamicEntity(dynamicEntity: DynamicEntity): EntityType {
    switch (dynamicEntity) {
        case DynamicEntity.ALL_ACTORS:
            return EntityType.ACTORS;
        case DynamicEntity.SELF_DREAMER:
        case DynamicEntity.ALL_DREAMERS_OF_STUDIO:
            return EntityType.DREAMER;
        case DynamicEntity.SELF_PRODUCER:
        case DynamicEntity.EVERYONE:
        case DynamicEntity.EVERYONE_ON_AGENCY:
        case DynamicEntity.SELF:
        case DynamicEntity.SELF_FRIENDS:
        case DynamicEntity.SELF_RIVALS:
        case DynamicEntity.ALL_STAFF_OF_AGENCY:
            return EntityType.CHARACTERS;
        case DynamicEntity.MC_AGENCY:
        case DynamicEntity.SELF_AGENCY:
            return EntityType.AGENCY;
        case DynamicEntity.SPECIFIC_FILTER:
            return null;
        default:
            console.error('Unknown dynamic entity:', dynamicEntity);
            return null;
    }
}

export function FilterPossibleDynamicEntitiesForTriggerType(effectTriggerType: Trigger, effectSource: EntityType): DynamicEntity[] {
    switch (effectTriggerType) {
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

export function EvaluateVariableOperator(variableOperator: VariableOperator, entityValue: any, filterValue: any) {
    switch (variableOperator) {
        case VariableOperator.BIGGER_THAN:
            return entityValue > filterValue;
        case VariableOperator.EQUAL_OR_BIGGER_THAN:
            return entityValue >= filterValue;
        case VariableOperator.EQUALS_TO:
            return entityValue === filterValue;
        case VariableOperator.LESS_THAN:
            return entityValue < filterValue;
        case VariableOperator.EQUAL_OR_LESS_THAN:
            return entityValue <= filterValue;
        case VariableOperator.NOT_EQUALS_TO:
            return entityValue !== filterValue;
        case VariableOperator.CONTAINS:
            return entityValue.includes(filterValue);
        case VariableOperator.DONT_CONTAINS:
            return !entityValue.includes(filterValue);
        case VariableOperator.STARTS_WITH:
            return entityValue.startsWith(filterValue);
        case VariableOperator.ENDS_WITH:
            return entityValue.endsWith(filterValue);
        case VariableOperator.IS_EMPTY:
            return entityValue.length === 0;
        case VariableOperator.IS_NOT_EMPTY:
            return entityValue.length > 0;
        default:
            console.error(`Unsupported variable operator: ${  variableOperator}`);
            return false;
    }
}
