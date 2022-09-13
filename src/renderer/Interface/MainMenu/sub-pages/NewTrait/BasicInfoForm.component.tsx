import React, { useEffect } from 'react';
import { MenuItem, TextField, FormControlLabel, Switch, Button, Typography } from '@mui/material';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ICONS, MAX_NUMBER_OF_TRAITS_GENERATED, PLACEHOLDER_TRAIT_ICON, TRAITS } from 'renderer/shared/Constants';
import { ApplyFileProtocol, GetFileFromResources } from 'renderer/shared/utils/StringOperations';

interface IProps {
    nextStep: () => void;
    trait: Trait;
    iconPath: string;
    onChange: (trait: Trait) => void;
    setTempImage: (imagePath: any) => void;
}

export function BasicInfoForm({ nextStep, trait, iconPath, onChange, setTempImage }: IProps) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        async function getTraitFilePath() {
            //Check if there is already a temporary icon path set.
            if (iconPath) {
                return;
            }

            if (trait.iconPath) {
                const file = await GetFileFromResources(trait.iconPath);
                setTempImage(file.path);
            } else {
                //Get the placeholder icon for trait
                const file: { path: string; buffer: Buffer } = await window.electron.fileSystem.getFileFromResources([ICONS, TRAITS, PLACEHOLDER_TRAIT_ICON]);
                setTempImage(ApplyFileProtocol(file.path));
            }
        }

        getTraitFilePath();
    }, []);

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

    const onImageSelected = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files === null) {
            return;
        }

        const files = [];
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            files.push({ path: file.path, name: file.name });
        }

        const savedFile: any = await window.electron.fileSystem.saveFilesToTempFolder(files);

        setTempImage(ApplyFileProtocol(savedFile[0]));
    };

    return (
        <Box className="basic-info">
            <Box className="basic-info__header">
                <Typography variant="h5">Basic Information</Typography>
            </Box>

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
            />

            <TextField
                required
                label={t('interface.editor.trait.type_label')}
                helperText={t('interface.editor.trait.type_helper')}
                variant="outlined"
                select
                value={trait.type}
                onChange={(event) => onInputChange('type', event.target.value)}
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
                />
                <Typography variant="caption">{t('interface.editor.trait.spawn_helper', { max: MAX_NUMBER_OF_TRAITS_GENERATED })}</Typography>
            </Box>

            <Box className="basic-info__image-input">
                <Typography variant="overline"> {t('interface.editor.trait.icon_label')}</Typography>

                <Box className="basic-info__image-current">
                    <img src={iconPath} alt={`${trait.id}_icon`} />
                </Box>

                <Button variant="contained" component="label">
                    Choose Image File
                    <input name="avatar" type="file" hidden onChange={onImageSelected} accept="image/*" />
                </Button>
                <Typography variant="caption">{t('interface.editor.trait.icon_helper')}</Typography>
            </Box>

            <Box className="basic-info__footer">
                <Button onClick={nextStep}>{t('interface.commons.next')}</Button>
            </Box>
        </Box>
    );
}
