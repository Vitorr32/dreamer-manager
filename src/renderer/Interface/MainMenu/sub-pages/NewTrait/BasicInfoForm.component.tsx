import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel, Switch, Button, OutlinedInput, FormHelperText, Typography } from '@mui/material';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

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

            <div className="field">
                <FormControlLabel
                    value="start"
                    control={<Switch disabled={traitType === TraitType.NATIONAL} value={spawnable} onChange={(event) => setSpawnable(event.target.checked)} color="primary" />}
                    label="Spawnable"
                    labelPlacement="start"
                />

                <span className="field-message">
                    * Whetever this trait can be found on generated Dreamers, otherwise it can be obtainable only by events (Do note that traits of type 'National' will always be spawned), the spawn rate is determined by
                    trait Tier ( Tier 0 is 40%, Tier 1 is 30%, Tier 2 is 15%, Tier 3 is 5% and Tier 4 is 1%)
                </span>
            </div>

            <Box className="basic-info__footer">
                <Button type="submit">{t('interface.commons.next')}</Button>
            </Box>
        </Box>
    );
}
