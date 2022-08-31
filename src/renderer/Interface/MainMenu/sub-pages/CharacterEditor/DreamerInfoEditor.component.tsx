import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Slider, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DreamerAttributeViewer } from 'renderer/shared/components/character/DreamerAttributeViewer.component';
import { MAXIMUM_DREAMER_POTENTIAL } from 'renderer/shared/Constants';
import { CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { Dreamer, DreamerVariablesKey, FamilySituation } from 'renderer/shared/models/base/Dreamer.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

interface IProps {
    dreamer: Dreamer;
    onChange: (key: CharacterVariablesKey | DreamerVariablesKey, value: any) => void;
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

    const onAttributeChange = (attributeKey: CharacterVariablesKey | DreamerVariablesKey, value: any) => {
        const modifiedDreamer: Dreamer = CopyClassInstance(dreamer);
        const roundedValue = Math.min(20, Math.max(0, value));
        modifiedDreamer[attributeKey] = roundedValue;

        onChange(attributeKey, roundedValue);
    };

    const isAttributeOverTheCap = (): boolean => {
        return dreamer.getCurrentAbility() > dreamer.abilityPotential;
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

            <TextField
                label={t('interface.editor.character.input_label_weight')}
                helperText={t('interface.editor.character.input_helper_weight')}
                sx={{ marginTop: '20px' }}
                value={dreamer.weight}
                InputProps={{
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
            />

            <TextField
                label={t('interface.editor.character.input_label_fat')}
                helperText={t('interface.editor.character.input_helper_fat')}
                sx={{ marginTop: '20px' }}
                value={dreamer.fatPercentage}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />

            <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                <Typography variant="h5">{t('interface.editor.dreamer.input_label_potential')}</Typography>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_potential')}</FormHelperText>
                <Slider
                    min={50}
                    max={200}
                    sx={{ width: '400px' }}
                    valueLabelDisplay="auto"
                    value={dreamer.abilityPotential}
                    onChange={(ev: any) => onChange(DreamerVariablesKey.ABILITY_POTENTIAL, ev.target.value)}
                />
                <Typography sx={{ color: 'text.primary' }} variant="caption">
                    {getPotentialLabel(dreamer.abilityPotential)}
                </Typography>
            </Stack>

            <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="h5">
                    {t('interface.editor.dreamer.potential_to_distribute', { ability: Math.max(dreamer.abilityPotential - dreamer.getCurrentAbility(), 0) })}
                    {isAttributeOverTheCap() && (
                        <Tooltip title={t('interface.editor.dreamer.potential_fully_distributed')}>
                            <ErrorIcon sx={{ marginLeft: '5px' }} />
                        </Tooltip>
                    )}
                </Typography>
                <FormHelperText>{t('interface.editor.dreamer.potential_to_distribute_helper')}</FormHelperText>
                <DreamerAttributeViewer dreamer={dreamer} editable hasError={isAttributeOverTheCap()} onChange={onAttributeChange} />
            </Stack>
        </Box>
    );
}
