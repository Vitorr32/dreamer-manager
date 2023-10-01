import { Box, Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Slider, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DreamerAttributeViewer } from 'renderer/shared/components/character/DreamerAttributeViewer.component';
import { MAXIMUM_DREAMER_POTENTIAL, MINIMUM_DREAMER_POTENTIAL } from 'renderer/shared/Constants';
import { BodyType, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { CareerObjective, CareerPath, Dreamer, DreamerVariablesKey, FamilySituation } from 'renderer/shared/models/base/Dreamer.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

interface IProps {
    dreamer: Dreamer;
    onChange: (key: CharacterVariablesKey | DreamerVariablesKey, value: any, isNumberInput?: boolean) => void;
    onNextStep: () => void;
    onPreviousStep: () => void;
}

export function DreamerInfoEditor({ dreamer, onChange, onNextStep, onPreviousStep }: IProps) {
    const params = useParams();

    const { t, i18n } = useTranslation();

    const percentOfMaximumPotential = (toCompare: number): number => {
        return ((toCompare - MINIMUM_DREAMER_POTENTIAL) / (MAXIMUM_DREAMER_POTENTIAL - MINIMUM_DREAMER_POTENTIAL)) * 100;
    };

    const getPotentialLabel = (potential: number): string => {
        if (percentOfMaximumPotential(potential) >= 90) {
            return t('interface.editor.dreamer.potential_ultimate');
        } if (percentOfMaximumPotential(potential) >= 80) {
            return t('interface.editor.dreamer.potential_very_high');
        } if (percentOfMaximumPotential(potential) >= 65) {
            return t('interface.editor.dreamer.potential_high');
        } if (percentOfMaximumPotential(potential) >= 50) {
            return t('interface.editor.dreamer.potential_medium');
        } if (percentOfMaximumPotential(potential) >= 35) {
            return t('interface.editor.dreamer.potential_below_average');
        } if (percentOfMaximumPotential(potential) >= 20) {
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

    const getBodyTypeLabel = (): string => {
        const bodyType = dreamer.calculateBodyType();
        return t(bodyType === BodyType.UNDEFINED ? 'interface.editor.dreamer.body_type_error' : bodyType);
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

            <FormControl>
                <InputLabel>{t('interface.editor.dreamer.input_label_objective')}</InputLabel>
                <Select
                    value={dreamer.dreamerObjective || ''}
                    label={t('interface.editor.dreamer.input_label_objective')}
                    onChange={(ev) => onChange(DreamerVariablesKey.DREAMER_OBJECTIVE, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.dreamer.input_placeholder_objective')}
                    </MenuItem>
                    {Object.values(CareerObjective).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_objective')}</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel>{t('interface.editor.dreamer.input_label_preferred_jobs')}</InputLabel>
                <Select
                    value={dreamer.preferredCareerPath || []}
                    multiple
                    label={t('interface.editor.dreamer.input_label_preferred_jobs')}
                    onChange={(ev) => onChange(DreamerVariablesKey.PREFERRED_PATH, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.dreamer.input_placeholder_jobs')}
                    </MenuItem>
                    {Object.values(CareerPath).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>{t('interface.editor.dreamer.input_label_disliked_jobs')}</InputLabel>
                <Select
                    value={dreamer.dislikedCareerPath || []}
                    multiple
                    label={t('interface.editor.dreamer.input_label_disliked_jobs')}
                    onChange={(ev) => onChange(DreamerVariablesKey.DISLIKED_PATH, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.dreamer.input_placeholder_jobs')}
                    </MenuItem>
                    {Object.values(CareerPath).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_jobs')}</FormHelperText>
            </FormControl>

            <TextField
                label={t('interface.editor.character.input_label_weight')}
                helperText={t('interface.editor.character.input_helper_weight')}
                sx={{ marginTop: '20px' }}
                value={dreamer.weight}
                onChange={(ev: any) => onChange(DreamerVariablesKey.WEIGHT, ev.target.value, true)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
            />

            <TextField
                label={t('interface.editor.character.input_label_fat')}
                helperText={t('interface.editor.character.input_helper_fat')}
                sx={{ marginTop: '20px' }}
                value={dreamer.fatPercentage}
                onChange={(ev: any) => onChange(DreamerVariablesKey.FAT_PERCENTAGE, ev.target.value, true)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />

            <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="body2">
                {`${t('interface.editor.dreamer.body_type_label')  } ${getBodyTypeLabel()}`}
            </Typography>

            <Stack spacing={2} direction="column" sx={{ marginTop: '20px' }} alignItems="center">
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="h5">
                    {t('interface.editor.dreamer.input_label_potential')}
                </Typography>
                <Slider
                    min={MINIMUM_DREAMER_POTENTIAL}
                    max={MAXIMUM_DREAMER_POTENTIAL}
                    sx={{ width: '400px' }}
                    valueLabelDisplay="auto"
                    value={dreamer.abilityPotential}
                    onChange={(ev: any) => onChange(DreamerVariablesKey.ABILITY_POTENTIAL, ev.target.value)}
                />
                <Typography sx={{ color: 'text.primary' }} variant="caption">
                    {getPotentialLabel(dreamer.abilityPotential)}
                </Typography>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_potential')}</FormHelperText>
            </Stack>

            <Stack spacing={2} direction="column" sx={{ marginTop: '20px' }} alignItems="center">
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="h5">
                    {t('interface.editor.dreamer.potential_to_distribute', { ability: Math.max(dreamer.abilityPotential - dreamer.getCurrentAbility(), 0) })}
                    {isAttributeOverTheCap() && (
                        <Tooltip title={t('interface.editor.dreamer.potential_fully_distributed')}>
                            <ErrorIcon sx={{ marginLeft: '5px' }} />
                        </Tooltip>
                    )}
                </Typography>
                <DreamerAttributeViewer dreamer={dreamer} editable hasError={isAttributeOverTheCap()} onChange={onAttributeChange} />
                <FormHelperText>{t('interface.editor.dreamer.potential_to_distribute_helper')}</FormHelperText>
            </Stack>

            <Stack spacing={2} direction="row" justifyContent="end" sx={{ marginTop: '20px' }}>
                <Button variant="contained" onClick={onPreviousStep}>
                    {t('interface.commons.previous')}
                </Button>

                <Button variant="contained" disabled={isAttributeOverTheCap()} onClick={onNextStep}>
                    {t('interface.commons.next')}
                </Button>
            </Stack>
        </Box>
    );
}
