import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER } from 'renderer/shared/Constants';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Actor, Event } from 'renderer/shared/models/base/Event.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ConditionTreeEditor } from '../condition/ConditionTreeEditor.component';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    event: Event;
    onEventEdited: (editedEvent: Event) => void;
}

const backgroundImagesGamePath = [IMAGES_FOLDER, BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER];

export function ActorsCasting({ event, onEventEdited }: IProps) {
    const { t, i18n } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActor, setSelectedActor] = useState<Actor>();
    const [selectedActorIndex, setSelectedActorIndex] = useState<number>();
    const charactersDB = useSelector((state: RootState) => state.database.mappedDatabase.characters);

    const onCharacterAdded = (): void => {
        const editedEvent = Object.assign({}, event);
        const newActor: Actor = {
            dynamic: true,
            id: `actor_${uuidv4()}`,
            alias: `${t('model.event.actor')}_${editedEvent.actors?.length || 0}`,
        };

        if (editedEvent.actors) {
            editedEvent.actors.push(newActor);
        } else {
            editedEvent.actors = [newActor];
        }

        onEventEdited(editedEvent);
    };

    const onActorConditionEdited = (originalActor: Actor, indexOfActor: number, updatedTree: ConditionTree): void => {
        const newActor = Object.assign({}, originalActor);
        const modifiedEvent = Object.assign({}, event);

        newActor.actorCastingCondition = updatedTree;
        modifiedEvent.actors[indexOfActor] = newActor;

        onEventEdited(modifiedEvent);
    };

    const toggleModal = (): void => {
        setModalOpen(!modalOpen);
    };

    const onActorSelected = (actor: Actor, index: number): void => {
        setSelectedActor(actor);
        setSelectedActorIndex(index);
    };

    const addActorConditionToActor = (originalActor: Actor, index: number): void => {
        const newActor = Object.assign({}, originalActor);
        const modifiedEvent = CopyClassInstance(event);

        newActor.actorCastingCondition = new ConditionTree();
        modifiedEvent.actors[index] = newActor;

        onEventEdited(modifiedEvent);
        setSelectedActor(newActor);
        setSelectedActorIndex(index);
    };

    return (
        <>
            <Button onClick={toggleModal}>{t('interface.editor.event.navigate_casting')}</Button>

            <Modal className="modal casting" open={modalOpen} onClose={toggleModal}>
                <Box className="modal__wrapper modal__wrapper-large">
                    <Button onClick={onCharacterAdded}>{t('interface.editor.event.add_actor')}</Button>

                    <Box className="modal__content casting__content">
                        <Box className="casting__actors">
                            <List className="casting__actors-list">
                                <ListItem disablePadding>
                                    <ListItemText primary={t('interface.editor.event.casting_heading')} secondary={t('interface.editor.event.casting_sub_heading')} />
                                </ListItem>

                                <Divider />

                                {event.actors?.map((actor, index) => {
                                    const key = `actor_${index}`;
                                    const actorName = actor.dynamic ? `Actor ${index}` : charactersDB[actor.characterID].name;

                                    return (
                                        <ListItemButton key={key} selected={selectedActor === actor} onClick={() => onActorSelected(actor, index)}>
                                            <ListItemText primary={actorName} />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </Box>

                        {selectedActor && (
                            <Box className="casting__details">
                                {!selectedActor.actorCastingCondition && (
                                    <Button onClick={() => addActorConditionToActor(selectedActor, selectedActorIndex)}>
                                        {t('interface.editor.event.casting_actor_add_conditoin')}
                                    </Button>
                                )}

                                {selectedActor.actorCastingCondition && (
                                    <ConditionTreeEditor
                                        conditionTree={selectedActor.actorCastingCondition}
                                        onChange={(conditionTree) => onActorConditionEdited(selectedActor, selectedActorIndex, conditionTree)}
                                    />
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
