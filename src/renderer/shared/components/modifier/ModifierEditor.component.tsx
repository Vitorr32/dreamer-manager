import { Button, FormHelperText, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { EntityVariableValue } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { ModifierTargetSelection } from './ModifierTargetSelection.component';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { useEffect, useState } from 'react';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EntityFilterOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const onEntityModifierChanged = (entityFilter: EntityVariableValue, index: number): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariables[index] = entityFilter;
        onChange(newModifier);
    };

    const onModifierFilteringChange = (target: 'targetEntityFilter' | 'originEntityFilter', filterTree: EntityFilterTree): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier[target] = filterTree;
        onChange(newModifier);
    };

    const onModifierListAddition = (): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariables.push(DEFAULT_ENTITY_FILTER);
        onChange(newModifier);
    };

    const onModifierListRemoval = (toRemoveIndex: number) => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariables.splice(toRemoveIndex, 1);
        onChange(newModifier);
    };

    return (
        <Paper sx={{ bgcolor: 'background.default', padding: '10px 20px' }} elevation={1}>
            <Box sx={{ borderColor: 'text.primary', position: 'relative' }}>
                <Typography sx={{ color: 'text.primary' }} variant="h6">
                    {t('interface.editor.modifier.title')}
                </Typography>
                <FormHelperText>{t('interface.editor.modifier.subtitle')}</FormHelperText>

                <Button sx={{ position: 'absolute', right: '0', top: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={onModifierListAddition}>
                    {t('interface.editor.modifier.button_add_modifier')}
                </Button>
            </Box>

            {...modifier.modifiedEntityVariables.map((modifierFilterValue, index) => (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }} key={`modifierFilterValue-${index}`}>
                    <EntityFilterEditor
                        entityFilter={modifierFilterValue}
                        onFilterChange={(entityFilter) => onEntityModifierChanged(entityFilter, index)}
                        entityFilterOptions={options}
                        isEditor
                    />
                    {index !== 0 && (
                        <Tooltip title={t('interface.editor.modifier.button_remove_modifier')}>
                            <IconButton sx={{ marginLeft: '5px' }} onClick={() => onModifierListRemoval(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            ))}
            <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>

            <ModifierTargetSelection
                modifier={modifier}
                onModifierTargetChange={(filter) => onModifierFilteringChange('targetEntityFilter', filter)}
                onModifierReceptorChange={(filter) => onModifierFilteringChange('originEntityFilter', filter)}
                options={options}
            />
        </Paper>
    );
}
