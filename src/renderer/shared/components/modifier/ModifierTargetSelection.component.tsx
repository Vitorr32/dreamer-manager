import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions, EffectOriginType } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { EntityFilter as EntityFilterComponent } from '../entity/EntityFilter.component';
import { CopyClassInstance, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

interface IProps {
    modifier: Modifier;
    onModifierTargetChange: (filter: EntityFilter) => void;
    onModifierReceptorChange: (filter: EntityFilter) => void;
    options?: EffectEditorOptions;
}

enum QuickTarget {
    PROTAGONIST = 'model.modifier.targeting.protagonist',
    SELF = 'model.modifier.targeting.self',
}

export function ModifierTargetSelection({ modifier, onModifierTargetChange, onModifierReceptorChange, options }: IProps) {
    const { t } = useTranslation();
    const { targetEntityFilter, originEntityFilter } = modifier;

    const [quickTarget, setQuickTarget] = useState<QuickTarget>();

    const onFilterChanged = (updatedEntity: EntityFilter, isTarget: boolean = true) => {
        const updatedFilter = CopyClassInstance(targetEntityFilter);

        updatedFilter[key] = newValue;
        onModifierTargetChange(updatedFilter);
    };

    const getShortcutTargets = () => {
        const shortcuts: QuickTarget[] = [];

        //TODO: Create a shortcut system that takes common targets and specified entities into consideration, use the entity being modified on the modifier as reference

        switch (modifier) {
        }
    };

    return (
        <Box className="">
            TARGETTING
            <FormControl fullWidth>
                <InputLabel>{t('interface.editor.modifier.input_label_value_change')}</InputLabel>
                <Select value={quickTarget} label={t('interface.editor.modifier.input_label_value_change')} onChange={(e) => setQuickTarget(e.target.value as QuickTarget)}>
                    {Object.values(QuickTarget).map((option, index) => (
                        <MenuItem key={`entity_var_${index}`} value={option}>
                            {t(option)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.event.flag_permanent_helper')}</FormHelperText>
            </FormControl>
            <EntityFilterEditor entityFilter={targetEntityFilter} onFilterChange={(entity) => onFilterChanged(entity)} />
        </Box>
    );
}
