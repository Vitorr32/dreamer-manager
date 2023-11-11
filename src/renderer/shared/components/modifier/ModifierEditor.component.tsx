import { Box, FormHelperText, Typography } from '@mui/material';
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
            newModifier.modifiedEntityVariables?.specifiedDynamicEntity &&
            newModifier.modifiedEntityVariables?.specifiedDynamicEntity !== modifier.modifiedEntityVariables?.specifiedDynamicEntity
        ) {
            newModifier.targetEntityFilter = getDynamicEntityFilterDataAsFilterTree(newModifier.modifiedEntityVariables.specifiedDynamicEntity, options);
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
        if (!modifier.modifiedEntityVariables.entityType && !modifier.modifiedEntityVariables.specifiedDynamicEntity) {
            return false;
        }
        // In case that the user choose a specific dynamic entity, but it's value it SPECIFIC_FILTER, it means that the user wants to create a filter himself.
        const { specifiedDynamicEntity } = modifier.modifiedEntityVariables;
        if (specifiedDynamicEntity === DynamicEntity.SPECIFIC_FILTER) {
            return true;
        }

        if (!modifier.modifiedEntityVariables.specifiedDynamicEntity) {
            return true;
        }

        return false;
    };

    return (
        <>
            <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>
            <EntityFilterEditor entityFilter={modifier.modifiedEntityVariables} onFilterChange={onEntityModifierChanged} entityFilterOptions={options} isEditor />

            {isTargetFilterNecessary() && (
                <Box sx={{ mt: 2 }}>
                    <Typography>{t('interface.editor.modifier.input_label_target_of_modifier')}</Typography>

                    <CompositeEntityFilter
                        filterTree={modifier.targetEntityFilter || new EntityFilterTree()}
                        onFilterTreeChange={onModifierTargetConditionTreeChanged}
                        entityFilterOptions={{ ...options, isLookingForSpecificEntity: modifier.modifiedEntityVariables?.entityType }}
                    />
                </Box>
            )}
        </>
    );
}
