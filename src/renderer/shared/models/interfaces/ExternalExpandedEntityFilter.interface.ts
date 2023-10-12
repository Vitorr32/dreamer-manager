import { EntityVariableValue } from './EntityVariableValue.interface';

export interface ExternalExpandedEntityFilter extends EntityVariableValue {
    isFilteringExternalKey: boolean;
    externalEntityFilter: EntityVariableValue[];
    isComparingEntities: boolean;
}
