import { v4 as uuidv4 } from 'uuid';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { VariableOperator } from 'renderer/shared/models/enums/VariableOperator';
import { VariableType } from 'renderer/shared/models/enums/VariableType';

interface IProps {
    variable: EntityVariable;
    variableOperator?: VariableOperator;
    onOperatorChange: (value: VariableOperator) => void;
    isEditor?: boolean;
}

export function VariableValueOperator({ variable, variableOperator, onOperatorChange, isEditor = false }: IProps) {
    const { t } = useTranslation();

    const getOperatorsOfVariableType = (type: VariableType): VariableOperator[] => {
        switch (type) {
            case VariableType.BOOLEAN:
            case VariableType.FILE_PATH:
            case VariableType.ENUMERATOR:
            case VariableType.EXTERNAL_KEY:
                return isEditor ? [VariableOperator.CHANGE_TO] : [VariableOperator.EQUALS_TO, VariableOperator.NOT_EQUALS_TO];
            case VariableType.ENUMERATOR_LIST:
            case VariableType.EXTERNAL_KEY_LIST:
                return isEditor ? [VariableOperator.INSERT_INTO_ARRAY, VariableOperator.REMOVE_FROM_ARRAY] : [VariableOperator.CONTAINS, VariableOperator.DONT_CONTAINS];
            case VariableType.TEXT:
                return isEditor
                    ? [VariableOperator.CHANGE_TO]
                    : [VariableOperator.STARTS_WITH, VariableOperator.EQUALS_TO, VariableOperator.NOT_EQUALS_TO, VariableOperator.CONTAINS, VariableOperator.DONT_CONTAINS];
            case VariableType.PERCENTAGE_OR_MULTIPLIER:
            case VariableType.NUMBER:
            case VariableType.DATE:
                return isEditor
                    ? [VariableOperator.CHANGE_TO, VariableOperator.CHANGE_BY]
                    : [
                          VariableOperator.EQUALS_TO,
                          VariableOperator.NOT_EQUALS_TO,
                          VariableOperator.BIGGER_THAN,
                          VariableOperator.EQUAL_OR_BIGGER_THAN,
                          VariableOperator.LESS_THAN,
                          VariableOperator.EQUAL_OR_LESS_THAN,
                      ];
            default:
                return [];
        }
    };

    const verifyVariablePossibleOperators = (type: VariableType): boolean => {
        const variableOperators = getOperatorsOfVariableType(type);
        if (variableOperators.length === 0) {
            return false;
        }
        if (variableOperators.length === 1 && variableOperator !== variableOperators[0]) {
            setTimeout(() => onOperatorChange(variableOperators[0]));
            return false;
        }
        if (variableOperators.length === 1 && variableOperator === variableOperators[0]) {
            return false;
        }

        return true;
    };

    return verifyVariablePossibleOperators(variable.type) ? (
        <FormControl fullWidth sx={{ minWidth: '300px' }}>
            <InputLabel>{t('interface.editor.entity.input_label_operator')}</InputLabel>
            <Select
                value={variableOperator || ''}
                label={t('interface.editor.entity.input_label_operator')}
                onChange={(e) => onOperatorChange(e.target.value as VariableOperator)}
            >
                {getOperatorsOfVariableType(variable.type).map((option) => (
                    <MenuItem key={`entity_var_${uuidv4()}`} value={option}>
                        {t(option, { variable: t(variable.displayName) })}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    ) : (
        <TextField
            sx={{ minWidth: '300px' }}
            label={t('interface.editor.entity.input_label_operator')}
            value={t(variableOperator, { variable: t(variable.displayName) }) || ''}
            disabled
            variant="outlined"
        />
    );
}
