import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel, Switch, Button, OutlinedInput, FormHelperText, Typography } from '@mui/material';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { MAX_NUMBER_OF_TRAITS_GENERATED } from 'renderer/shared/Constants';

interface IProps {
    nextStep: () => void;
    trait: Trait;
    onChange: (trait: Trait) => void;
}

export function BasicInfoForm({ nextStep, trait, onChange }: IProps) {
    const { t } = useTranslation();

    const [name, setName] = useState(trait.name);
    const [description, setDescription] = useState(trait.description);
    const [traitType, setTraitType] = useState(trait.type);
    const [spawnable, setSpawnable] = useState(trait.spawnable);

    function onSubmit(): void {
        const newTrait = Object.assign({}, trait);

        (newTrait.name = name), (newTrait.description = description);
        newTrait.type = traitType;
        newTrait.spawnable = spawnable;

        onChange(newTrait);
        nextStep();
    }

    return (
        <Box component="form" onSubmit={onSubmit} className="basic-info">
            <Box className="basic-info__header">
                <Typography variant="h5">Basic Information</Typography>
            </Box>

            <TextField required label={t('interface.editor.trait.name_label')} helperText={t('interface.editor.trait.name_helper')} variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />

            <TextField
                required
                label={t('interface.editor.trait.description_label')}
                helperText={t('interface.editor.trait.description_helper')}
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />

            <TextField
                required
                label={t('interface.editor.trait.type_label')}
                helperText={t('interface.editor.trait.type_helper')}
                variant="outlined"
                select
                value={traitType}
                onChange={(event) => setTraitType(event.target.value as TraitType)}
            >
                {Object.values(TraitType).map((value) => {
                    if (value === TraitType.UNDEFINED) {
                        return (
                            <MenuItem key={`type_${value}`} value={TraitType.UNDEFINED} disabled>
                                {t('interface.editor.trait.select_type')}
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem key={`type_${value}`} value={value}>
                            {t(value)}
                        </MenuItem>
                    );
                })}
            </TextField>

            <Box className="basic-info__field">
                <FormControlLabel
                    value="start"
                    control={<Switch disabled={traitType === TraitType.NATIONAL} value={spawnable} onChange={(event) => setSpawnable(event.target.checked)} color="primary" />}
                    label={t('interface.editor.trait.spawn_label')}
                    labelPlacement="start"
                />
                <Typography variant="caption">{t('interface.editor.trait.spawn_helper', { max: MAX_NUMBER_OF_TRAITS_GENERATED })}</Typography>
            </Box>

            <Box className="basic-info__footer">
                <Button type="submit">{t('interface.commons.next')}</Button>
            </Box>
        </Box>
    );
}
