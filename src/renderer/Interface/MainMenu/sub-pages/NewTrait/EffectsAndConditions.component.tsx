import React, { useState } from 'react';
import { Button, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { MAX_NUMBER_OF_TRAITS } from 'renderer/shared/Constants';
import { EffectEditor } from './EffectEditor.component';
import { Trait } from 'renderer/shared/models/base/Trait.model';

interface IProps {
    previousStep: () => void;
    nextStep: () => void;
    trait: Trait;
    onChange: (trait: Trait) => void;
}

export function EffectsAndConditions({ previousStep, nextStep, onChange, trait }: IProps) {
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
    const [confirmDialogIndex, setConfirmDialogIndex] = useState<number>(-1);
    const [editEffectIndex, setEditEffectIndex] = useState<number>(-1);

    const onNewEffectAddedToList = (): void => {};

    const onEditEffect = (index: number, effect: Effect): void => {
        const newTrait = Object.assign({}, trait);
        newTrait.effects[index] = effect;

        onChange(newTrait);
    };

    const onDeleteEffectFromList = (): void => {
        const newTrait = Object.assign({}, trait);
        newTrait.effects = newTrait.effects.splice(confirmDialogIndex, 1);

        setConfirmDialogIndex(-1);
        setConfirmDeleteOpen(false);
        onChange(newTrait);
    };

    console.log(trait);

    return (
        <div id="effect-and-condition-wrapper">
            <span className="instruction">* Here you can create/edit the effects that the new trait will have, each effect can have it's own conditions and modifiers, a single trait can have up to 5 effects.</span>

            <section className="effect-list-wrapper">
                <List className="effect-list">
                    {trait.effects.map((effect, index) => (
                        <ListItem key={`effect_${index}`}>
                            <ListItemIcon>
                                <RemoveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Single-line item" secondary={'Secondary text'} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => {
                                        setConfirmDeleteOpen(true), setConfirmDialogIndex(index);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => setEditEffectIndex(index)}>
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                {trait.effects.length < MAX_NUMBER_OF_TRAITS ? (
                    <Button onClick={onNewEffectAddedToList}>
                        <div>Add new Effect</div>
                        <AddIcon />
                    </Button>
                ) : null}
            </section>

            {editEffectIndex !== -1 ? <EffectEditor onChange={onEditEffect} index={editEffectIndex} effect={trait.effects[editEffectIndex]} /> : null}

            <div className="buttons-wrapper">
                <Button color="primary" onClick={previousStep}>
                    PREVIOUS
                </Button>
                <Button color="primary" onClick={nextStep}>
                    NEXT
                </Button>
            </div>

            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Delete effect confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are you sure you want to delete this effect? This operation cannot be reverted</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={onDeleteEffectFromList} color="primary" variant="contained">
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
