import { EntityType } from '../enums/Entities.enum';
import { VariableOperator } from '../enums/VariableOperator';
import { DynamicEntity } from '../enums/DynamicEntity.enum';

export interface EntityVariableValue {
    entityType?: EntityType;
    specifiedDynamicEntities?: string[]; // Only used on run-time, this are the entities that were pooled when validating the EntityVariableValue.
    specifiedDynamicEntity?: DynamicEntity;
    variableKey?: string;
    operator?: VariableOperator;
    value: any;
}
