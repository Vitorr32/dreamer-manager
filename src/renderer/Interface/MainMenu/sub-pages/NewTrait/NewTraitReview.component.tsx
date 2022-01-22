import React from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { Typography } from '@mui/material';

interface IProps {
    trait: Trait;
}

export function NewTraitReview({ trait }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    return (
        <Box className="trait-review">
            <Box className="trait-review__basic">
                <Box className="trait-review__field">
                    <Typography variant="overline">{t('interface.editor.trait.id_label')}</Typography>
                    <Typography>{trait.id}</Typography>
                </Box>
                <Box className="trait-review__field">
                    <Typography variant="overline">{t('interface.editor.trait.id_label')}</Typography>
                    <Typography>{trait.id}</Typography>
                </Box>
                <Box className="trait-review__field">
                    <Typography variant="overline">{t('interface.editor.trait.id_label')}</Typography>
                    <Typography>{trait.id}</Typography>
                </Box>
            </Box>
        </Box>
    );
}
