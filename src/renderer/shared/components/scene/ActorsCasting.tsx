import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { BACKGROUND_IMAGES_FOLDER, GENERIC_SPRITES_FOLDER, IMAGES_FOLDER, PLACEHOLDER_ACTOR_SPRITE, SPRITES_FOLDER } from 'renderer/shared/Constants';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Actor, ActorType, Event } from 'renderer/shared/models/base/Event.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ConditionTreeEditor } from '../condition/ConditionTreeEditor.component';
import { v4 as uuidv4 } from 'uuid';
import { ApplyFileProtocol, GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ResourcesSearch } from '../file/ResourcesSearch';

interface IProps {
    event: Event;
    onEventEdited: (editedEvent: Event) => void;
    pathOfTempImages: { [key: string]: string };
    setPathOfTempImages: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const spriteGamePath = [SPRITES_FOLDER];

export function ActorsCasting({ event, onEventEdited, pathOfTempImages, setPathOfTempImages }: IProps) {
    const { t, i18n } = useTranslation();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActor, setSelectedActor] = useState<Actor>();
    const [selectedActorSpritePath, setSelectedActorSpritePath] = useState<string>();
    const [selectedActorIndex, setSelectedActorIndex] = useState<number>();
    const [spriteSelectModalOpen, setSpriteSelectModalState] = useState<boolean>(false);
    const [openGallery, setGalleryState] = useState<boolean>(false);
    const charactersDB = useSelector((state: RootState) => state.database.mappedDatabase.characters);

    useEffect(() => {
        if (selectedActor) {
            getImageFilePath();
        }
    }, [selectedActor]);

    const getImageFilePath = async () => {
        if (pathOfTempImages[selectedActor.id]) {
            setSelectedActorSpritePath(pathOfTempImages[selectedActor.id]);
            return;
        }

        if (selectedActor.spriteFilePath) {
            const file = await GetFileFromResources([...spriteGamePath, ...selectedActor.spriteFilePath]);
            setSelectedActorSpritePath(file.path);
        } else {
            const file: { path: string; buffer: Buffer } = await window.electron.fileSystem.getFileFromResources([
                ...spriteGamePath,
                GENERIC_SPRITES_FOLDER,
                PLACEHOLDER_ACTOR_SPRITE,
            ]);
            setSelectedActorSpritePath(ApplyFileProtocol(file.path));
        }
    };

