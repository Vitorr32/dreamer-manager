import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Period } from 'renderer/shared/models/enums/Period.enum';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    effectPeriod: Period;
    effectPeriodValue: any;
    effectSource: { id: string; type: EntityType };
    onPeriodChange: (period: Period) => any;
    onPeriodValueChange: (value: any) => any;
}

export function EffectPeriodSelection({ effectPeriod, effectPeriodValue, effectSource, onPeriodChange, onPeriodValueChange }: IProps) {
    const { t, i18n } = useTranslation();
    const [fromToDates, setFromToDates] = useState<string[]>(['', '']);

    useEffect(() => {
        setFromToDates(effectPeriodValue);
    }, [effectPeriod, effectPeriodValue]);

    return (
        <Box sx={{ display: 'flex', columnGap: '20px', alignItems: 'flex-start' }}>
            <FormControl variant="filled" sx={{ flex: 1 }}>
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
                <FormControl required>
                    <DesktopDatePicker
                        label={t('interface.editor.effect.input_label_end_date')}
                        minDate={new Date(1560, 0, 0)}
                        maxDate={new Date(1700, 12, 30)}
                        value={effectPeriodValue || new Date(1560, 0, 1)}
                        onChange={(e: any) => onPeriodValueChange(e.toISOString())}
                    />
                </FormControl>
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

            {effectPeriod === Period.SPECIFIC_DATE_FROM_TO && fromToDates && (
                <>
                    <FormControl required>
                        <DesktopDatePicker
                            label={t('interface.editor.effect.input_label_start_date')}
                            minDate={new Date(1560, 0, 0)}
                            maxDate={fromToDates[1] ? new Date(fromToDates[1]) : new Date(1700, 12, 30)}
                            value={fromToDates[0] ? new Date(fromToDates[0]) : new Date(1560, 0, 1)}
                            onChange={(e: any) => onPeriodValueChange([e.toISOString(), fromToDates[1]])}
                        />
                    </FormControl>

                    <FormControl required>
                        <DesktopDatePicker
                            label={t('interface.editor.effect.input_label_end_date')}
                            minDate={fromToDates[0] ? new Date(fromToDates[0]) : new Date(1560, 0, 0)}
                            maxDate={new Date(1700, 12, 30)}
                            value={fromToDates[1] ? new Date(fromToDates[1]) : new Date(1700, 12, 30)}
                            onChange={(e: any) => onPeriodValueChange([fromToDates[0], e.toISOString()])}
                        />
                    </FormControl>
                </>
            )}
        </Box>
    );
}
