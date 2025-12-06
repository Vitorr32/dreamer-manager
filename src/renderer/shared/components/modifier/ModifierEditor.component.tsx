import { FormHelperText, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';
import { EntityVariableValue } from 'renderer/shared/models/interfaces/EntityVariableValue.interface';
import { Modifier } from 'renderer/shared/models/base/Modifier.model';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { getDynamicEntityFilterDataAsFilterTree } from 'renderer/shared/utils/DynamicEntities';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { CompositeEntityFilter } from '../entity/CompositeEntityFilter.component';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EntityFilterOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t } = useTranslation();

    const onEntityModifierChanged = (entityFilter: EntityVariableValue): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariables = entityFilter;

        if (newModifier.modifiedEntityVariables.entityType !== modifier.modifiedEntityVariables.entityType) {
            newModifier.targetEntityFilter = new EntityFilterTree();
        }

        if (
            newModifier.modifiedEntityVariables?.targetDynamicEntity &&
            newModifier.modifiedEntityVariables?.targetDynamicEntity !== modifier.modifiedEntityVariables?.targetDynamicEntity
        ) {
            newModifier.targetEntityFilter = getDynamicEntityFilterDataAsFilterTree(newModifier.modifiedEntityVariables.targetDynamicEntity, options);
        }
        onChange(newModifier);
    };

    const onModifierTargetConditionTreeChanged = (conditionTree: EntityFilterTree): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.targetEntityFilter = conditionTree;

        if (newModifier?.targetEntityFilter?.root.entityFilters.length === 0) {
            newModifier.targetEntityFilter = undefined;
        }

        onChange(newModifier);
    };

    const isTargetFilterNecessary = (): boolean => {
        // Check if the values for the modifier target are non-null
        if (!modifier.modifiedEntityVariables.entityType && !modifier.modifiedEntityVariables.targetDynamicEntity) {
            return false;
        }
        // In case that the user choose a specific dynamic entity, but it's value it SPECIFIC_FILTER, it means that the user wants to create a filter himself.
        const { targetDynamicEntity } = modifier.modifiedEntityVariables;
        if (targetDynamicEntity === DynamicEntity.SPECIFIC_FILTER) {
            return true;
        }

        if (!modifier.modifiedEntityVariables.targetDynamicEntity) {
            return true;
        }

        return false;
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={0.5}>
                <Typography variant="subtitle2">
                    {t('interface.editor.modifier.modifier_editor_title', { defaultValue: 'What does this modifier change?' })}
                </Typography>
                <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>
            </Stack>

            <EntityFilterEditor entityFilter={modifier.modifiedEntityVariables} onFilterChange={onEntityModifierChanged} entityFilterOptions={options} isEditor />

            {isTargetFilterNecessary() && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Stack spacing={1.5}>
                        <Typography variant="subtitle2">{t('interface.editor.modifier.input_label_target_of_modifier')}</Typography>
                        <FormHelperText>
                            {t('interface.editor.modifier.target_helper_text', {
                                defaultValue: 'Build a filter to describe which entities will receive this modifier.',
                            })}
                        </FormHelperText>

                        <CompositeEntityFilter
                            filterTree={modifier.targetEntityFilter || new EntityFilterTree()}
                            onFilterTreeChange={onModifierTargetConditionTreeChanged}
                            entityFilterOptions={{ ...options, isLookingForSpecificEntity: modifier.modifiedEntityVariables?.entityType }}
                        />
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}
