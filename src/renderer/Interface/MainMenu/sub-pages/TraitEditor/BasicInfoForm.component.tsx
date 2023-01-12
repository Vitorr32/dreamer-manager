import React, { useState } from 'react';
import { MenuItem, TextField, FormControlLabel, Switch, Button, Typography, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { MAX_NUMBER_OF_TRAITS_GENERATED, PLACEHOLDER_TRAIT_ICON, TRAITS } from 'renderer/shared/Constants';
import { ApplyFileProtocol } from 'renderer/shared/utils/StringOperations';
import { CopyClassInstance } from 'renderer/shared/utils/General';

interface IProps {
    nextStep: () => void;
    trait: Trait;
    onChange: (trait: Trait) => void;
}

export function BasicInfoForm({ nextStep, trait, onChange }: IProps) {
    const { t, i18n } = useTranslation();

    const [errorState, setErrorState] = useState<{ [key: string]: boolean }>();

    function onNameChange(value: string): void {
        const newTrait = Object.assign(new Trait(), trait);

        newTrait.setName(value, i18n.language);
        onChange(newTrait);
    }

    function onDescriptionChange(value: string): void {
        const newTrait = Object.assign(new Trait(), trait);

        newTrait.setDescription(value, i18n.language);
        onChange(newTrait);
    }

    function onInputChange(key: keyof Trait, value: any): void {
        const newTrait = Object.assign(new Trait(), trait);

        (newTrait[key] as any) = value;
        onChange(newTrait);
    }

    const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files === null || event.target.files.length === 0) {
            return;
        }

        const iconPath = event.target.files[0];
        const updatedTrait = CopyClassInstance(trait);
        updatedTrait.absoluteIconPath = ApplyFileProtocol(iconPath.path);

        onChange(updatedTrait);
    };

    if (!trait) {
        return null;
    }

    return (
        <Box sx={{ paddingTop: '20px' }}>
            <TextField
                required
                label={t('interface.editor.trait.id_label')}
                helperText={t('interface.editor.trait.id_helper')}
                variant="outlined"
                value={trait.id}
                onChange={(event) => onInputChange('id', event.target.value)}
            />

            <TextField
                required
                label={t('interface.editor.trait.name_label')}
                helperText={t('interface.editor.trait.name_helper')}
                variant="outlined"
                value={trait.getName(i18n.language)}
                onChange={(event) => onNameChange(event.target.value)}
            />

            <TextField
                required
                label={t('interface.editor.trait.description_label')}
                helperText={t('interface.editor.trait.description_helper')}
                variant="outlined"
                multiline
                rows={4}
                value={trait.getDescription(i18n.language)}
                onChange={(event) => onDescriptionChange(event.target.value)}
                sx={{ marginTop: '20px' }}
            />

            <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.trait.type_label')}</InputLabel>
                <Select value={trait.type || ''} label={t('interface.editor.trait.type_label')} onChange={(ev) => onInputChange('type', ev.target.value)}>
                    <MenuItem disabled value="">
                        {t('interface.editor.trait.select_type')}
                    </MenuItem>
                    {Object.values(TraitType).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.trait.type_helper')}</FormHelperText>
            </FormControl>

            <Box className="basic-info__field">
                <FormControlLabel
                    value="start"
                    control={
                        <Switch
                            disabled={trait.type === TraitType.NATIONAL}
                            value={trait.spawnable}
                            onChange={(event) => onInputChange('spawnable', event.target.checked)}
                            color="primary"
                        />
                    }
                    label={t('interface.editor.trait.spawn_label') as string}
                    labelPlacement="start"
                    sx={{ color: 'text.primary', marginLeft: '0' }}
                />
                <FormHelperText sx={{ marginLeft: '14px' }}>{t('interface.editor.trait.spawn_helper', { max: MAX_NUMBER_OF_TRAITS_GENERATED })}</FormHelperText>
            </Box>

            <Box className="basic-info__image-input">
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                    {t('interface.editor.trait.icon_label')}
                </Typography>

                <Box className="basic-info__image-current" sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <img src={trait.absoluteIconPath} alt={`${trait.id}_icon`} />

                    <Button variant="contained" component="label" sx={{ color: 'text.primary' }}>
                        {t('interface.editor.trait.icon_button')}
                        <input name="avatar" type="file" hidden onChange={onImageSelected} accept="image/*" />
                    </Button>
                </Box>

                <FormHelperText sx={{ marginLeft: '14px' }}>{t('interface.editor.trait.icon_helper')}</FormHelperText>
            </Box>

            <Box className="basic-info__footer">
                <Button onClick={nextStep}>{t('interface.commons.next')}</Button>
            </Box>
        </Box>
    );
}
