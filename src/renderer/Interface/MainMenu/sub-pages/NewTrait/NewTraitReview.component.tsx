import React, { useState } from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { Trait, TraitType } from 'renderer/shared/models/base/Trait.model';
import { Button, Typography } from '@mui/material';
import { LANGUAGE_CODE_DEFAULT } from 'renderer/shared/Constants';
import { EffectSummary } from 'renderer/shared/components/summary/EffectSummary.component';

interface IProps {
    trait: Trait;
    iconPath: string;
}

export function NewTraitReview({ trait, iconPath }: IProps) {
    const { t, i18n } = useTranslation();

    const database = useSelector((state: RootState) => state.database);
    const [inputValidation, setInputValidation] = useState({} as any);

    const onSubmit = () => {
        if (!validateTrait(trait)) {
            console.log('Invalid');
            return;
        }
        console.log('Valid');
    };

    const validateTrait = (trait: Trait): boolean => {
        const validation: any = {};

        validation.id = database.mappedDatabase.traits[trait.id] ? t('interface.editor..duplicated_id') : undefined;
        validation.name = !trait.localization[LANGUAGE_CODE_DEFAULT].name ? t('interface.editor.validation.missing_name') : undefined;
        validation.description = !trait.localization[LANGUAGE_CODE_DEFAULT].description ? t('interface.editor.validation.missing_description') : undefined;
        validation.type = trait.type === TraitType.UNDEFINED ? t('interface.editor.validation.missing_type') : undefined;

        setInputValidation(validation);

        return Object.keys(validation).some((inputValidated) => !inputValidated);
    };

    console.log(trait);

    return (
        <Box className="trait-review">
            <Box className="trait-review__basic">
                <img className="trait-review__icon" src={iconPath || trait.spriteName} alt={`${trait.id}_icon`} />
                <Box className="trait-review__field">
                    <Typography variant="overline">{t('interface.editor.trait.id_label')}</Typography>
                    <Typography>{trait.id}</Typography>
                    <Typography className="trait-review__field-error" variant="subtitle1">{inputValidation.id}</Typography>
                </Box>
                <Box className="trait-review__localized-field">
                    <Box className="trait-review__field">
                        <Typography variant="overline">{t('interface.editor.trait.name_label')}</Typography>
                        <Typography>{trait.getName(i18n.language)}</Typography>
                    <Typography className="trait-review__field-error" variant="subtitle1">{inputValidation.name}</Typography>
                    </Box>
                    <Box className="trait-review__field">
                        <Typography variant="overline">{t('interface.editor.trait.default_locale_name_label')}</Typography>
                        <Typography>{trait.getName(LANGUAGE_CODE_DEFAULT)}</Typography>
                    </Box>
                </Box>
                <Box className="trait-review__localized-field">
                    <Box className="trait-review__field">
                        <Typography variant="overline">{t('interface.editor.trait.description_label')}</Typography>
                        <Typography>{trait.getDescription(i18n.language)}</Typography>
                    <Typography className="trait-review__field-error" variant="subtitle1">{inputValidation.description}</Typography>
                    </Box>
                    <Box className="trait-review__field">
                        <Typography variant="overline">{t('interface.editor.trait.default_locale_description_label')}</Typography>
                        <Typography>{trait.getDescription(LANGUAGE_CODE_DEFAULT)}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="trait-review__status">
                <Box className="trait-review__field">
                    <Typography variant="overline">{t('interface.editor.trait.type_label')}</Typography>
                    <Typography>{t(trait.type)}</Typography>
                    <Typography className="trait-review__field-error" variant="subtitle1">{inputValidation.type}</Typography>
                </Box>
                <Box className="trait-review__field">
                    <Typography variant="overline">{t('interface.editor.trait.spawn_label')}</Typography>
                    <Typography>{trait.spawnable ? t('interface.editor.trait.is_spawnable') : t('interface.editor.trait.not_spawnable') }</Typography>
                </Box>
            </Box>
            <Box className="trait-review__effect">
                {trait.effects.map((effect, index) => (
                    <EffectSummary key={'effect_' + index} effect={effect} />
                ))}
            </Box>
            <Box className="trait-review__footer">
                <Typography>{t('interface.editor.trait.localization_message')}</Typography>
                <Button onClick={onSubmit}>{t('interface.commons.submit')}</Button>
            </Box>
        </Box>
    );
}
