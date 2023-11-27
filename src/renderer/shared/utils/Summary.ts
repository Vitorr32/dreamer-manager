import { t } from 'i18next';
import { EntityVariable } from '../models/base/Variable.model';
import { VariableOperator } from '../models/enums/VariableOperator';
import { EntityVariableValue } from '../models/interfaces/EntityVariableValue.interface';
import { GetVariablesOfEntity } from './EntityHelpers';
import { Modifier } from '../models/base/Modifier.model';

interface EVVSummaryObject {
    target: string;
    variable: EntityVariable;
    operator: string;
    value: string;
    external: EVVSummaryObject[];
}

export const SummarizeEntityVariableValueObject = (evv: EntityVariableValue): EVVSummaryObject => {
    const target = evv.specifiedDynamicEntity ? t(evv.specifiedDynamicEntity) : t(evv.entityType);
    const variable = evv.entityType && evv.variableKey ? GetVariablesOfEntity(evv.entityType)[evv.variableKey] : null;
    const operator = evv.operator ? t(evv.operator) : 'NO_OPERATOR';
    const value = evv.value ? evv.value : 'NO_VALUE';
    const externalEntitiesSummaryObjects = evv.externalEntityFilter.map((eeeFilter) => SummarizeEntityVariableValueObject(eeeFilter));
    return { target, variable, operator, value, external: externalEntitiesSummaryObjects };
};

// Summarize the EVV object into a single string representation, note that this include both filter and edit operations.
export const SummarizeEntityVariableValueToStringLine = (variable: EntityVariable, operator: VariableOperator, value: any): string => {
    const variableName = t(variable.displayName);

    switch (operator) {
        // Filter Operators
        case VariableOperator.EQUALS_TO:
            return t('summary.evv.equals_to', { variable: variableName, value });
        case VariableOperator.NOT_EQUALS_TO:
            return t('summary.evv.not_equals_to', { variable: variableName, value });
        case VariableOperator.GREATER_THAN:
            return t('summary.evv.greater_than', { variable: variableName, value });
        case VariableOperator.EQUAL_OR_GREATER_THAN:
            return t('summary.evv.equal_or_greater_than', { variable: variableName, value });
        case VariableOperator.LESSER_THAN:
            return t('summary.evv.less_than', { variable: variableName, value });
        case VariableOperator.EQUAL_OR_LESSER_THAN:
            return t('summary.evv.equal_or_lesser_than', { variable: variableName, value });
        case VariableOperator.CONTAINS:
            return t('summary.evv.contains', { variable: variableName, value });
        case VariableOperator.NOT_CONTAINS:
            return t('summary.evv.not_contains', { variable: variableName, value });
        case VariableOperator.IS_EMPTY:
            return t('summary.evv.empty', { variable: variableName });
        case VariableOperator.IS_NOT_EMPTY:
            return t('summary.evv.empty', { variable: variableName });

        // Edit Operators
        case VariableOperator.CHANGE_BY:
            return t('summary.evv.change_by', { variable: variableName, value });
        case VariableOperator.CHANGE_TO:
            return t('summary.evv.change_to', { variable: variableName, value });
        case VariableOperator.REMOVE_FROM_ARRAY:
            return t('summary.evv.remove_from_array', { variable: variableName, value });
        case VariableOperator.INSERT_INTO_ARRAY:
            return t('summary.evv.add_to_array', { variable: variableName, value });
        default:
            return '';
    }
};

export const SummarizeModifierChange = (modifier: Modifier): string => {
    if (!modifier || !modifier.modifiedEntityVariables || !modifier.modifiedEntityVariables.operator) {
        return '';
    }

    const { variable, value } = SummarizeEntityVariableValueObject(modifier.modifiedEntityVariables);
    return SummarizeEntityVariableValueToStringLine(variable, modifier.modifiedEntityVariables.operator, value);
};
