import { ArrowForward } from '@mui/icons-material';
import { Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { GetModifierTypesOfSection } from 'renderer/shared/utils/EnumOrganizer';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
}

export function ModifierEditor(props: IProps) {
    const { t } = useTranslation();

    const [modifier, setModifier] = React.useState<Modifier>(new Modifier());
    const [showTypeModal, setShowTypeModal] = React.useState<boolean>(false);
    const [selectableTypes, setSelectableTypes] = React.useState<ModifierType[]>([]);
    const [modifierSection, setModifierSection] = React.useState<ModifierTypeSection>();
    const [showInput, setShowInput] = React.useState<boolean>(false);

    const onSectionSelected = (section: ModifierTypeSection) => {
        onTypeSelected(ModifierType.UNDEFINED);

        setSelectableTypes(GetModifierTypesOfSection(section));
        setModifierSection(section);
    };

    const onTypeSelected = (type: ModifierType) => {
        const newModifier = Object.assign({}, modifier);
        newModifier.type = type;

        setModifier(newModifier);
    };

    const onSubmitType = () => {
        setShowTypeModal(false);
        setSelectableTypes([]);
        setModifierSection(undefined);

        setShowInput(true);
    };

    const onEffectiveValueChange = (event: any) => {
        console.log(event);
    };

    return (
        <Box className="modifier-editor" sx={{ bgcolor: 'background.default' }}>
            <div className="modifier-editor__header">
                <Typography variant="h4">{t('interface.editor.modifier.title')}</Typography>
                <Typography variant="subtitle1">{t('interface.editor.modifier.subtitle')}</Typography>
            </div>

            <Box className="modifier-editor__content">
                <Button variant="contained" endIcon={<ArrowForward />} onClick={() => setShowTypeModal(true)}>
                    {modifier.type === ModifierType.UNDEFINED ? t('interface.editor.modifier.select_type') : t(modifier.type)}
                </Button>

                <TextField label={t('interface.editor.modifier.input_numeric')} variant="filled" type="number" onChange={onEffectiveValueChange} />
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
                                        <ListItemButton key={`type_${value}`} selected={value === modifier.type} onClick={() => onTypeSelected(value)}>
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
                        <Button className="selection-modal__footer-submit" disabled={modifier.type === ModifierType.UNDEFINED} variant="contained" onClick={onSubmitType}>
                            {t('interface.editor.modifier.select_type_submit')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
