import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Effect, Period } from 'renderer/shared/models/base/Effect.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { DescribeFilterNode } from './DescribeFilterNode.component';
import { Typography } from '@mui/material';

interface IProps {
    effect: Effect;
}

export function DescribeEffect({ effect }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const renderModifierLine = (modifier: Modifier[]) => {};

    const getPeriodSummary = (): string => {
        if (!effect.periodType) return '';

        switch (effect.periodType) {
            case Period.PERMANENT:
                return t('interface.model.effect.permanent');
            case Period.SPECIFIC_DATE:
                return t('interface.model.effect.specific_date_to', { date: new Date(effect.periodValue).toDateString() });
            case Period.SPECIFIC_PERIOD:
                return t('interface.model.effect.specific_period')
            case Period.SPECIFIC_DATE_FROM_TO:
            default:
                return t('interface.model.effect.permanent');
        }
    };

    return (
        <>
            <Box>
                <Typography>{t('interface.summary.effect.trigger')}</Typography>
                <Typography>{t(effect.trigger)}</Typography>
            </Box>
            <DescribeFilterNode filterNode={effect.conditionTree.root} isRoot />
            <Box>
                <Typography>{t('interface.summary.effect.period')}</Typography>
                <Typography>{t(effect.periodType)}</Typography>
            </Box>
        </>
    );
}
