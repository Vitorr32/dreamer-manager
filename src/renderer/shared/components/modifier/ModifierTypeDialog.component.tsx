import { Button, Dialog, DialogContent, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { GetModifierTypesOfSection } from 'renderer/shared/utils/EnumOrganizer';

interface IProps {
    modifier: Modifier;
    open: boolean;
    onClose: () => void;
    onTypeSelect: (type: ModifierType) => void;
    options?: EffectEditorOptions;
}

export function ModifierTypeDialog({ modifier, onTypeSelect, open, onClose, options }: IProps) {
    const { t } = useTranslation();

    const [selectableTypes, setSelectableTypes] = React.useState<ModifierType[]>([]);
    const [modifierSection, setModifierSection] = React.useState<ModifierTypeSection>();
    const [tempType, setTempType] = React.useState<ModifierType>(ModifierType.UNDEFINED);

    const onSectionSelected = (section: ModifierTypeSection) => {
        onTypeSelected(ModifierType.UNDEFINED);

        setSelectableTypes(GetModifierTypesOfSection(section, options && options.filteredTypes ? options.filteredTypes : []));
        setModifierSection(section);
    };

    const onTypeSelected = (type: ModifierType) => {
        setTempType(type);
    };

    const onSubmitType = () => {
        const newModifier = Object.assign({}, modifier);
        newModifier.type = tempType;

        onTypeSelect(tempType);
        setSelectableTypes([]);
        setModifierSection(undefined);
        setTempType(ModifierType.UNDEFINED);
    };

    return (
        <Dialog className="selection-modal" open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
            <DialogContent sx={{ backgroundColor: 'background.default' }}>
                <Box className="selection-modal__selection-wrapper">
                    <List className="selection-modal__selection selection-modal__selection-primary">
                        <ListItem disablePadding>
                            <ListItemText primary={t('interface.editor.modifier.select_type')} secondary={t('interface.editor.modifier.select_type_caption')} />
                        </ListItem>

                        <Divider />

                        {Object.values(ModifierTypeSection).map((value) => {
                            if (options && options.filteredTypes && options.filteredTypes?.includes(value)) {
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
            </DialogContent>
        </Dialog>
    );
}
