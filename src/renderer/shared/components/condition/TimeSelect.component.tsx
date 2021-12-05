import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Condition, TimeSelector } from 'renderer/shared/models/base/Condition.model';
import { DateTimePicker, DesktopDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { DATE_FORMAT, DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';
import { getTime } from 'date-fns';

interface IProps {
    condition: Condition;
    onChange: (value: number, returnData?: any) => void;
    timePicker?: boolean;
}

export function TimeSelect({ condition, onChange, timePicker }: IProps) {
    const { t } = useTranslation();

    const onValueSelected = (date: Date | null, keyboardInputValue?: string | undefined) => {
        console.log(date);
        console.log(keyboardInputValue);
        // if (!value) {
        //     return;
        // }

        // onChange(value.getTime());
        // setAnchorEl(null);

        const date2 = new Date(1253, 3, 15);
        console.log(date2.getTime());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {timePicker ? (
                <DateTimePicker
                    label={t('interface.editor.condition.time_datepicker_label')}
                    inputFormat={DATE_FORMAT}
                    value={new Date()}
                    mask="__/__/____ __:__"
                    onChange={onValueSelected}
                    renderInput={(params) => <TextField {...params} />}
                />
            ) : (
                <DesktopDatePicker
                    label={t('interface.editor.condition.time_datepicker_label')}
                    mask="__/__/____"
                    inputFormat={DATE_ONLY_DAY_FORMAT}
                    value={new Date()}
                    onChange={onValueSelected}
                    renderInput={(params) => <TextField {...params} />}
                />
            )}
        </LocalizationProvider>
    );
}
