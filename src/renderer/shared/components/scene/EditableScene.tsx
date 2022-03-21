import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Modal,
    Tab,
    Tabs,
    TextField,
    Typography,
    MenuItem,
    Select,
    InputLabel,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER, PLACEHOLDER_EVENT_BACKGROUND, SPRITES_FOLDER } from 'renderer/shared/Constants';
import { Scene, BasicAnimations, BASE_ANIMATION_OBJECT } from 'renderer/shared/models/base/Scene.model';
import { ApplyFileProtocol, GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ResourcesSearch } from '../file/ResourcesSearch';
import { Actor, Event } from 'renderer/shared/models/base/Event.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ActorOnScene } from './ActorOnScene';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [selectedAnimation, setSelectedAnimation] = useState<number>(0);

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

        Object.keys(scene.actorsState).forEach(async (actorID) => {
            console.log(actorID);

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

    const onAddAnimationToActor = (actorID: string) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations.push(BASE_ANIMATION_OBJECT);

        onSceneEdited(modifiedScene);
        setSelectedAnimation(modifiedScene.actorsState[actorID].animations.length - 1);
    };

    const onRemoveAnimationToActor = (actorID: string, animationIndex: number) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations.splice(animationIndex);

        onSceneEdited(modifiedScene);
        setSelectedAnimation(0);
    };

    const onAnimationXOffsetChange = (value: number, actorID: string, index: number) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations[index].options.offset.x = value;

        onSceneEdited(modifiedScene);
    };

    const onAnimationYOffsetChange = (value: number, actorID: string, index: number) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations[index].options.offset.y = value;

        onSceneEdited(modifiedScene);
    };

    const onAnimationScaleChange = (value: number, actorID: string, index: number) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations[index].options.scale = value;

        onSceneEdited(modifiedScene);
    };

    const onAnimationTypeChange = (value: BasicAnimations, actorID: string, index: number) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations[index].type = value;

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
                {Object.keys(scene.actorsState).map((actorID, index) => {
                    if (!scene.actorsState[actorID]) {
                        return null;
                    }

                    const currentActor = event.actors.find((actor) => actor.id === actorID);
                    const actorImagePath = imagePaths.actors[actorID];

                    return (
                        actorImagePath && (
                            <ActorOnScene
                                actor={currentActor}
                                key={`dialogue_actor_${index}`}
                                onActorClick={() => onActorPositioning(actorID)}
                                actorImagePath={actorImagePath}
                                animations={scene.actorsState[actorID].animations}
                                isGameCharacter={!!currentActor.characterID}
                            />
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
                                        control={<Checkbox checked={!!scene.actorsState[actor.id] || false} onChange={onActorCastChange} name={actor.id} />}
                                        label={actor.alias}
                                    />
                                ))}

                                {event.actors?.map((actor) => (
                                    <FormControlLabel
                                        key={`scene_highlighted_${actor.id}`}
                                        control={
                                            <Checkbox
                                                disabled={!scene.actorsState[actor.id]}
                                                checked={scene.actorsState[actor.id]?.isHighlighted || false}
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

            <Dialog className="animation" open={!!selectedActor} onClose={() => setSelectedActor(null)}>
                {selectedActor && (
                    <DialogContent>
                        <DialogContentText>{t('interface.editor.event.scene_actor_animation_helper')}</DialogContentText>

                        <TabContext value={selectedAnimation.toString()}>
                            <Box className="animation__tabs">
                                <Tabs value={selectedAnimation} onChange={(_, value) => setSelectedAnimation(value)} aria-label="basic tabs example">
                                    {scene.actorsState[selectedActor.actor.id].animations.map((animation, index) => {
                                        const id = `Animation ${index}`;
                                        return <Tab key={id} label={id} id={id} value={index} />;
                                    })}
                                    <Tab
                                        label={t('interface.editor.event.scene_actor_animation_add')}
                                        onClick={() => onAddAnimationToActor(selectedActor.actor.id)}
                                        value={-1}
                                    />
                                </Tabs>
                            </Box>

                            <Box className="animation__form">
                                {scene.actorsState[selectedActor.actor.id].animations.map((animation, index) => (
                                    <TabPanel value={index.toString()} key={`animation_tab_panel_${index}`}>
                                        {index !== 0 && (
                                            <Button onClick={() => onRemoveAnimationToActor(selectedActor.actor.id, index)}>
                                                <DeleteIcon />
                                            </Button>
                                        )}

                                        <FormControl fullWidth>
                                            <InputLabel>{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                                            <Select
                                                value={animation.type}
                                                onChange={(event) => onAnimationTypeChange(event.target.value as BasicAnimations, selectedActor.actor.id, index)}
                                            >
                                                <MenuItem value={BasicAnimations.IDLE}>{t(BasicAnimations.IDLE)}</MenuItem>
                                                <MenuItem value={BasicAnimations.FADE_IN}>{t(BasicAnimations.FADE_IN)}</MenuItem>
                                                <MenuItem value={BasicAnimations.FADE_OUT}>{t(BasicAnimations.FADE_OUT)}</MenuItem>
                                                <MenuItem value={BasicAnimations.MOVE_LEFT}>{t(BasicAnimations.MOVE_LEFT)}</MenuItem>
                                                <MenuItem value={BasicAnimations.MOVE_RIGHT}>{t(BasicAnimations.MOVE_RIGHT)}</MenuItem>
                                                <MenuItem value={BasicAnimations.GET_CLOSER}>{t(BasicAnimations.GET_CLOSER)}</MenuItem>
                                                <MenuItem value={BasicAnimations.GET_FARTHER}>{t(BasicAnimations.GET_FARTHER)}</MenuItem>
                                            </Select>
                                            <FormHelperText>{t('interface.editor.event.scene_actor_animation_type_helper')}</FormHelperText>
                                        </FormControl>

                                        <TextField
                                            type="number"
                                            label={t('interface.editor.event.scene_actor_x_offset')}
                                            helperText={t('interface.editor.event.scene_actor_x_offset_helper')}
                                            variant="outlined"
                                            value={animation.options?.offset.x || 0}
                                            onChange={(event) => onAnimationXOffsetChange(Number(event.target.value), selectedActor.actor.id, index)}
                                        />

                                        <TextField
                                            type="number"
                                            label={t('interface.editor.event.scene_actor_y_offset')}
                                            helperText={t('interface.editor.event.scene_actor_y_offset_helper')}
                                            variant="outlined"
                                            value={animation.options?.offset.y || 0}
                                            onChange={(event) => onAnimationYOffsetChange(Number(event.target.value), selectedActor.actor.id, index)}
                                        />

                                        <TextField
                                            type="number"
                                            label={t('interface.editor.event.scene_actor_animation_scale_label')}
                                            helperText={t('interface.editor.event.scene_actor_animation_scale_helper')}
                                            variant="outlined"
                                            value={animation.options.scale || 0}
                                            onChange={(event) => onAnimationYOffsetChange(Number(event.target.value), selectedActor.actor.id, index)}
                                        />
                                    </TabPanel>
                                ))}
                            </Box>
                        </TabContext>
                    </DialogContent>
                )}
            </Dialog>
        </Box>
    );
}
