import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel, Switch, Button, OutlinedInput, FormHelperText, Typography } from '@mui/material';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ICONS, MAX_NUMBER_OF_TRAITS_GENERATED, TRAITS } from 'renderer/shared/Constants';

interface IProps {
    nextStep: () => void;
    trait: Trait;
    onChange: (trait: Trait) => void;
}

export function BasicInfoForm({ nextStep, trait, onChange }: IProps) {
    const { t } = useTranslation();

    const [id, setID] = useState(trait.id);
    const [name, setName] = useState(trait.name);
    const [description, setDescription] = useState(trait.description);
    const [traitType, setTraitType] = useState(trait.type);
    const [spawnable, setSpawnable] = useState(trait.spawnable);
    const [spritePath, setSpritePath] = useState(trait.spritePath);

    function onSubmit(): void {
        const newTrait = Object.assign({}, trait);

        newTrait.name = name;
        newTrait.description = description;
        newTrait.type = traitType;
        newTrait.spawnable = spawnable;

        onChange(newTrait);
        nextStep();
    }

    const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
        if (event.target.files === null) {
            return;
        }

        const files = [];

        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            files.push({ path: file.path, name: file.name });
        }

        const savedFile: any = await window.electron.fileSystem.saveFilesToResources([ICONS, TRAITS], files);
        console.log(savedFile);
    };

    const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files === null) {
            return;
        }

        setSpritePath(event.target.files[0].path);
    };

    return (
        <Box component="form" onSubmit={onSubmit} className="basic-info">
            <Box className="basic-info__header">
                <Typography variant="h5">Basic Information</Typography>
            </Box>

            <TextField required label={t('interface.editor.trait.id_label')} helperText={t('interface.editor.trait.id_helper')} variant="outlined" value={id} onChange={(event) => setID(event.target.value)} />

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
                    label={t('interface.editor.trait.spawn_label') as string}
                    labelPlacement="start"
                />
                <Typography variant="caption">{t('interface.editor.trait.spawn_helper', { max: MAX_NUMBER_OF_TRAITS_GENERATED })}</Typography>
            </Box>

            <Box className="basic-info__image-input">
                <Typography variant="overline"> {t('interface.editor.trait.icon_label')}</Typography>

                <Box className="basic-info__image-current">
                    <img src={spritePath} alt={`${trait.id}_icon`} />
                </Box>

                <Button variant="contained" component="label">
                    Choose Image File
                    <input name="avatar" type="file" hidden onChange={onImageSelected} />
                </Button>
                <Typography variant="caption">{t('interface.editor.trait.icon_helper')}</Typography>
            </Box>

            <Box className="basic-info__footer">
                <Button type="submit">{t('interface.commons.next')}</Button>
            </Box>
        </Box>
    );
}
