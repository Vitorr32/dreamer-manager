import cloneDeep from 'lodash/cloneDeep';
import { Trigger } from '../models/enums/Trigger.enum';
import { DynamicEntity } from '../models/enums/DynamicEntity.enum';
import { VariableOperator } from '../models/enums/VariableOperator';
import { EntityType } from '../models/enums/Entities.enum';

export function AreArraysEqual(array1: any[], array2: any[]): boolean {
    if (!array1 && !array2) {
        return true;
    }
    if (!array1 || !array2) {
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
        case VariableOperator.NOT_CONTAINS:
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
            console.error(`Unsupported variable operator: ${variableOperator}`);
            return false;
    }
}
