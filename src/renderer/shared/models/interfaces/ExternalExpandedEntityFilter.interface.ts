import { EntityVariableValue } from './EntityVariableValue.interface';

export interface ExternalExpandedEntityFilter extends EntityVariableValue {
    isFilteringExternalKey: boolean;
    isComparingEntities: boolean;
    externalEntityFilter: EntityVariableValue[];
}
