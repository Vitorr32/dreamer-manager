import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable, VariableOperator, VariableType } from 'renderer/shared/models/base/Variable.model';

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
                return Object.values(VariableOperator).map((operator) => operator);
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel>{t('interface.editor.entity.input_label_operator')}</InputLabel>
            <Select value={variableOperator} label={t('model.entity.filter.input_label_operator')} onChange={(e) => onOperatorChange(e.target.value)}>
                {getOperatorsOfVariableType(variable.type).map((option, index) => (
                    <MenuItem key={`entity_var_${index}`} value={option}>
                        {t(option)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
