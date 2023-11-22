import { EntityVariableValue } from './EntityVariableValue.interface';

export interface ExternalExpandedEntityFilter extends EntityVariableValue {
    isFilteringExternalKey: boolean;
    isComparingToExternalEntity: boolean;
    externalEntityFilter: EntityVariableValue[];
}
