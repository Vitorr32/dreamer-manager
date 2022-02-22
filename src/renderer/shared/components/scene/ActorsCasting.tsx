import { Box, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER } from 'renderer/shared/Constants';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Event } from 'renderer/shared/models/base/Event.model';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';

interface IProps {
    event: Event;
    onEventEdited: (editedEvent: Event) => void;
    pathOfTempImages: { [key: string]: string };
    setPathOfTempImages: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const backgroundImagesGamePath = [IMAGES_FOLDER, BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER];

export function ActorsCasting({ event, onEventEdited, pathOfTempImages, setPathOfTempImages }: IProps) {
    const { t, i18n } = useTranslation();

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

    return (
        <Box className="scene__wrapper">
            <Button onClick={onCharacterAdded}>{t('interface.editor.event.add_actor')}</Button>

            {event.actors?.map((actor, index) => {
                if (actor.dynamic) {
                    return <Button>Actor {index}</Button>;
                } else {
                    return <Button>{charactersDB[actor.characterID]}</Button>;
                }
            })}
        </Box>
    );
}
