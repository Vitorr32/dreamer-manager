import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Scene } from 'renderer/shared/models/base/Scene.model';

interface IProps {
    scene: Scene;
    onSceneEdited: (scene: Scene) => void;
}

export function EditableScene({ scene }: IProps) {
    const { t, i18n } = useTranslation();

    // useEffect(() => {
    //     async function getTraitFilePath() {
    //         //Check if there is already a temporary icon path set.
    //         if (iconPath) {
    //             return;
    //         }

    //         if (trait.spriteName) {
    //             const filePath = await GetFileFromResources([ICONS, TRAITS, trait.spriteName]);
    //             setTempImage(filePath);
    //         } else {
    //             //Get the placeholder icon for trait
    //             const file: { path: string; buffer: Buffer } = await window.electron.fileSystem.getFileFromResources([ICONS, TRAITS, PLACEHOLDER_TRAIT_ICON]);
    //             setTempImage(ApplyFileProtocol(file.path));
    //         }
    //     }

    //     getTraitFilePath();
    // }, []);

    return (
        <Box className="scene__wrapper">
            <Box style={{ background: scene.backgroundImageName }}>
                <Typography variant="subtitle1">Click to pick a different background.</Typography>
            </Box>
        </Box>
    );
}
