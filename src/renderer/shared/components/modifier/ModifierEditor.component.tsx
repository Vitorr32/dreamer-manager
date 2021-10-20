import { Button, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierType, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';

interface IProps {
    modifier: Modifier;
}

export function ModifierEditor(props: IProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    const [showTypeModal, setShowTypeModal] = React.useState<boolean>(false);
    const [showTypeSelection, setShowTypeSelection] = React.useState<boolean>(false);
    const [modifierSection, setModifierSection] = React.useState<ModifierTypeSection>();
    const [modifierType, setModifierType] = React.useState<ModifierType>();

    const onSectionSelected = (section: ModifierTypeSection) => {
        setModifierType(ModifierType.UNDEFINED);
        setModifierSection(section);
        setShowTypeSelection(true);
    };

    const onTypeSelected = (type: ModifierType) => {
        console.log(type);
    };

    return (
        <section className="modifier-editor">
            <div className="modifier-editor__header">
                <Typography variant="h4">{t('interface.editor.modifier.title')}</Typography>
                <Typography variant="subtitle1">{t('interface.editor.modifier.subtitle')}</Typography>
            </div>

            <div className="modifier-editor__specification">
                <Button onClick={() => setShowTypeModal(true)}>Open modal</Button>
                <Modal className="selection-modal" open={showTypeModal} onClose={() => setShowTypeModal(true)}>
                    <Box className="selection-modal__wrapper" sx={{ bgcolor: 'background.default' }}>
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

                        {showTypeSelection && (
                            <List className="selection-modal__selection selection-modal__selection-secondary">
                                <ListItem disablePadding>
                                    <ListItemText primary={t('interface.editor.modifier.select_type')} secondary={t('interface.editor.modifier.select_type_caption')} />
                                </ListItem>

                                <Divider />

                                {Object.values(ModifierType).map((value) => {
                                    return (
                                        <ListItemButton key={`type_${value}`} onClick={() => onTypeSelected(value)}>
                                            <ListItemText primary={t(value)} />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        )}
                    </Box>
                </Modal>

                {/* <FormControl>
                        <InputLabel id="specification-label">Modifier Type</InputLabel>
                        <Select labelId="specification-label" value={modifier.type} label="Age" onChange={this.handleChange.bind(this)}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl> */}
            </div>
        </section>
    );
}
