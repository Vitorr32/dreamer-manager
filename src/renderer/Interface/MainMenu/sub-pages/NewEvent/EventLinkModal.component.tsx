import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConnectionType, Scene, SceneConnection } from 'renderer/shared/models/base/Scene.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
interface IProps {
    open: boolean;
    onClose: () => any;
    sceneConnection: SceneConnection;
    parentScene: Scene;
    childScene: Scene;
    onSceneConnectionChange: (connection: SceneConnection, closeModal?: boolean) => void;
}

export function EventLinkModal({ open, onClose, sceneConnection, parentScene, childScene, onSceneConnectionChange }: IProps) {
    const { t, i18n } = useTranslation();

    const onConnectionTypeChange = (newType: ConnectionType): void => {
        const newConnection = CopyClassInstance(sceneConnection);
        newConnection.type = newType;

        onSceneConnectionChange(newConnection);
    };

    const onRenderTypeHelper = (currentType: ConnectionType): string => {
        switch (currentType) {
            default:
                return '';
        }
    };

    return (
        <Modal className="modal" open={open} onClose={() => onClose()}>
            <Box className="modal__wrapper modal__wrapper-small">
                <Box className="modal__header">{t('interface.editor.event.add_link_condition')}</Box>
                <Box className="modal__content utils__full-height">
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="link_type">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                        <Select
                            id="link_type"
                            value={sceneConnection?.type || ConnectionType.NORMAL}
                            onChange={(event) => onConnectionTypeChange(event.target.value as ConnectionType)}
                        >
                            <MenuItem value={ConnectionType.NORMAL}>{t(ConnectionType.NORMAL)}</MenuItem>
                            <MenuItem value={ConnectionType.CHOICE}>{t(ConnectionType.CHOICE)}</MenuItem>
                            <MenuItem value={ConnectionType.HIDDEN_CHECK}>{t(ConnectionType.HIDDEN_CHECK)}</MenuItem>
                            <MenuItem value={ConnectionType.CONDITIONAL_CHECK}>{t(ConnectionType.CONDITIONAL_CHECK)}</MenuItem>
                        </Select>
                        <FormHelperText>{onRenderTypeHelper(sceneConnection?.type)}</FormHelperText>
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    );
}
