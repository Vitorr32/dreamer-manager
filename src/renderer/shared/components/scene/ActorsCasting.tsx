import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Modal } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER } from 'renderer/shared/Constants';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Actor, Event } from 'renderer/shared/models/base/Event.model';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';

interface IProps {
    event: Event;
    onEventEdited: (editedEvent: Event) => void;
}

const backgroundImagesGamePath = [IMAGES_FOLDER, BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER];

export function ActorsCasting({ event, onEventEdited }: IProps) {
    const { t, i18n } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActor, setSelectedActor] = useState<Actor>();
    const charactersDB = useSelector((state: RootState) => state.database.mappedDatabase.characters);

    const onCharacterAdded = (): void => {
        const editedEvent = Object.assign({}, event);

        if (editedEvent.actors) {
            editedEvent.actors.push({ dynamic: true });
        } else {
            editedEvent.actors = [{ dynamic: true }];
        }

        onEventEdited(editedEvent);
    };

    const toggleModal = (): void => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <Button onClick={toggleModal}>{t('interface.editor.event.navigate_casting')}</Button>

            <Modal className="modal casting" open={modalOpen} onClose={toggleModal}>
                <Box className="modal__wrapper">
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

                                    <ListItemButton key={key} selected={selectedActor === actor} onClick={() => setSelectedActor(actor)}>
                                        <ListItemText primary={actorName} />
                                    </ListItemButton>;
                                })}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
