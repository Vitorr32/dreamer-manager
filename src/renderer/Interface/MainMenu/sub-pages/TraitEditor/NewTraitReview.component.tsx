import React, { useState } from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { Alert, Button, Typography } from '@mui/material';
import { BASE_TRAIT_FILE, DATABASE_FOLDER, ICONS_FOLDER, LANGUAGE_CODE_DEFAULT, TRAIT_DATABASE_FOLDER } from 'renderer/shared/Constants';
import { EffectSummary } from 'renderer/shared/components/summary/EffectSummary.component';
import { ApplyFileProtocol, GetFileInfoFromPath, RemoveFileProtocol } from 'renderer/shared/utils/StringOperations';
import { InsertIconInAssets, UpdateDatabaseJSONFile } from 'renderer/shared/scripts/DatabaseCreate.script';

interface IProps {
    trait: Trait;
    previousStep: () => void;
    onSubmit: () => void;
}

export function NewTraitReview({ trait, previousStep, onSubmit }: IProps) {
    const { t, i18n } = useTranslation();

    const database = useSelector((state: RootState) => state.database);
    const [inputValidation, setInputValidation] = useState({} as any);
    const [isLoading, setLoading] = useState(false);

    // const onSubmit = async () => {
    //     setLoading(true);

    //     if (!validateTrait(trait)) {
    //         return;
    //     }

    //     // TODO: Rewrite the persistence of the trait on database
    //     // const fileInfo = await GetFileInfoFromPath(ApplyFileProtocol(iconPath));

    //     // if (!fileInfo) {
    //     //     const newValidation = {
    //     //         common: t('interface.editor.validation.missing_icon'),
    //     //     };
    //     //     setInputValidation(newValidation);
    //     // }

    //     // const submittedTrait = Object.assign({}, trait);
    //     // submittedTrait.spritePath = fileInfo?.fullName;

    //     // InsertIconInAssets(RemoveFileProtocol(iconPath), [ICONS_FOLDER, TRAIT_DATABASE_FOLDER], submittedTrait.spritePath);
    //     // UpdateDatabaseJSONFile([DATABASE_FOLDER, TRAIT_DATABASE_FOLDER], BASE_TRAIT_FILE, submittedTrait);

    //     setLoading(false);
    // };

    const validateTrait = (trait: Trait): boolean => {
        const validation: any = {};

        validation.id = database.mappedDatabase.traits[trait.id] ? t('interface.editor..duplicated_id') : undefined;
        validation.name = !trait.localization[LANGUAGE_CODE_DEFAULT].name ? t('interface.editor.validation.missing_name') : undefined;
        validation.description = !trait.localization[LANGUAGE_CODE_DEFAULT].description ? t('interface.editor.validation.missing_description') : undefined;

        setInputValidation(validation);

        return Object.keys(validation).some((inputValidated) => !validation[inputValidated]);
    };

    return (
        <Box sx={{ color: 'text.primary', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box>
                <img src={trait.absoluteIconPath} alt={`${trait.id}_icon`} />
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.id_label')}</Typography>
                    <Typography>{trait.id}</Typography>
                    <Typography variant="subtitle1">{inputValidation.id}</Typography>
                </Box>
                <Box>
                    <Box>
                        <Typography variant="overline">{t('interface.editor.trait.name_label')}</Typography>
                        <Typography>{trait.getName(i18n.language)}</Typography>
                        <Typography variant="subtitle1">{inputValidation.name}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <Typography variant="overline">{t('interface.editor.trait.description_label')}</Typography>
                        <Typography>{trait.getDescription(i18n.language)}</Typography>
                        {inputValidation.description && <Alert severity="error">{inputValidation.description}</Alert>}
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.type_label')}</Typography>
                    <Typography>{t(trait.type)}</Typography>
                    <Typography variant="subtitle1">{inputValidation.type}</Typography>
                </Box>
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.spawn_label')}</Typography>
                    <Typography>{trait.spawnable ? t('interface.editor.trait.is_spawnable') : t('interface.editor.trait.not_spawnable')}</Typography>
                </Box>
            </Box>

            <Box>
                {trait.effects.map((effect, index) => (
                    <EffectSummary key={'effect_' + index} effect={effect} />
                ))}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Button color="primary" onClick={previousStep}>
                    {t('interface.commons.previous')}
                </Button>
                <Button color="primary" onClick={onSubmit}>
                    {t('interface.commons.submit')}
                </Button>
            </Box>
        </Box>
    );
}
