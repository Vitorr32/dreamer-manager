import { Entity } from '../enums/Entities.enum';
import { EntitySelector } from './Condition.model';
import { VariableOperator } from './Variable.model';

export interface EntityVariableValue {
    entity: Entity;
    variableKey: string;
    value: any;
}

export interface EntityFilter extends EntityVariableValue {
    operator: VariableOperator;
}

export interface ConditionEntityFilter extends EntityFilter {
    hasTarget: boolean;
    targetFilter: EntityFilter[];
}
