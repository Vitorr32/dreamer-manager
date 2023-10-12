import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Period } from 'renderer/shared/models/enums/Period.enum';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Typography } from '@mui/material';
import { ConvertDurationStringToReadableString } from 'renderer/shared/utils/DateOperations';
import { DescribeFilterTreeNode } from './DescribeFilterTreeNode.component';
import { DescribeModifier } from './DescribeModifier.component';

interface IProps {
    effect: Effect;
    isRuntime: boolean;
}

export function DescribeEffect({ effect, isRuntime = false }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const getPeriodSummary = (): string => {
        if (!effect.periodType) return '';

        switch (effect.periodType) {
            case Period.PERMANENT:
                return t('interface.model.effect.permanent');
            case Period.SPECIFIC_DATE:
                return t('interface.model.effect.specific_date_to', { date: new Date(effect.periodValue).toDateString() });
            case Period.SPECIFIC_PERIOD:
                return t('interface.model.effect.specific_period', { period: ConvertDurationStringToReadableString(effect.periodValue) });
            case Period.SPECIFIC_DATE_FROM_TO: {
                const [startDate, endDate] = effect.periodValue;
                return t('interface.model.effect.specific_date_from_to', { startDate: new Date(startDate), endDate: new Date(endDate) });
            }
            default:
                return t('interface.model.effect.permanent');
        }
    };

    const groupModifierLinesByTarget = (): JSX.Element => {
        const modifiersOfEffect = effect.modifiers;
        const modifiersSeparatedByTarget = [];

        modifiersOfEffect.forEach((modifier) => {
            const targetEntity = modifier.targetEntityFilter.resolveFilterTree(database.mappedDatabase);

        });
    };

    return (
        <Box sx={{ color: 'text.primary' }}>
            {effect.trigger && (
                <Box>
                    <Typography>{t('summary.effect.trigger')}</Typography>
                    <Typography>{t(effect.trigger)}</Typography>
                </Box>
            )}

            {effect.conditionTree && (
                <Box>
                    <Typography>{t('summary.effect.condition')}</Typography>
                    <DescribeFilterTreeNode filterNode={effect.conditionTree.root} isRoot />
                </Box>
            )}

            {effect.periodType && (
                <Box>
                    <Typography>{t('summary.effect.period')}</Typography>
                    <Typography>{t(effect.periodType)}</Typography>
                    {effect.periodValue && <Typography>{getPeriodSummary()}</Typography>}
                </Box>
            )}

            {effect.modifiers && effect.modifiers.length !== 0 && (
                <Box>
                    <Typography>{t('summary.effect.trigger')}</Typography>
                    {effect.modifiers.map((modifier) => {
                        return <DescribeModifier key={`modifier_summary_${uuidv4()}`} modifier={modifier} />;
                    })}
                </Box>
            )}
        </Box>
    );
}
