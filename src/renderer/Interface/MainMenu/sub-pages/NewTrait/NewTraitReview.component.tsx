import React from 'react';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { Trait } from 'renderer/shared/models/base/Trait.model';

interface IProps {
    trait: Trait;
}

export function NewTraitReview({ trait }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    return <Box className="trait-review">New Trait Review</Box>;
}
