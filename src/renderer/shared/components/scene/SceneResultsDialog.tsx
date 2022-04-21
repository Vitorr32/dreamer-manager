import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Scene } from 'renderer/shared/models/base/Scene.model';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    scene: Scene;
}

enum SceneResultAdd {
    ADD_FLAG_TO_ACTOR,
    ADD_FLAG_TO_WORLD,
    ADD_EFFECT_TO_WORLD,
}

export function SceneResultsDialog({ isOpen, onClose }: IProps) {
    const { t, i18n } = useTranslation();

    const addResultToScene = (resultToAdd: SceneResultAdd): void => {
        switch (resultToAdd) {
            case SceneResultAdd.ADD_EFFECT_TO_WORLD:
            case SceneResultAdd.ADD_FLAG_TO_ACTOR:
            case SceneResultAdd.ADD_FLAG_TO_WORLD:
        }
    };

    return (
        <Dialog className="scene-result-dialog" open={isOpen} onClose={onClose}>
            <DialogContent>
                <DialogTitle>{t('interface.editor.event.scene_effect_heading')}</DialogTitle>

                <DialogContentText>{t('interface.editor.event.scene_effect_helper')}</DialogContentText>

                <Box className=""></Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => addResultToScene(SceneResultAdd.ADD_EFFECT_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_effect')}</Button>
                <Button onClick={() => addResultToScene(SceneResultAdd.ADD_FLAG_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_flag_any')}</Button>
                <Button onClick={() => addResultToScene(SceneResultAdd.ADD_FLAG_TO_ACTOR)}>{t('interface.editor.event.scene_effect_button_add_flag_actor')}</Button>
            </DialogActions>
        </Dialog>
    );
}
