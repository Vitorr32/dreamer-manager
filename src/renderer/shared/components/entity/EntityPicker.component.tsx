import { Autocomplete, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    entity: EntityType;
    // Labels from the i18next
    pickerTitle: string;
    pickerLabel: string;
    // Key for data display
    getDisplayName: (entity: any) => string;
    getImagePath?: (entity: any) => string;

    open: boolean;
    onClose: () => void;
    onSelected: (entitySelected: any) => void;
}

export function EntityPicker({ entity, pickerTitle, getDisplayName, open, pickerLabel, onClose, onSelected }: IProps) {
    const { t, i18n } = useTranslation();

    const entities: any[] = useSelector((state: RootState) => {
        switch (entity) {
            case EntityType.TRAITS:
                return state.database.traits;
            case EntityType.CHARACTERS:
                return state.database.characters;
            default:
                return [];
        }
    });
    const [selectedValue, setSelectedValue] = useState<any>();

    const onSubmit = () => {
        onSelected(selectedValue);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent sx={{ padding: '20px', minWidth: '600px' }}>
                <Typography variant="h5">{pickerTitle}</Typography>

                <Autocomplete
                    options={entities}
                    onChange={(_, newValue: any | string) => setSelectedValue(newValue)}
                    getOptionLabel={(option: any | string) => getDisplayName(option)}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                                {getDisplayName(option)}
                            </Typography>
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label={pickerLabel} />}
                />

                {selectedValue && <></>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit}>{t('interface.commons.submit')}</Button>
            </DialogActions>
        </Dialog>
    );
}
