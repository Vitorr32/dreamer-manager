import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';
import { EntityVariable, VariableType } from 'renderer/shared/models/base/Variable.model';

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
                            onError={(reason) => console.error('*** VariableValueInput Error on Datepicker: ', reason)}
                            inputFormat={DATE_ONLY_DAY_FORMAT}
                            value={new Date(variableValue || '01/01/0001')}
                            onChange={(e) => onVariableValueChange(e.toDateString())}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                );
            default:
                return null;
        }
    };

    return getInputOfVariableType(variable.type);
}
