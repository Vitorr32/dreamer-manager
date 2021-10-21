import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, FilledInput, FormControl, FormHelperText, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, Modal, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { GetModifierTypesOfSection } from 'renderer/shared/utils/EnumOrganizer';

interface IProps {
    modifier: Modifier;
}

export function EffectSummary(props: IProps) {
    const { t } = useTranslation();

    const [modifier, setModifier] = React.useState<Modifier>(new Modifier());
    const [showTypeModal, setShowTypeModal] = React.useState<boolean>(false);
    const [selectableTypes, setSelectableTypes] = React.useState<ModifierType[]>([]);
    const [modifierSection, setModifierSection] = React.useState<ModifierTypeSection>();
    const [showInput, setShowInput] = React.useState<boolean>(false);

    const onSectionSelected = (section: ModifierTypeSection) => {
    };

    return (
        <Box className="effect-summary" sx={{ bgcolor: 'background.default' }}>
        </Box>
    );
}
