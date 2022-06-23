import { ArrowForward } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Modifier, ModifierTargetType, ModifierType } from 'renderer/shared/models/base/Modifier';
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
        newModifier.modifiedEntityVariable = { entity: entity, variableKey: '', value: '' };
        onChange(newModifier);
    };

    const onEntityVariableChange = (key: 'variableKey' | 'value', value: any): void => {
        const newModifier = CopyClassInstance(modifier);

        console.log('value', value);

        newModifier.modifiedEntityVariable[key] = value;
        onChange(newModifier);
    };

    const onModifierFilteringChange = (target: 'targetEntityFilter' | 'receptorEntityFilter', filter: EntityFilter): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier[target] = filter;
        onChange(newModifier);
    };

    const onTypeSubmitted = (type: ModifierType) => {
        const newModifier = Object.assign({}, modifier);
        //Reset layout of inputs on change of type
        if (modifier.type !== type) {
            newModifier.modifiedWorldState = {};
        }

        //Update the filters properties as needed by the modifier type.
        switch (type) {
            case ModifierType.MODIFY_ENTITY_VARIABLE:
                newModifier.targetEntityFilter = DEFAULT_ENTITY_FILTER;
                newModifier.receptorEntityFilter = null;
                break;
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE:
                newModifier.targetEntityFilter = DEFAULT_ENTITY_FILTER;
                newModifier.receptorEntityFilter = DEFAULT_ENTITY_FILTER;
                break;
            default:
                newModifier.targetEntityFilter = null;
                newModifier.receptorEntityFilter = null;
                break;
        }

        newModifier.type = type;

        setShowTypeModal(false);
        onChange(newModifier);
    };

    const onToolPickerSelection = (selection: string[], type: ModifierTargetType) => {
        if (!selection) {
            throw new Error('The selection is not empty but has no Identifier variable');
        }

        const newModifier = Object.assign({}, modifier);
        newModifier.modifiedWorldState[type] = selection;

        onChange(newModifier);
    };

    const renderModifierSelectionInput = (): React.ReactElement | null => {
        switch (modifier.type) {
            case ModifierType.MODIFY_TRAIT_GAIN:
            case ModifierType.MODIFY_TRAIT_REMOVE:
                return (
                    <TraitSelectionButton
                        displayIDs={modifier.modifiedWorldState?.traits}
                        onChange={(value) => onToolPickerSelection(value, ModifierTargetType.TRAIT_ID)}
                        multi
                    />
                );
            default:
                return null;
        }
    };

    const renderEntityModifier = (): React.ReactElement | null => {
        if (modifier.type !== ModifierType.MODIFY_ENTITY_VARIABLE) {
            return null;
        }

        return <ModifierEntityEditor modifier={modifier} onEntityChange={onEntityModifierChanged} onVariableChange={onEntityVariableChange} options={options} />;
    };

    const renderTargetingSelection = (): React.ReactElement | null => {
        switch (modifier.type) {
            case ModifierType.MODIFY_ENTITY_VARIABLE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE:
                return (
                    <ModifierTargetSelection
                        modifier={modifier}
                        onModifierTargetChange={(filter) => onModifierFilteringChange('targetEntityFilter', filter)}
                        onModifierReceptorChange={(filter) => onModifierFilteringChange('receptorEntityFilter', filter)}
                        options={options}
                    />
                );
            default:
                return null;
        }
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

                {renderEntityModifier()}

                {renderTargetingSelection()}

                {renderModifierSelectionInput()}
            </Box>

            <ModifierTypeDialog modifier={modifier} onTypeSelect={onTypeSubmitted} open={showTypeModal} onClose={() => setShowTypeModal(false)} options={options} />
        </Box>
    );
}
