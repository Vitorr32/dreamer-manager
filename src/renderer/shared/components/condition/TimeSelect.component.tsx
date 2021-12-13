import { useTranslation } from 'react-i18next';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Condition } from 'renderer/shared/models/base/Condition.model';
import { DateTimePicker, DesktopDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { DATE_FORMAT, DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';
import { isValid } from 'date-fns';

interface IProps {
    condition: Condition;
    onChange: (value: number) => void;
    timePicker?: boolean;
}

export function TimeSelect({ condition, onChange, timePicker }: IProps) {
    const { t } = useTranslation();

    const onValueSelected = (date: Date | null) => {
        if (!date || !isValid(date)) {
            return;
        }

        onChange(date.getTime());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {!timePicker ? (
                <DateTimePicker
                    label={t('interface.editor.condition.time_datepicker_label')}
                    inputFormat={DATE_FORMAT}
                    value={condition.parameters[0] || new Date()}
                    mask="__/__/____ __:00"
                    onChange={onValueSelected}
                    renderInput={(params) => <TextField {...params} />}
                />
            ) : (
                <DesktopDatePicker
                    label={t('interface.editor.condition.time_datepicker_label')}
                    mask="__/__/____"
                    onError={(reason) => console.log(reason)}
                    inputFormat={DATE_ONLY_DAY_FORMAT}
                    value={condition.parameters[0] || new Date()}
                    onChange={onValueSelected}
                    renderInput={(params) => <TextField {...params} />}
                />
            )}
        </LocalizationProvider>
    );
}
