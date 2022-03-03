import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Modal, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER, PLACEHOLDER_EVENT_BACKGROUND, SPRITES_FOLDER } from 'renderer/shared/Constants';
import { Scene } from 'renderer/shared/models/base/Scene.model';
import { ApplyFileProtocol, GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ResourcesSearch } from '../file/ResourcesSearch';
import { Event } from 'renderer/shared/models/base/Event.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';

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
    const [backgroundPath, setBackgroundPath] = useState<{ scene: string; actors: { [key: string]: string } }>();
    const [backgroundSelectOpen, setBackgroundSelectState] = useState<boolean>(false);
    const [openGallery, setGalleryState] = useState<boolean>(false);

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

        setBackgroundPath(imagesPaths);
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
        setBackgroundPath(Object.assign({}, backgroundPath, { scene: backgroundPath }));
        setGalleryState(false);
    };

    const onActorCastChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const modifiedScene = CopyClassInstance(scene);

        if (checked) {
            modifiedScene.addActorToScene(event.target.name);
        } else {
            modifiedScene.removeActorFromScene(event.target.name);
        }

        onSceneEdited(modifiedScene);
    };

    const onActorHighlightChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.toggleActorHighlight(event.target.name, checked);

        onSceneEdited(modifiedScene);
    };

    return (
        <Box className="scene__wrapper">
            <Box className="scene__background">
                <img src={backgroundPath?.scene}></img>
                <Box className="scene__background-edit">
                    <Button onClick={() => setBackgroundSelectState(true)}>{t('interface.editor.event.edit_background_cta')}</Button>
                </Box>
            </Box>

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

            <Box className="scene__dialogue">
                <Typography variant="h4" className="scene__dialogue-actor">
                    {scene.actors?.map((actor) => {
                        <img></img>;
                    })}
                </Typography>
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
        </Box>
    );
}
