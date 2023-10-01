import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { VariableOperator } from 'renderer/shared/models/enums/VariableOperator';
import { VariableType } from 'renderer/shared/models/enums/VariableType';

interface IProps {
    variable: EntityVariable;
    variableOperator: any;
    onOperatorChange: (value: any) => void;
}

export function VariableValueOperator({ variable, variableOperator, onOperatorChange }: IProps) {
    const { t } = useTranslation();

    const getOperatorsOfVariableType = (type: VariableType): VariableOperator[] => {
        switch (type) {
            case VariableType.ENUMERATOR:
            case VariableType.PERCENTAGE_OR_MULTIPLIER:
            case VariableType.NUMBER:
            case VariableType.TEXT:
            case VariableType.DATE:
            default:
                return [];
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel>{t('interface.editor.modifier.input_label_value_change')}</InputLabel>
            <Select value={variableOperator} label={t('interface.editor.modifier.input_label_value_change')} onChange={(e) => onOperatorChange(e.target.value)}>
                {getOperatorsOfVariableType(variable.type).map((option, index) => (
                    <MenuItem key={`entity_var_${uuidv}`} value={option}>
                        {t(option)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
