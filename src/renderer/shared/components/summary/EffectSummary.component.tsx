import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
interface IProps {
    effect: Effect;
}

export function EffectSummary({ effect }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const renderModifierLine = (modifier: Modifier[]) => {
        // const valueSet = modifier.effectiveChange !== 0 ? true : false;
        // const isPositive = modifier.effectiveChange > 0 ? true : false;

        // switch (modifier.modifiedEntityVariables.entityType) {
            // case ModifierType.MODIFY_SKILL_CURRENT_VALUE:
            // case ModifierType.MODIFY_POTENTIAL_VALUE:
            // case ModifierType.MODIFY_SKILL_GAIN_MULTIPLIER_VALUE:
            //     return (
            //         <Typography>
            //             {t(isPositive ? 'summary.effect.increase_with_targets' : 'summary.effect.decrease_with_targets', {
            //                 value: t(modifier.type),
            //                 targets: modifier.modifierTargets.map((attrID) => database.mappedDatabase.attributes[attrID].name).join(', '),
            //                 change: valueSet ? (modifier.percentage ? modifier.effectiveChange + '%' : modifier.effectiveChange) : 'X',
            //             })}
            //         </Typography>
            //     );
            // case ModifierType.MODIFY_MOOD_VALUE:
            // case ModifierType.MODIFY_LEARNING_RATE:
            // case ModifierType.MODIFY_ENERGY_FALL_MULTIPLIER:
            // case ModifierType.MODIFY_ENERGY_GAIN_MULTIPLIER:
            // case ModifierType.MODIFY_ENERGY_MAXIMUM:
            // case ModifierType.MODIFY_ENERGY_VALUE:
            // case ModifierType.MODIFY_STRESS_FALL_MULTIPLIER:
            // case ModifierType.MODIFY_STRESS_GAIN_MULTIPLIER:
            // case ModifierType.MODIFY_STRESS_MAXIMUM:
            // case ModifierType.MODIFY_STRESS_VALUE:
            //     return (
            //         <Typography>
            //             {t(isPositive ? 'summary.effect.increase' : 'summary.effect.decrease', {
            //                 value: t(modifier.type),
            //                 change: valueSet ? (modifier.percentage ? modifier.effectiveChange + '%' : modifier.effectiveChange) : 'X',
            //             })}
            //         </Typography>
            //     );
        //     default:
        //         return null;
        // }
    };

    return (
        <Box className="effect-summary">
            {/* <Box className="effect-summary__modifier">{renderModifierLine(effect.modifiers)}</Box> */}
        </Box>
    );
}
