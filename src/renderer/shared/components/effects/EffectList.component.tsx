import { useState } from 'react';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModifierType } from 'renderer/shared/models/base/Modifier';

interface IProps {
    effects: Effect[];
    onEffectSelected: (index: number, effect: Effect) => void;
    onEffectDeleted: (index: number, effect: Effect) => void;
}

export function EffectList({ effects, onEffectSelected, onEffectDeleted }: IProps) {
    const { t, i18n } = useTranslation();

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
    const [confirmDialogIndex, setConfirmDialogIndex] = useState<number>(-1);

    const onDeleteEffectFromList = () => {
        onEffectDeleted(confirmDialogIndex, effects[confirmDialogIndex]);

        setConfirmDialogIndex(-1);
        setConfirmDeleteOpen(false);
    };

    if (effects.length === 0) {
        return null;
    }

    return (
        <>
            <List className="effect-editor__list">
                {effects.map((effect, index) => (
                    <ListItem
                        className="effect-editor__list-item"
                        key={`effect_${index}`}
                        sx={{ borderColor: 'text.primary' }}
                        secondaryAction={
                            effects.length !== 1 && (
                                <Tooltip title={t('interface.editor.effect.remove_effect') as string}>
                                    <IconButton
                                        onClick={() => {
                                            setConfirmDeleteOpen(true), setConfirmDialogIndex(index);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    >
                        <Tooltip title={t('interface.editor.effect.edit_effect') as string}>
                            <ListItemIcon>
                                <IconButton onClick={() => onEffectSelected(index, effect)}>
                                    <EditIcon />
                                </IconButton>
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText
                            primary={t(
                                effect.modifier && effect.modifier.type && effect.modifier.type !== ModifierType.UNDEFINED
                                    ? effect.modifier.type
                                    : 'interface.editor.effect.unset_modifier'
                            )}
                            secondary={
                                effect.modifier && effect.modifier.modifiedEntityVariable.value !== 0
                                    ? effect.modifier.modifiedEntityVariable.value
                                    : t('interface.editor.effect.unset_value')
                            }
                            sx={{ color: 'text.primary' }}
                        />
                    </ListItem>
                ))}
            </List>

            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <DialogTitle>{t('interface.editor.effect.remove_effect_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t('interface.editor.effect.remove_effect_confirmation')}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        {t('interface.commons.cancel')}
                    </Button>
                    <Button onClick={onDeleteEffectFromList} color="primary" variant="contained">
                        {t('interface.commons.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
