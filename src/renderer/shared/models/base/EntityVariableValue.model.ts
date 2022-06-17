import { Entity } from '../enums/Entities.enum';
import { VariableOperator } from './Variable.model';

export interface EntityVariableValue {
    entity: Entity;
    variableKey: string;
    value: any;
}

export interface EntityFilter extends EntityVariableValue {
    operator: VariableOperator;
}
