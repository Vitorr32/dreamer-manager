import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierTargetType, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { GetModifierTypesOfSection } from 'renderer/shared/utils/EnumOrganizer';
import { AttributeSelectionButton } from '../buttons/AttributeSelectionButton.component';
import { TraitSelectionButton } from '../buttons/TraitSelectionButton';
import { AffectedActorsSelect } from '../effects/AffectedActorsSelect.component';
import { ModifierEntitySelector } from './ModifierEntitySelector.component';
import { ModifierTypeDialog } from './ModifierTypeDialog.component';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EffectEditorOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const [showTypeModal, setShowTypeModal] = React.useState<boolean>(false);

    const hasSpecificActors = (): boolean => {
        return modifier.type !== ModifierType.UNDEFINED && options && !!options.specifiedActors;
    };

    const onEffectiveValueChange = (event: any, isPercentage: boolean) => {
        const value = event.target.value;
        const newModifier = Object.assign({}, modifier);

        newModifier.effectiveChange = value;
        newModifier.percentage = isPercentage;

        onChange(newModifier);
    };

    const onTypeSubmitted = (type: ModifierType) => {
        const newModifier = Object.assign({}, modifier);
        //Reset layout of inputs on change of type
        if (modifier.type !== type) {
            newModifier.effectiveChange = 0;
            newModifier.modifiedWorldState = {};
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
            case ModifierType.MODIFY_SKILL_CURRENT_VALUE:
            case ModifierType.MODIFY_SKILL_GAIN_MULTIPLIER_VALUE:
            case ModifierType.MODIFY_POTENTIAL_VALUE:
                return (
                    <AttributeSelectionButton
                        displayIDs={modifier.modifiedWorldState?.attributes}
                        onChange={(value) => onToolPickerSelection(value, ModifierTargetType.ATTRIBUTE_ID)}
                        multi
                    />
                );
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

    const renderModifierValueInput = (): React.ReactElement | null => {
        switch (modifier.type) {
            case ModifierType.MODIFY_SKILL_CURRENT_VALUE:
            case ModifierType.MODIFY_POTENTIAL_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_LOVE_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE:
            case ModifierType.MODIFY_MOOD_VALUE:
            case ModifierType.MODIFY_LEARNING_RATE:
            case ModifierType.MODIFY_ENERGY_MAXIMUM:
            case ModifierType.MODIFY_ENERGY_VALUE:
                return (
                    <TextField
                        value={modifier.effectiveChange}
                        label={t('interface.editor.modifier.input_numeric')}
                        variant="outlined"
                        helperText={t('interface.editor.modifier.input_numeric_helper')}
                        type="number"
                        onChange={(e) => onEffectiveValueChange(e, false)}
                    />
                );
            case ModifierType.MODIFY_ENERGY_GAIN_MULTIPLIER:
            case ModifierType.MODIFY_ENERGY_FALL_MULTIPLIER:
            case ModifierType.MODIFY_SKILL_GAIN_MULTIPLIER_VALUE:
            case ModifierType.MODIFY_STRESS_FALL_MULTIPLIER:
            case ModifierType.MODIFY_STRESS_GAIN_MULTIPLIER:
                return (
                    <TextField
                        value={modifier.effectiveChange}
                        label={t('interface.editor.modifier.input_percent')}
                        variant="outlined"
                        helperText={t('interface.editor.modifier.input_percent_helper')}
                        type="number"
                        onChange={(e) => onEffectiveValueChange(e, true)}
                    />
                );
            default:
                return null;
        }
    };

    const renderEntitySelection = (): React.ReactElement | null => {
        if (!hasSpecificActors()) {
            return;
        }

        switch (modifier.type) {
            case ModifierType.MODIFY_ENTITY_VARIABLE:
                // TODO: Complete following onChange function
                return (
                    <ModifierEntitySelector modifier={modifier} onChange={(modifier) => console.log(modifier)} options={options}/>
                )
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE:
            case ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE:
                return (
                    <AffectedActorsSelect
                        actors={options.specifiedActors}
                        originActors={modifier.modifiedWorldState?.originActor}
                        targetActors={modifier.modifiedWorldState?.receptorActor}
                        onChange={(value, isOrigin) => onToolPickerSelection(value, isOrigin ? ModifierTargetType.ORIGIN_ACTOR : ModifierTargetType.RECEPTOR_ACTOR)}
                        hasOriginActor={true}
                    />
                );
            default:
                return (
                    <AffectedActorsSelect
                        actors={options.specifiedActors}
                        targetActors={modifier.modifiedWorldState?.receptorActor}
                        onChange={(value) => onToolPickerSelection(value, ModifierTargetType.RECEPTOR_ACTOR)}
                        hasOriginActor={false}
                    />
                );
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

                {renderEntitySelection()}

                {renderModifierSelectionInput()}

                {renderModifierValueInput()}
            </Box>

            <ModifierTypeDialog modifier={modifier} onTypeSelect={onTypeSubmitted} open={showTypeModal} onClose={() => setShowTypeModal(false)} options={options} />
        </Box>
    );
}
