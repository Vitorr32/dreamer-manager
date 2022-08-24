import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Slider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DreamerAttributeViewer } from 'renderer/shared/components/character/DreamerAttributeViewer.component';
import { Dreamer, DreamerVariablesKey, FamilySituation } from 'renderer/shared/models/base/Dreamer.model';

interface IProps {
    dreamer: Dreamer;
    onChange: (key: DreamerVariablesKey, value: any) => void;
    onNextStep: () => void;
    onPreviousStep: () => void;
}

export function DreamerInfoEditor({ dreamer, onChange }: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();

    const getPotentialLabel = (potential: number): string => {
        if (potential >= 190) {
            return t('interface.editor.dreamer.potential_ultimate');
        } else if (potential >= 170) {
            return t('interface.editor.dreamer.potential_very_high');
        } else if (potential >= 140) {
            return t('interface.editor.dreamer.potential_high');
        } else if (potential >= 120) {
            return t('interface.editor.dreamer.potential_medium');
        } else if (potential >= 100) {
            return t('interface.editor.dreamer.potential_below_average');
        } else if (potential >= 80) {
            return t('interface.editor.dreamer.potential_weak');
        }
        return t('interface.editor.dreamer.potential_very_weak');
    };

    return (
        <Box className="dreamer-editor" sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl>
                <InputLabel>{t('interface.editor.dreamer.input_label_family')}</InputLabel>
                <Select
                    value={dreamer.familySituation || ''}
                    label={t('interface.editor.dreamer.input_label_family')}
                    onChange={(ev) => onChange(DreamerVariablesKey.FAMILY_SITUATION, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.dreamer.input_placeholder_family')}
                    </MenuItem>
                    {Object.values(FamilySituation).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_family')}</FormHelperText>
            </FormControl>

            <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                <Typography variant="h5">{t('interface.editor.dreamer.input_label_potential')}</Typography>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_potential')}</FormHelperText>
                <Slider
                    min={50}
                    max={200}
                    sx={{ width: '400px' }}
                    valueLabelDisplay="auto"
                    value={dreamer.abilityPotential || 50}
                    onChange={(ev: any) => onChange(DreamerVariablesKey.ABILITY_POTENTIAL, ev.target.value)}
                />
                <Typography variant="caption">{getPotentialLabel(dreamer.abilityPotential)}</Typography>
            </Stack>

            <DreamerAttributeViewer dreamer={dreamer} />
        </Box>
    );
}