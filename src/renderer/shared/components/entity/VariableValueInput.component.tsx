import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { VariableType } from 'renderer/shared/models/enums/VariableType';

interface IProps {
    variable: EntityVariable;
    variableValue: any;
    onVariableValueChange: (value: any) => void;
}

export function VariableValueInput({ variable, variableValue, onVariableValueChange }: IProps) {
    const { t } = useTranslation();

    const getInputOfVariableType = (type: VariableType): JSX.Element | null => {
        switch (type) {
            case VariableType.ENUMERATOR:
                return (
                    <FormControl fullWidth>
                        <InputLabel>{t('interface.editor.modifier.input_label_value_change')}</InputLabel>
                        <Select value={variableValue} label={t('interface.editor.modifier.input_label_value_change')} onChange={(e) => onVariableValueChange(e.target.value)}>
                            {variable.options.map((option, index) => (
                                <MenuItem key={`entity_var_${index}`} value={option}>
                                    {t(option)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case VariableType.PERCENTAGE_OR_MULTIPLIER:
            case VariableType.NUMBER:
                return (
                    <TextField
                        value={variableValue}
                        label={t('interface.editor.modifier.input_label_value_change')}
                        type="number"
                        onChange={(e) => onVariableValueChange(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                );
            case VariableType.TEXT:
                return (
                    <TextField value={variableValue} label={t('interface.editor.modifier.input_label_value_change')} onChange={(e) => onVariableValueChange(e.target.value)} />
                );
            case VariableType.DATE:
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label={t('interface.editor.condition.time_datepicker_label')}
                            mask="__/__/____"
                            minDate={new Date(1560, 0, 0)}
                            maxDate={new Date(1700, 12, 30)}
                            inputFormat={t('interface.utils.date_format')}
                            value={variableValue || new Date(1560, 0, 1)}
                            onChange={(e: any) => onVariableValueChange(e.toISOString())}
                            renderInput={(params: any) => <TextField required {...params} />}
                        />
                    </LocalizationProvider>
                );
            default:
                return null;
        }
    };

    return getInputOfVariableType(variable.type);
}
