import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { GetModifierTypesOfSection } from 'renderer/shared/utils/EnumOrganizer';
import { AttributeSelectionButton } from '../buttons/AttributeSelectionButton.component';
import { TraitSelectionButton } from '../buttons/TraitSelectionButton';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    filteredTypes?: ModifierTypeSection[];
}

export function ModifierEditor({ modifier, onChange, filteredTypes }: IProps) {
    const { t } = useTranslation();

    const [showTypeModal, setShowTypeModal] = React.useState<boolean>(false);
    const [selectableTypes, setSelectableTypes] = React.useState<ModifierType[]>([]);
    const [modifierSection, setModifierSection] = React.useState<ModifierTypeSection>();
    const [tempType, setTempType] = React.useState<ModifierType>(ModifierType.UNDEFINED);

    const onSectionSelected = (section: ModifierTypeSection) => {
        onTypeSelected(ModifierType.UNDEFINED);

        setSelectableTypes(GetModifierTypesOfSection(section, filteredTypes));
        setModifierSection(section);
    };

    const onTypeSelected = (type: ModifierType) => {
        setTempType(type);
    };

    const onEffectiveValueChange = (event: any, isPercentage: boolean) => {
        const value = event.target.value;
        const newModifier = Object.assign({}, modifier);

        newModifier.effectiveChange = value;
        newModifier.percentage = isPercentage;

        onChange(newModifier);
    };

    const onSubmitType = () => {
        const newModifier = Object.assign({}, modifier);
        //Reset layout of inputs on change of type
        if (modifier.type !== tempType) {
            newModifier.effectiveChange = 0;
            newModifier.modifierTargets = [];
        }

        newModifier.type = tempType;

        setShowTypeModal(false);
        setSelectableTypes([]);
        setModifierSection(undefined);
        setTempType(ModifierType.UNDEFINED);

        onChange(newModifier);
    };

    const onToolPickerSelection = (selection: string[] | undefined) => {
        if (!selection) {
            throw new Error('The selection is not empty but has no Identifier variable');
        }

        const newModifier = Object.assign({}, modifier);
        newModifier.modifierTargets = selection;

        onChange(newModifier);
    };

    const renderModifierSelectionInput = (): React.ReactElement | null => {
        switch (modifier.type) {
            case ModifierType.MODIFY_SKILL_CURRENT_VALUE:
            case ModifierType.MODIFY_SKILL_GAIN_MULTIPLIER_VALUE:
            case ModifierType.MODIFY_SKILL_POTENTIAL_VALUE:
                return <AttributeSelectionButton displayIDs={modifier.modifierTargets} onChange={onToolPickerSelection} multi/>;
            case ModifierType.MODIFY_TRAIT_GAIN:
            case ModifierType.MODIFY_TRAIT_REMOVE:
                return <TraitSelectionButton displayIDs={modifier.modifierTargets} onChange={onToolPickerSelection} />;
            default:
                return null;
        }
    };

    const renderModifierValueInput = (): React.ReactElement | null => {
        switch (modifier.type) {
            case ModifierType.MODIFY_SKILL_CURRENT_VALUE:
            case ModifierType.MODIFY_SKILL_POTENTIAL_VALUE:
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

                {renderModifierSelectionInput()}

                {renderModifierValueInput()}
            </Box>

            <Modal className="selection-modal" open={showTypeModal} onClose={() => setShowTypeModal(false)}>
                <Box className="selection-modal__wrapper" sx={{ bgcolor: 'background.default' }}>
                    <Box className="selection-modal__selection-wrapper">
                        <List className="selection-modal__selection selection-modal__selection-primary">
                            <ListItem disablePadding>
                                <ListItemText primary={t('interface.editor.modifier.select_type')} secondary={t('interface.editor.modifier.select_type_caption')} />
                            </ListItem>

                            <Divider />

                            {Object.values(ModifierTypeSection).map((value) => {
                                if (filteredTypes?.includes(value)) {
                                    return null;
                                }

                                return (
                                    <ListItemButton key={`section_${value}`} selected={value === modifierSection} onClick={() => onSectionSelected(value)}>
                                        <ListItemText primary={t(value)} />
                                    </ListItemButton>
                                );
                            })}
                        </List>

                        {selectableTypes?.length !== 0 && (
                            <List className="selection-modal__selection selection-modal__selection-secondary">
                                {selectableTypes.map((value) => {
                                    return (
                                        <ListItemButton key={`type_${value}`} selected={value === tempType} onClick={() => onTypeSelected(value)}>
                                            <ListItemText primary={t(value)} />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        )}
                    </Box>

                    <Box className="selection-modal__footer">
                        {modifier.type === ModifierType.UNDEFINED && (
                            <Typography variant="caption" className="selection-modal__footer-message">
                                {t('interface.editor.modifier.select_type_empty')}
                            </Typography>
                        )}
                        <Button className="selection-modal__footer-submit" disabled={tempType === ModifierType.UNDEFINED} variant="contained" onClick={onSubmitType}>
                            {t('interface.editor.modifier.select_type_submit')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
