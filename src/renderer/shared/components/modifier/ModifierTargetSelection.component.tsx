import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { Variables, VariableType } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';

interface IProps {
    modifier: Modifier;
    onEntityChange: (entity: Entity) => void;
    onVariableChange: (key: 'variableID' | 'value', value: any) => void;
    options?: EffectEditorOptions;
}

export function ModifierTargetSelection({ modifier, onEntityChange, onVariableChange }: IProps) {
    const { t } = useTranslation();

    return <Box></Box>;
}
