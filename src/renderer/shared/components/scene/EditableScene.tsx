import { Box, Button, Modal, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER, IMAGES_FOLDER, PLACEHOLDER_EVENT_BACKGROUND } from 'renderer/shared/Constants';
import { Scene } from 'renderer/shared/models/base/Scene.model';
import { ApplyFileProtocol, GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ResourcesSearch } from '../file/ResourcesSearch';

interface IProps {
    scene: Scene;
    onSceneEdited: (scene: Scene) => void;
    pathOfTempImages: { [key: string]: string };
    setPathOfTempImages: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const backgroundImagesGamePath = [IMAGES_FOLDER, BACKGROUND_IMAGES_FOLDER, EVENT_BACKGROUND_IMAGES_FOLDER];

export function EditableScene({ scene, onSceneEdited, pathOfTempImages, setPathOfTempImages }: IProps) {
    const { t, i18n } = useTranslation();
    const [backgroundPath, setBackgroundPath] = useState<string>();
    const [backgroundSelectOpen, setBackgroundSelectState] = useState<boolean>(false);
    const [openGallery, setGalleryState] = useState<boolean>(false);

    useEffect(() => {
        getImageFilePath();
    }, []);

    const getImageFilePath = async () => {
        if (pathOfTempImages[scene.id]) {
            setBackgroundPath(pathOfTempImages[scene.id]);
            return;
        }

        if (scene.backgroundImageName) {
            const file = await GetFileFromResources([...backgroundImagesGamePath, scene.backgroundImageName]);
            setBackgroundPath(file.path);
        } else {
            const file: { path: string; buffer: Buffer } = await window.electron.fileSystem.getFileFromResources([
                IMAGES_FOLDER,
                BACKGROUND_IMAGES_FOLDER,
                PLACEHOLDER_EVENT_BACKGROUND,
            ]);
            setBackgroundPath(ApplyFileProtocol(file.path));
        }
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
        setBackgroundPath(setFilePath);
        setGalleryState(false);
    };

    return (
        <Box className="scene__wrapper">
            <Box className="scene__background">
                <img src={backgroundPath}></img>
                <Box className="scene__background-edit">
                    <Button onClick={() => setBackgroundSelectState(true)}>{t('interface.editor.event.edit_background_cta')}</Button>
                </Box>
            </Box>
            <Box className="scene__actors">

            </Box>
            <Box className="scene__dialogue">
                <Typography variant="h4" className="scene__dialogue-actor">{scene.actors}</Typography>
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
