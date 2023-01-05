import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import { Period, Source } from 'renderer/shared/models/base/Effect.model';

interface IProps {
    effectPeriod: Period;
    effectPeriodValue: string;
    effectSource: Source;
    onPeriodChange: (period: Period) => any;
    onPeriodValueChange: (value: string) => any;
}

export function EffectPeriodSelection({ effectPeriod, effectPeriodValue, effectSource, onPeriodChange, onPeriodValueChange }: IProps) {
    const { t, i18n } = useTranslation();

    return (
        <>
            <FormControl variant="filled">
                <InputLabel>{t('interface.editor.effect.input_label_period')}</InputLabel>
                <Select value={effectPeriod || ''} onChange={(event) => onPeriodChange(event.target.value as Period)}>
                    <MenuItem disabled value="">
                        {t('interface.editor.effect.input_placeholder_period')}
                    </MenuItem>

                    {Object.values(Period).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.effect.input_helper_period')}</FormHelperText>
            </FormControl>

            {effectPeriod === Period.SPECIFIC_DATE && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <FormControl required sx={{ marginTop: '20px' }}>
                        <DesktopDatePicker
                            label={t('interface.editor.effect.input_label_end_date')}
                            mask="__/__/____"
                            minDate={new Date(1560, 0, 0)}
                            maxDate={new Date(1700, 12, 30)}
                            inputFormat={t('interface.utils.date_format')}
                            value={effectPeriodValue || new Date(1560, 0, 1)}
                            onChange={(e: any) => onPeriodValueChange(e.toDateString())}
                            renderInput={(params: any) => <TextField required {...params} />}
                        />
                    </FormControl>
                </LocalizationProvider>
            )}

            {effectPeriod === Period.SPECIFIC_PERIOD && (
                <TextField
                    label={t('interface.editor.effect.input_label_active_period')}
                    placeholder={t('interface.editor.effect.input_placeholder_active_period')}
                    value={effectPeriodValue}
                    onChange={(ev) => onPeriodValueChange(ev.target.value)}
                    variant="outlined"
                />
            )}
        </>
    );
}
