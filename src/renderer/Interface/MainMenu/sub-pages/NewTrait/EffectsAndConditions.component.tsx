import React, { useState } from 'react';
import { Button, IconButton, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { MAX_NUMBER_OF_EFFECTS } from 'renderer/shared/Constants';
import { EffectEditor } from './EffectEditor.component';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { ModifierType } from 'renderer/shared/models/base/Modifier';
import { Box } from '@mui/system';
import { EffectSummary } from 'renderer/shared/components/summary/EffectSummary.component';

interface IProps {
    previousStep: () => void;
    nextStep: () => void;
    trait: Trait;
    onChange: (trait: Trait) => void;
}

export function EffectsAndConditions({ previousStep, nextStep, onChange, trait }: IProps) {
    const { t } = useTranslation();

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
    const [confirmDialogIndex, setConfirmDialogIndex] = useState<number>(-1);
    const [editEffectIndex, setEditEffectIndex] = useState<number>(-1);

    const onNewEffectAddedToList = (): void => {
        const newTrait = Object.assign({}, trait);
        newTrait.effects.push(new Effect());

        onChange(newTrait);
    };

    const onEditEffect = (index: number, effect: Effect): void => {
        const newTrait = Object.assign({}, trait);
        newTrait.effects[index] = effect;

        onChange(newTrait);
    };

    const onDeleteEffectFromList = (): void => {
        const newTrait = Object.assign({}, trait);
        newTrait.effects.splice(confirmDialogIndex, 1);

        setConfirmDialogIndex(-1);
        setConfirmDeleteOpen(false);
        onChange(newTrait);
    };

    return (
        <Box className="effect-editor">
            <Typography variant="caption">{t('interface.editor.effect.effect_instruction', { max: MAX_NUMBER_OF_EFFECTS })}</Typography>

            <Box className="effect-editor__list-wrapper">
                <List className="effect-editor__list">
                    {trait.effects.map((effect, index) => (
                        <ListItem
                            className="effect-editor__list-item"
                            key={`effect_${index}`}
                            secondaryAction={
                                trait.effects.length !== 1 && (
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
                                    <IconButton onClick={() => setEditEffectIndex(index)}>
                                        <EditIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText
                                primary={t(effect.modifier && effect.modifier.type && effect.modifier.type !== ModifierType.UNDEFINED ? effect.modifier.type : 'interface.editor.effect.unset_modifier')}
                                secondary={effect.modifier && effect.modifier.effectiveChange !== 0 ? effect.modifier.effectiveChange : t('interface.editor.effect.unset_value')}
                            />
                        </ListItem>
                    ))}
                </List>

                {trait.effects.length < MAX_NUMBER_OF_EFFECTS ? (
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={onNewEffectAddedToList}>
                        {t('interface.editor.effect.add_effect')}
                    </Button>
                ) : null}
            </Box>

            {editEffectIndex !== -1 ? <EffectEditor onChange={onEditEffect} index={editEffectIndex} effect={trait.effects[editEffectIndex]} /> : null}

            {trait.effects.map((effect, index) => (
                <EffectSummary key={'effect_' + index} effect={effect} />
            ))}

            <div className="buttons-wrapper">
                <Button color="primary" onClick={previousStep}>
                    {t('interface.commons.previous')}
                </Button>
                <Button color="primary" onClick={nextStep}>
                    {t('interface.commons.next')}
                </Button>
            </div>

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
        </Box>
    );
}
