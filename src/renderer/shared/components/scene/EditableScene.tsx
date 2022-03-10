import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Modal, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER, PLACEHOLDER_EVENT_BACKGROUND, SPRITES_FOLDER } from 'renderer/shared/Constants';
import { Scene } from 'renderer/shared/models/base/Scene.model';
import { ApplyFileProtocol, GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ResourcesSearch } from '../file/ResourcesSearch';
import { Actor, Event } from 'renderer/shared/models/base/Event.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    readonly event: Event;
    scene: Scene;
    onSceneEdited: (scene: Scene) => void;
    pathOfTempImages: { [key: string]: string };
    setPathOfTempImages: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const backgroundImagesGamePath = [IMAGES_FOLDER, BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER];
const spriteGamePath = [SPRITES_FOLDER];

export function EditableScene({ event, scene, onSceneEdited, pathOfTempImages, setPathOfTempImages }: IProps) {
    const { t, i18n } = useTranslation();
    const [imagePaths, setImagePaths] = useState<{ scene: string; actors: { [key: string]: string } }>();
    const [backgroundSelectOpen, setBackgroundSelectState] = useState<boolean>(false);
    const [openGallery, setGalleryState] = useState<boolean>(false);
    const [selectedActor, setSelectedActor] = useState<{ actor: Actor; index: number }>();

    useEffect(() => {
        getImageFilePath();
    }, []);

    const getImageFilePath = async () => {
        const imagesPaths: { scene: string; actors: { [key: string]: string } } = {
            scene: '',
            actors: {},
        };

        if (pathOfTempImages[scene.id]) {
            imagesPaths.scene = pathOfTempImages[scene.id];
        } else if (scene.backgroundImageName) {
            const file = await GetFileFromResources([...backgroundImagesGamePath, scene.backgroundImageName]);
            imagesPaths.scene = file.path;
        } else {
            const file: { path: string; buffer: Buffer } = await window.electron.fileSystem.getFileFromResources([
                IMAGES_FOLDER,
                BACKGROUND_IMAGES_FOLDER,
                PLACEHOLDER_EVENT_BACKGROUND,
            ]);
            imagesPaths.scene = ApplyFileProtocol(file.path);
        }

        scene.actors?.forEach(async (actorID) => {
            const actor = event.actors.find((actor) => actorID === actor.id);

            if (pathOfTempImages[actor.id]) {
                imagesPaths.actors[actorID] = pathOfTempImages[actor.id];
            } else {
                const file = await GetFileFromResources([...spriteGamePath, ...actor.spriteFilePath]);
                imagesPaths.actors[actorID] = file.path;
            }
        });

        setImagePaths(imagesPaths);
    };

    const onBackgroundSelected = async (fileName: string, filePath: string, internalPath: string[] = [], internal: boolean = true): Promise<void> => {
        if (!fileName || !filePath) {
            return;
        }

        let setFilePath = internal
            ? (await GetFileFromResources(internalPath)).path
            : ApplyFileProtocol(await window.electron.fileSystem.saveFilesToTempFolder([{ name: fileName, path: filePath }]));

        //If the file selected is not internal, it should be added to the temp paths as it was copied to temp folder.
        if (!internal) {
            const newTempPaths = Object.assign({}, pathOfTempImages);
            newTempPaths[scene.id] = setFilePath;

            setPathOfTempImages(newTempPaths);
        } else {
            const newScene = Object.assign({}, scene);
            newScene.backgroundImageName = fileName;
        }

        setBackgroundSelectState(false);
        setImagePaths(Object.assign({}, imagePaths, { scene: setFilePath }));
        setGalleryState(false);
    };

    const onActorCastChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const modifiedScene = CopyClassInstance(scene);

        if (checked) {
            modifiedScene.addActorToScene(event.target.name);
            saveImageOfSpecificActor(event.target.name);
        } else {
            modifiedScene.removeActorFromScene(event.target.name);
        }

        onSceneEdited(modifiedScene);
    };

    const saveImageOfSpecificActor = async (actorID: string) => {
        const newImagePaths = CopyClassInstance(imagePaths);
        const actorInEvent = event.actors.find((actor) => actor.id === actorID);

        if (!actorInEvent) {
            console.error('Editable Scene - saveImageOfSpecificActor() - No actor of such id on this event');
            return;
        }

        if (pathOfTempImages[actorInEvent.id]) {
            newImagePaths.actors[actorID] = pathOfTempImages[actorInEvent.id];
        } else {
            const file = await GetFileFromResources([...spriteGamePath, ...actorInEvent.spriteFilePath]);
            newImagePaths.actors[actorID] = file.path;
        }

        setImagePaths(newImagePaths);
    };

    const onActorHighlightChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.toggleActorHighlight(event.target.name, checked);

        onSceneEdited(modifiedScene);
    };

    const onActorPositioning = (actorID: string) => {
        const actorIndex = event.actors.findIndex((actor) => actor.id === actorID);
        const actor = event.actors[actorIndex];

        setSelectedActor({ actor, index: actorIndex });
    };

    const onDialogueEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const modifiedScene = CopyClassInstance(scene);
        modifiedScene.dialog = event.target.value;

        onSceneEdited(modifiedScene);
    };

    return (
        <Box className="scene__wrapper utils__full-height">
            <Box className="scene__stage">
                {/* Change background button render on the stage //////////////////// */}
                <Box className="scene__background-edit utils__full-width-absolute-child=">
                    <Button onClick={() => setBackgroundSelectState(true)}>{t('interface.editor.event.edit_background_cta')}</Button>
                </Box>
                {/* Background render on the stage ////////////////////////////////// */}
                <img className="scene__background utils__full-width-absolute-child utils__full-height" src={imagePaths?.scene}></img>

                {/* Actors render on the stage ////////////////////////////////////// */}
                {scene.actors?.map((actorID, index) => {
                    let actorImagePath;

                    if (imagePaths) {
                        actorImagePath = imagePaths.actors[actorID];
                    }

                    return (
                        actorImagePath && (
                            <Box className="scene__dialogue-actor" key={`dialogue_actor_${index}`} onClick={() => onActorPositioning(actorID)}>
                                <img src={actorImagePath} alt={actorID} />
                            </Box>
                        )
                    );
                })}

                {/* Dialogue box render on the stage ////////////////////////////////// */}
                <Box className="scene__dialogue">
                    <Box className="scene__dialogue-wrapper">
                        <TextField
                            className="scene__dialogue-box"
                            multiline
                            maxRows={4}
                            variant="outlined"
                            value={scene.dialog}
                            onChange={onDialogueEdit}
                            placeholder={t('interface.editor.event.scene_dialogue_placeholder')}
                        />
                        <EditIcon className="scene__dialogue-icon" />
                    </Box>
                </Box>
            </Box>

            <Box className="scene__config">
                <Box className="scene__actors">
                    {event.actors && event.actors.length !== 0 ? (
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend">{t('interface.editor.event.scene_casting')}</FormLabel>
                            <FormGroup>
                                {event.actors?.map((actor) => (
                                    <FormControlLabel
                                        key={`scene_${actor.id}`}
                                        control={<Checkbox checked={scene.actors?.includes(actor.id) || false} onChange={onActorCastChange} name={actor.id} />}
                                        label={actor.alias}
                                    />
                                ))}

                                {event.actors?.map((actor) => (
                                    <FormControlLabel
                                        key={`scene_highlighted_${actor.id}`}
                                        control={
                                            <Checkbox
                                                disabled={!scene.actors?.includes(actor.id)}
                                                checked={scene.highlighted?.includes(actor.id) || false}
                                                onChange={onActorHighlightChange}
                                                name={actor.id}
                                            />
                                        }
                                        label={actor.alias}
                                    />
                                ))}
                            </FormGroup>
                            <FormHelperText>{t('interface.editor.event.scene_casting_helper')}</FormHelperText>
                        </FormControl>
                    ) : (
                        <Typography>{t('interface.editor.event.scene_casting_no_actors')}</Typography>
                    )}
                </Box>
            </Box>

            <Modal className="modal" open={backgroundSelectOpen} onClose={() => setBackgroundSelectState(false)}>
                <Box className="modal__wrapper modal__wrapper-small">
                    <Button variant="contained" component="label" htmlFor="imageSelection">
                        {t('interface.editor.event.background_file_search')}
                        <input
                            id="imageSelection"
                            name="avatar"
                            type="file"
                            hidden
                            onChange={({ target }) => onBackgroundSelected(target.files[0].name, target.files[0].path, null, false)}
                            accept="image/*"
                        />
                    </Button>

                    <Button onClick={() => setGalleryState(true)}>{t('interface.editor.event.background_resources_search')}</Button>

                    {openGallery && <ResourcesSearch onResourceSelected={onBackgroundSelected} rootFolder={[IMAGES_FOLDER, BACKGROUND_IMAGES_FOLDER]} />}
                </Box>
            </Modal>

            <Modal className="modal" open={selectedActor !== null} onClose={() => setSelectedActor(null)}>
                <Box className="modal__wrapper modal__wrapper-small">
                    {/* TODO: Think of best way to save in scene the actor/highlight/animation for each actor */}
                    {/* <TextField
                        label={t('interface.editor.event.scene_actor_x_offset')}
                        helperText={t('interface.editor.event.scene_actor_x_offset_helper')}
                        variant="outlined"
                        value={selectedActor.actor.}
                        onChange={(event) => onActorAliasChange(selectedActor, event.target.value as string, selectedActorIndex)}
                    /> */}
                </Box>
            </Modal>
        </Box>
    );
}
