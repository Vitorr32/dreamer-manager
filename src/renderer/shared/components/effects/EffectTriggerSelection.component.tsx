import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Trigger } from 'renderer/shared/models/base/Effect.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    effectTrigger: Trigger;
    effectSource: { id: string; type: EntityType };
    onTriggerChange: (trigger: Trigger) => any;
}

export function EffectTriggerSelection({ effectTrigger, effectSource, onTriggerChange }: IProps) {
    const { t, i18n } = useTranslation();

    return (
        <FormControl variant="filled">
            <InputLabel>{t('interface.editor.effect.input_label_trigger')}</InputLabel>
            <Select value={effectTrigger || ''} onChange={(event) => onTriggerChange(event.target.value as Trigger)}>
                <MenuItem disabled value="">
                    {t('interface.editor.effect.input_placeholder_trigger')}
                </MenuItem>

                {Object.values(Trigger).map((enumValue) => (
                    <MenuItem key={enumValue} value={enumValue}>
                        {t(enumValue)}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{t('interface.editor.effect.input_helper_trigger')}</FormHelperText>
        </FormControl>
    );
}
