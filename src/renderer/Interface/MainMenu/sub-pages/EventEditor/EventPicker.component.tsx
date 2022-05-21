import { Autocomplete, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { Box, minWidth } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Event } from 'renderer/shared/models/base/Event.model';

interface IProps {
    open: boolean;
    onClose: () => void;
    onSelected: (event: Event) => void;
}

export function EventPicker({ open, onClose, onSelected }: IProps) {
    const { t, i18n } = useTranslation();

    const events: Event[] = useSelector((state: RootState) => state.database.events);
    const [selectedValue, setSelectedValue] = useState<Event>();

    const onSubmit = () => {
        onSelected(selectedValue);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent sx={{ padding: '20px', minWidth: '600px' }}>
                <Typography variant="h5">{t('interface.editor.event.flag_heading')}</Typography>

                <Autocomplete
                    options={events}
                    onChange={(_, newValue: Event) => {
                        setSelectedValue(newValue);
                    }}
                    getOptionLabel={(option) => option.displayName}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                                {option.displayName} -{' '}
                                <Typography sx={{ marginLeft: '10px' }}>
                                    {option.id}
                                </Typography>
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Event" />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit}>{t('interface.editor.event.button_submit_edited_event')}</Button>
            </DialogActions>
        </Dialog>
    );
}
