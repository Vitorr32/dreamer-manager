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

    const onSectionSelected = (section: ModifierTypeSection) => {};

    return <Box className="effect-summary">{effect.conditionTree && <ConditionTreeSummary conditionTree={effect.conditionTree} />}</Box>;
}
