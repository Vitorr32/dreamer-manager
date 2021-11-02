import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, FilledInput, FormControl, FormHelperText, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, Modal, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Modifier, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { GetModifierTypesOfSection } from 'renderer/shared/utils/EnumOrganizer';
import { ConditionTreeSummary } from './ConditionTreeSummary.component';

interface IProps {
    effect: Effect;
}

export function EffectSummary({ effect }: IProps) {
    const { t } = useTranslation();

    const [showInput, setShowInput] = React.useState<boolean>(false);

    const renderModifierLine = (modifier: Modifier): React.ReactElement | null => {
        const valueSet = modifier.effectiveChange !== 0 ? true : false;
        const isPositive = modifier.effectiveChange > 0 ? true : false;

        switch (modifier.type) {
            case ModifierType.MODIFY_ENERGY_FALL_MULTIPLIER:
            case ModifierType.MODIFY_ENERGY_GAIN_MULTIPLIER:
            case ModifierType.MODIFY_ENERGY_MAXIMUM:
            case ModifierType.MODIFY_ENERGY_VALUE:
            case ModifierType.MODIFY_STRESS_FALL_MULTIPLIER:
            case ModifierType.MODIFY_STRESS_GAIN_MULTIPLIER:
            case ModifierType.MODIFY_STRESS_MAXIMUM:
            case ModifierType.MODIFY_STRESS_VALUE:
                return (
                    <Typography>
                        {t(isPositive ? 'summary.effect.increase' : 'summary.effect.decrease', {
                            values: t(modifier.type),
                            model: '',
                            change: valueSet ? (modifier.percentage ? modifier.effectiveChange + '%' : modifier.effectiveChange) : 'X',
                        })}
                    </Typography>
                );
            default:
                return null;
        }
    };

    return (
        <Box className="effect-summary">
            {effect.conditionTree && <ConditionTreeSummary conditionTree={effect.conditionTree} />}
            <Box className="effect-summary__modifier">{renderModifierLine(effect.modifier)}</Box>
        </Box>
    );
}
