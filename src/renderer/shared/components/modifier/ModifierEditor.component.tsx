import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { DynamicEntity, EntityVariableValue } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { ModifierTargetSelection } from './ModifierTargetSelection.component';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EntityFilterOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const onEntityModifierChanged = (entityFilter: EntityVariableValue): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariables = entityFilter;
        onChange(newModifier);
    };

    const onModifierFilteringChange = (target: 'targetEntityFilter' | 'originEntityFilter', filterTree: EntityFilterTree): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier[target] = filterTree;
        onChange(newModifier);
    };

    return (
        <>
            <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>
            <EntityFilterEditor entityFilter={modifier.modifiedEntityVariables} onFilterChange={onEntityModifierChanged} entityFilterOptions={options} isEditor />

            {modifier.modifiedEntityVariables.entityType && !Object.values(DynamicEntity).includes(modifier.modifiedEntityVariables.specifiedDynamicEntity) && (
                <ModifierTargetSelection
                    modifier={modifier}
                    onModifierTargetChange={(filter) => onModifierFilteringChange('targetEntityFilter', filter)}
                    onModifierReceptorChange={(filter) => onModifierFilteringChange('originEntityFilter', filter)}
                    options={options}
                />
            )}
        </>
    );
}
