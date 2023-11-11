import cloneDeep from 'lodash/cloneDeep';
import { VariableOperator } from '../models/enums/VariableOperator';

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

export function EvaluateVariableOperator(variableOperator: VariableOperator, entityValue: any, filterValue: any) {
    switch (variableOperator) {
        case VariableOperator.GREATER_THAN:
            return entityValue > filterValue;
        case VariableOperator.EQUAL_OR_GREATER_THAN:
            return entityValue >= filterValue;
        case VariableOperator.EQUALS_TO:
            return entityValue === filterValue;
        case VariableOperator.LESSER_THAN:
            return entityValue < filterValue;
        case VariableOperator.EQUAL_OR_LESSER_THAN:
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
