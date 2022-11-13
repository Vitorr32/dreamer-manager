import { ArrowForward } from '@mui/icons-material';
import { Button, FormHelperText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { Modifier, ModifierType } from 'renderer/shared/models/base/Modifier';
import { VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { TraitSelectionButton } from '../buttons/TraitSelectionButton';
import { ModifierEntityEditor } from './ModifierEntityEditor.component';
import { ModifierTargetSelection } from './ModifierTargetSelection.component';
import { ModifierTypeDialog } from './ModifierTypeDialog.component';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EffectEditorOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const [showTypeModal, setShowTypeModal] = React.useState<boolean>(false);

    const onEntityModifierChanged = (entity: Entity): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariable = { ...DEFAULT_ENTITY_FILTER, entity };
        onChange(newModifier);
    };

    const onEntityVariableChange = (key: 'variableKey' | 'value' | 'operator', value: any): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariable[key] = value;
        //Check if it's a change of the variable, if it is, reset the operator and value inputs.
        if (key === 'variableKey' && newModifier.modifiedEntityVariable.operator !== VariableOperator.NONE) {
            newModifier.modifiedEntityVariable.operator = VariableOperator.NONE;
            newModifier.modifiedEntityVariable.value = null;
        }
        onChange(newModifier);
    };

    const onModifierFilteringChange = (target: 'targetEntityFilter' | 'originEntityFilter', filterTree: EntityFilterTree): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier[target] = filterTree;
        onChange(newModifier);
    };

    const onTypeSubmitted = (type: ModifierType) => {
        const newModifier = Object.assign({}, modifier);

        //Update the filters properties as needed by the modifier type.
        switch (type) {
            case ModifierType.MODIFY_ENTITY_VARIABLE:
                newModifier.targetEntityFilter = new EntityFilterTree();
                newModifier.originEntityFilter = null;
                break;
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE:
                newModifier.targetEntityFilter = new EntityFilterTree();
                newModifier.originEntityFilter = new EntityFilterTree();
                break;
            default:
                newModifier.targetEntityFilter = null;
                newModifier.originEntityFilter = null;
                break;
        }

        newModifier.type = type;

        setShowTypeModal(false);
        onChange(newModifier);
    };

    return (
        <Box className="modifier-editor" sx={{ bgcolor: 'background.default' }}>
            <Box className="modifier-editor__header">
                <Typography variant="h4">{t('interface.editor.modifier.title')}</Typography>
                <Typography variant="subtitle1">{t('interface.editor.modifier.subtitle')}</Typography>
            </Box>

            <Box className="modifier-editor__content">
                <Button className="modifier-editor__select-type" variant="contained" endIcon={<ArrowForward />} onClick={() => setShowTypeModal(true)}>
                    {modifier.type === ModifierType.UNDEFINED ? t('interface.editor.modifier.select_type') : t(modifier.type)}
                </Button>

                {modifier.type === ModifierType.MODIFY_ENTITY_VARIABLE && (
                    <>
                        <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>
                        <ModifierEntityEditor modifier={modifier} onEntityChange={onEntityModifierChanged} onVariableChange={onEntityVariableChange} options={options} />
                    </>
                )}

                {modifier.type !== ModifierType.MODIFY_TRIGGER_EVENT && (
                    <ModifierTargetSelection
                        modifier={modifier}
                        onModifierTargetChange={(filter) => onModifierFilteringChange('targetEntityFilter', filter)}
                        onModifierReceptorChange={(filter) => onModifierFilteringChange('originEntityFilter', filter)}
                        options={options}
                    />
                )}
            </Box>

            <ModifierTypeDialog modifier={modifier} onTypeSelect={onTypeSubmitted} open={showTypeModal} onClose={() => setShowTypeModal(false)} options={options} />
        </Box>
    );
}
