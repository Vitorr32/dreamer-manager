import { EntityType } from '../enums/Entities.enum';
import { VariableOperator } from '../enums/VariableOperator';
import { DynamicEntity } from '../enums/DynamicEntity.enum';

// EVV for short, this interface is the basic object used to filtering and applying modifiers to entities.
export interface EntityVariableValue {
    entityType?: EntityType;
    specifiedDynamicEntity?: DynamicEntity;
    variableKey?: string;
    operator?: VariableOperator;
    value: any; // eslint-disable-line
    // In case the EVV is being used to compare to another's entity same variable value, the external filter will dictate the filter for said entity.
    // It can be used as target of comparison between entities
    externalEntityFilter?: EntityVariableValue[];
}
