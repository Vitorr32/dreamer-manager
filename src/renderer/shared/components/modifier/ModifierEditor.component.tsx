import { Button, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier, ModifierType } from 'renderer/shared/models/base/Modifier';

interface IProps {
    modifier: Modifier;
}

export function ModifierEditor(props: IProps) {
    const theme = useTheme();
    const { t } = useTranslation();

    console.log(theme);
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event);
    };

    return (
        <section className="modifier-editor">
            <div className="modifier-editor__header">
                <Typography variant="h4">{t('interface.editor.modifier.title')}</Typography>
                <Typography variant="subtitle1">{t('interface.editor.modifier.subtitle')}</Typography>
            </div>

            <div className="modifier-editor__specification">
                <Button onClick={() => {}}>Open modal</Button>
                <Modal className="selection-modal" open={true} onClose={() => {}}>
                    <Box className="selection-modal__wrapper" sx={{ bgcolor: 'background.default' }}>
                        <List className="selection-modal__selection selection-modal__selection-primary" component="nav" aria-label="mailbox folders">
                            <ListItem disablePadding>
                                <ListItemText primary={t('interface.editor.modifier.select_type')} secondary={t('interface.editor.modifier.select_type_caption')} />
                            </ListItem>
                            <Divider />
                            <ListItemButton>
                                <ListItemText primary={t('interface.editor.modifier.select_type_attr')} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>
                        </List>
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
