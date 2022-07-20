import { Entity } from '../enums/Entities.enum';
import { VariableOperator } from './Variable.model';

/**
 * Things to consider:
 *
 * To get all characters, the filter should target all characters with age bigger than 0,
 * To set target as SELF (As in, the character that has the Trait, for example), set the character ID to the value 'SELF'
 */
export enum DynamicValue {
    SELF = 'SELF',
}
export interface EntityVariableValue {
    entity: Entity;
    variableKey: string;
    value: any;
}

export interface EntityFilter extends EntityVariableValue {
    operator: VariableOperator;
}

export interface ExternalExpandedEntityFilter extends EntityFilter {
    isFilteringExternalKey: boolean;
    externalEntityFilter: EntityFilter[];
    isComparingEntities: boolean;
    comparingEntityFilter: EntityFilter[];
}
