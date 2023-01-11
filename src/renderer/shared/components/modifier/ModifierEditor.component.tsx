import { FormHelperText, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ModifierEntityEditor } from './ModifierEntityEditor.component';
import { ModifierTargetSelection } from './ModifierTargetSelection.component';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EntityFilterOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const onEntityModifierChanged = (entity: Entity): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariable = { ...DEFAULT_ENTITY_FILTER, entity };
        onChange(newModifier);
    };

    const onEntityVariableChange = (key: 'variableKey' | 'value' | 'operator', value: any): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariable[key] = value;
        //Check if it's a change of the variable, if it is, reset the operator and value inputs.
        if (key === 'variableKey') {
            newModifier.modifiedEntityVariable.operator = null;
            newModifier.modifiedEntityVariable.value = null;
        }
        onChange(newModifier);
    };

    const onModifierFilteringChange = (target: 'targetEntityFilter' | 'originEntityFilter', filterTree: EntityFilterTree): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier[target] = filterTree;
        onChange(newModifier);
    };

    return (
        <Paper sx={{ bgcolor: 'background.default', padding: '10px 20px' }} elevation={1}>
            <Box sx={{ borderColor: 'text.primary' }}>
                <Typography sx={{ color: 'text.primary' }} variant="h6">
                    {t('interface.editor.modifier.title')}
                </Typography>
                <FormHelperText>{t('interface.editor.modifier.subtitle')}</FormHelperText>
            </Box>

            <Box sx={{ marginTop: '10px' }}>
                <ModifierEntityEditor modifier={modifier} onEntityChange={onEntityModifierChanged} onVariableChange={onEntityVariableChange} options={options} />
                <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>

                <ModifierTargetSelection
                    modifier={modifier}
                    onModifierTargetChange={(filter) => onModifierFilteringChange('targetEntityFilter', filter)}
                    onModifierReceptorChange={(filter) => onModifierFilteringChange('originEntityFilter', filter)}
                    options={options}
                />
            </Box>
        </Paper>
    );
}
