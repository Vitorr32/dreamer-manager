import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Period } from 'renderer/shared/models/enums/Period.enum';
import { Divider, List, ListItem, ListSubheader, Typography } from '@mui/material';
import { ConvertDurationStringToReadableString } from 'renderer/shared/utils/DateOperations';
import { Modifier } from 'renderer/shared/models/base/Modifier.model';
import { SummarizeModifierChange } from 'renderer/shared/utils/Summary';
import { DescribeFilterTreeNode } from './DescribeFilterTreeNode.component';

interface IProps {
    effect: Effect;
}

export function DescribeEffectSkeleton({ effect }: IProps) {
    const { t } = useTranslation();

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

    const groupModifiersByTarget = (modifiers: Modifier[]): Modifier[][] => {
        if (!modifiers || modifiers.length === 0) {
            return [];
        }

        if (modifiers.length === 1) {
            return [modifiers];
        }

        const groupedModifiers: { [key: string]: Modifier[] } = {};

        modifiers.forEach((modifier) => {
            const value = JSON.stringify(modifier.targetEntityFilter);
            groupedModifiers[value] = groupedModifiers[value] || [];
            groupedModifiers[value].push(modifier);
        });

        return Object.values(groupedModifiers);
    };

    return (
        <Box id={`describe_effect_${uuidv4()}`} sx={{ color: 'text.primary' }}>
            {effect.trigger && (
                <Box>
                    <Typography>{t('summary.effect.trigger')}</Typography>
                    <Typography>{t(effect.trigger)}</Typography>
                </Box>
            )}

            {effect.conditionTree && (
                <Box>
                    <Typography>{t('summary.effect.condition')}</Typography>
                    <DescribeFilterTreeNode filterNode={effect.conditionTree.root} />
                </Box>
            )}

            {effect.periodType && (
                <Box>
                    <Typography>{t('summary.effect.period')}</Typography>
                    <Typography>{t(effect.periodType)}</Typography>
                    {effect.periodValue && <Typography>{getPeriodSummary()}</Typography>}
                </Box>
            )}

            {effect.modifiers && effect.modifiers.length !== 0 ? (
                <List>
                    {...groupModifiersByTarget(effect.modifiers).map((modifierGroup) => {
                        const { targetEntityFilter } = modifierGroup[0];
                        const modifierDescriptions = modifierGroup.map((modifier) => SummarizeModifierChange(modifier));

                        return (
                            <>
                                <ListSubheader>
                                    {targetEntityFilter ? (
                                        targetEntityFilter.filterShortcut ? (
                                            t(targetEntityFilter.filterShortcut)
                                        ) : (
                                            <DescribeFilterTreeNode filterNode={targetEntityFilter.root} />
                                        )
                                    ) : (
                                        <>{t('summary.node.target.unknown')}</>
                                    )}
                                </ListSubheader>
                                <ListItem>
                                    <List disablePadding>
                                        {...modifierDescriptions.map((description) => {
                                            return <ListItem>{description}</ListItem>;
                                        })}
                                    </List>
                                </ListItem>
                                <Divider />
                            </>
                        );
                    })}
                </List>
            ) : null}
        </Box>
    );
}