    const onCharacterAdded = (): void => {
        const editedEvent = Object.assign({}, event);
        const newActor: Actor = {
            actorType: ActorType.GENERIC_TYPE,
            id: `actor_${uuidv4()}`,
            alias: `${t('model.event.actor')}_${editedEvent.actors?.length || 0}`,
            spriteFilePath: [GENERIC_SPRITES_FOLDER, PLACEHOLDER_ACTOR_SPRITE],
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

    const onActorTypeChange = (originalActor: Actor, value: ActorType, index: number) => {
        const newActor = CopyClassInstance(originalActor);
        const modifiedEvent = CopyClassInstance(event);

        switch (value) {
            case ActorType.DYNAMIC_TYPE:
                newActor.characterID = null;
            case ActorType.GENERIC_TYPE:
                newActor.characterID = null;
                newActor.actorCastingCondition = null;
        }

        newActor.actorType = value;
        modifiedEvent.actors[index] = newActor;

        console.log(modifiedEvent.actors[index]);

        onEventEdited(modifiedEvent);
        setSelectedActor(newActor);
        setSelectedActorIndex(index);
    };

    const onActorAliasChange = (originalActor: Actor, value: string, index: number) => {
        const newActor = CopyClassInstance(originalActor);
        const modifiedEvent = CopyClassInstance(event);

        newActor.alias = value;
        modifiedEvent.actors[index] = newActor;

        onEventEdited(modifiedEvent);
        setSelectedActor(newActor);
        setSelectedActorIndex(index);
    };

    const onSpriteSelected = async (fileName: string, filePath: string, internalPath: string[] = [], internal: boolean = true): Promise<void> => {
        if (!fileName || !filePath) {
            return;
        }

        let setFilePath = internal
            ? (await GetFileFromResources(internalPath)).path
            : ApplyFileProtocol(await window.electron.fileSystem.saveFilesToTempFolder([{ name: fileName, path: filePath }]));

        //If the file selected is not internal, it should be added to the temp paths as it was copied to temp folder.
        if (!internal) {
            const newTempPaths = Object.assign({}, pathOfTempImages);
            newTempPaths[selectedActor.id] = setFilePath;

            setPathOfTempImages(newTempPaths);
        } else {
            const newActor = CopyClassInstance(selectedActor);
            newActor.spriteFilePath = [fileName];
        }

        setSpriteSelectModalState(false);
        setSelectedActorSpritePath(setFilePath);
        setGalleryState(false);
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
                                    const actorName =
                                        actor.actorType === ActorType.DYNAMIC_TYPE || actor.actorType === ActorType.GENERIC_TYPE
                                            ? actor.alias
                                            : actor.characterID
                                            ? charactersDB[actor.characterID].name
                                            : actor.alias;

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
                                <Typography variant="h4">{t('interface.editor.event.casting_actor_heading')}</Typography>

                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">{t('interface.editor.event.casting_actor_type_heading')}</FormLabel>
                                    <RadioGroup
                                        defaultValue={ActorType.GENERIC_TYPE}
                                        onChange={(event) => onActorTypeChange(selectedActor, event.target.value as any, selectedActorIndex)}
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={ActorType.GENERIC_TYPE}
                                            label={t('interface.editor.event.casting_is_generic') as string}
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={ActorType.DYNAMIC_TYPE}
                                            label={t('interface.editor.event.casting_is_dynamic') as string}
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={ActorType.SPECIFIC_TYPE}
                                            label={t('interface.editor.event.casting_is_specific') as string}
                                        />
                                    </RadioGroup>

                                    <FormHelperText>{t('interface.editor.event.casting_actor_type_helper')}</FormHelperText>
                                </FormControl>

                                {(selectedActor.actorType === ActorType.DYNAMIC_TYPE || selectedActor.actorType === ActorType.GENERIC_TYPE) && (
                                    <TextField
                                        label={t('interface.editor.event.casting_alias')}
                                        helperText={t('interface.editor.event.casting_alias_helper')}
                                        variant="outlined"
                                        value={selectedActor.alias}
                                        onChange={(event) => onActorAliasChange(selectedActor, event.target.value as string, selectedActorIndex)}
                                    />
                                )}

                                {selectedActor.actorType === ActorType.SPECIFIC_TYPE && <></>}

                                {selectedActor.actorType === ActorType.GENERIC_TYPE && (
                                    <Box className="basic-info__image-input">
                                        <Typography variant="overline"> {t('interface.editor.event.casting_sprite')}</Typography>

                                        <Button onClick={() => setSpriteSelectModalState(true)}>{t('interface.editor.event.casting_sprite_cta')}</Button>

                                        <Box className="basic-info__image-current">
                                            <img src={selectedActorSpritePath} alt={`${selectedActor.alias}_icon`} />
                                        </Box>

                                        <Typography variant="caption">{t('interface.editor.event.casting_sprite_helper')}</Typography>

                                        <Modal className="modal" open={spriteSelectModalOpen} onClose={() => setSpriteSelectModalState(false)}>
                                            <Box className="modal__wrapper modal__wrapper-small">
                                                <Button variant="contained" component="label" htmlFor="imageSelection">
                                                    {t('interface.editor.event.background_file_search')}
                                                    <input
                                                        id="imageSelection"
                                                        name="avatar"
                                                        type="file"
                                                        hidden
                                                        onChange={({ target }) => onSpriteSelected(target.files[0].name, target.files[0].path, null, false)}
                                                        accept="image/*"
                                                    />
                                                </Button>

                                                <Button onClick={() => setGalleryState(true)}>{t('interface.editor.event.background_resources_search')}</Button>

                                                {openGallery && <ResourcesSearch onResourceSelected={onSpriteSelected} rootFolder={[SPRITES_FOLDER]} />}
                                            </Box>
                                        </Modal>
                                    </Box>
                                )}

                                {selectedActor.actorType === ActorType.DYNAMIC_TYPE && (
                                    <>
                                        {!selectedActor.actorCastingCondition && (
                                            <Button onClick={() => addActorConditionToActor(selectedActor, selectedActorIndex)}>
                                                {t('interface.editor.event.casting_actor_add_condition')}
                                            </Button>
                                        )}

                                        {selectedActor.actorCastingCondition && (
                                            <ConditionTreeEditor
                                                conditionTree={selectedActor.actorCastingCondition}
                                                onChange={(conditionTree) => onActorConditionEdited(selectedActor, selectedActorIndex, conditionTree)}
                                            />
                                        )}
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
