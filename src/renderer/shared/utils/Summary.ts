import { t } from 'i18next';
import { EntityVariable } from '../models/base/Variable.model';
import { VariableOperator } from '../models/enums/VariableOperator';
import { VariableType } from '../models/enums/VariableType';
import { EntityVariableValue } from '../models/interfaces/EntityVariableValue.interface';
import { GetVariablesOfEntity } from './EntityHelpers';

export const SummarizeEntityVariableValueObject = (evv: EntityVariableValue): { target: string; variable: EntityVariable; operator: string; value: string } => {
    const target = evv.specifiedDynamicEntity ? t(evv.specifiedDynamicEntity) : t(evv.entityType);
    const variable = evv.entityType && evv.variableKey ? GetVariablesOfEntity(evv.entityType)[evv.variableKey] : null;
    const operator = evv.operator ? t(evv.operator) : 'NO_OPERATOR';
    const value = evv.value ? evv.value : 'NO_VALUE';
    return { target, variable, operator, value };
};

// Summarize the EVV object into a single string representation, note that this include both filter and edit operations.
export const SummarizeEntityVariableValueToStringLine = (target: string, variable: EntityVariable, operator: VariableOperator, value: any, origin?: string): string => {
    switch (operator) {
        case VariableOperator.EQUALS_TO:
            return t('summary.modifier.equals_to', { target, variableName: variable.displayName, value1: value });
        default:
            return '';
    }
};
