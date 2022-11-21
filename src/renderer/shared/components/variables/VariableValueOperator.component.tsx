import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable, VariableOperator, VariableType } from 'renderer/shared/models/base/Variable.model';

interface IProps {
    variable: EntityVariable;
    variableOperator: any;
    onOperatorChange: (value: any) => void;
    editOperator?: boolean;
}

export function VariableValueOperator({ variable, variableOperator, onOperatorChange, editOperator = false }: IProps) {
    const { t } = useTranslation();

    const getOperatorsOfVariableType = (type: VariableType): VariableOperator[] => {
        switch (type) {
            case VariableType.BOOLEAN:
            case VariableType.FILE_PATH:
            case VariableType.ENUMERATOR:
            case VariableType.EXTERNAL_KEY:
                return editOperator ? [VariableOperator.CHANGE_TO] : [VariableOperator.EQUALS_TO, VariableOperator.NOT_EQUALS_TO];
            case VariableType.ENUMERATOR_LIST:
            case VariableType.EXTERNAL_KEY_LIST:
                return editOperator ? [VariableOperator.INSERT_INTO_ARRAY, VariableOperator.REMOVE_FROM_ARRAY] : [VariableOperator.CONTAINS, VariableOperator.DONT_CONTAINS];
            case VariableType.TEXT:
                return editOperator
                    ? [VariableOperator.CHANGE_TO]
                    : [VariableOperator.STARTS_WITH, VariableOperator.EQUALS_TO, VariableOperator.NOT_EQUALS_TO, VariableOperator.CONTAINS, VariableOperator.DONT_CONTAINS];
            case VariableType.PERCENTAGE_OR_MULTIPLIER:
            case VariableType.NUMBER:
            case VariableType.DATE:
                return editOperator
                    ? [VariableOperator.CHANGE_TO, VariableOperator.CHANGE_BY]
                    : [
                          VariableOperator.EQUALS_TO,
                          VariableOperator.NOT_EQUALS_TO,
                          VariableOperator.BIGGER_THAN,
                          VariableOperator.EQUAL_OR_BIGGER_THAN,
                          VariableOperator.SMALLER_THAN,
                          VariableOperator.EQUAL_OR_SMALLER_THAN,
                      ];
        }
    };

    const verifyVariablePossibleOperators = (type: VariableType): boolean => {
        const variableOperators = getOperatorsOfVariableType(variable.type);
        if (variableOperators.length === 0) {
            return false;
        } else if (variableOperators.length === 1) {
            onOperatorChange(variableOperators[0]);
            return false;
        }

        return true;
    };

    const onSelectChange = (event: SelectChangeEvent<any>): void => {
        console.log('On Select Change', event);
        onOperatorChange(event.target.value);
    };

    return (
        verifyVariablePossibleOperators(variable.type) && (
            <FormControl fullWidth>
                <InputLabel>{t('interface.editor.entity.input_label_operator')}</InputLabel>
                <Select value={variableOperator || ''} label={t('interface.editor.entity.input_label_operator')} onChange={onSelectChange}>
                    {getOperatorsOfVariableType(variable.type).map((option, index) => (
                        <MenuItem key={`entity_var_${index}`} value={option}>
                            {t(option, { variable: t(variable.displayName) })}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    );
}
