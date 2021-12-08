import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Condition, TimeSelector } from 'renderer/shared/models/base/Condition.model';
// import { DateTimePicker, DesktopDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { DATE_FORMAT, DATE_ONLY_DAY_FORMAT, END_DATE, MIN_DATE, START_DATE } from 'renderer/shared/Constants';
import { getTime, isValid } from 'date-fns';
import { getDateLocale } from 'renderer/shared/utils/Localization';
import { DateTimePicker } from 'react-rainbow-components';

interface IProps {
    condition: Condition;
    onChange: (value: number) => void;
    timePicker?: boolean;
}

export function TimeSelect({ condition, onChange, timePicker }: IProps) {
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const onValueSelected = (date: Date) => {
        console.log(date);
        console.log(isValid(date));

        if (!date || !isValid(date)) {
            return;
        }

        onChange(date.getTime());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                value={condition.parameters?.[0] ? new Date(condition.parameters[0]) : START_DATE}
                label={t('interface.editor.condition.time_datepicker_label')}
                minDate={MIN_DATE}
                maxDate={END_DATE}
                onChange={onValueSelected}
                hour24
                locale={i18n.language.replace('_', '-')}
            />
            {/* {timePicker ? (
                <DateTimePicker
                    label={t('interface.editor.condition.time_datepicker_label')}
                    inputFormat={DATE_FORMAT}
                    value={condition.parameters[0] || START_DATE}
                    mask="__/__/____ __:00"
                    onChange={onValueSelected}
                    maxDate={END_DATE}
                    renderInput={(params) => <TextField placeholder="DD/MM/YYYY HH:00" {...params} />}
                />
            ) : (
                <DesktopDatePicker
                    label={t('interface.editor.condition.time_datepicker_label')}
                    mask="__/__/____"
                    onError={(reason) => console.log(reason)}
                    inputFormat={DATE_ONLY_DAY_FORMAT}
                    value={condition.parameters[0] || START_DATE}
                    onChange={onValueSelected}
                    minDate={undefined}
                    maxDate={END_DATE}
                    renderInput={(params) => <TextField {...params} />}
                />
            )} */}
        </LocalizationProvider>
    );
}
