import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CompositeEntityFilter } from 'renderer/shared/components/entity/CompositeEntityFilter.component';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
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

    const onAddConditionToConnection = (): void => {
        const newConnection = CopyClassInstance(sceneConnection);
        newConnection.choiceCondition = new EntityFilterTree();

        onSceneConnectionChange(newConnection);
    };

    const onRemoveConditionFromConnection = (): void => {
        const newConnection = CopyClassInstance(sceneConnection);
        newConnection.choiceCondition = null;

        onSceneConnectionChange(newConnection);
    };

    const onRenderTypeHelper = (currentType: ConnectionType): string => {
        switch (currentType) {
            case ConnectionType.NORMAL:
                return t('interface.editor.event.scene_link_normal_type_helper');
            case ConnectionType.CHOICE:
                return t('interface.editor.event.scene_link_choice_type_helper');
            case ConnectionType.HIDDEN_CHECK:
                return t('interface.editor.event.scene_link_hidden_type_helper');
            default:
                return '';
        }
    };

    const getCurrentConnectionChoiceLabel = (): string => {
        if (sceneConnection && sceneConnection.localization && sceneConnection.localization[i18n.language]) {
            return sceneConnection.localization[i18n.language].choiceLabel;
        }

        return '';
    };

    const setConnectionChoiceLabel = (label: string): void => {
        const newConnection = CopyClassInstance(sceneConnection);

        if (sceneConnection && sceneConnection.localization && sceneConnection.localization[i18n.language]) {
            newConnection.localization[i18n.language].choiceLabel = label;
        } else {
            newConnection.localization = {
                ...newConnection.localization,
                [i18n.language]: {
                    choiceLabel: label,
                },
            };
        }

        onSceneConnectionChange(newConnection);
    };

    const onConditionChanged = (conditionTree: EntityFilterTree): void => {
        const newConnection = CopyClassInstance(sceneConnection);
        newConnection.choiceCondition = conditionTree;

        onSceneConnectionChange(newConnection);
    };

    const shouldShowConditionTree = (): boolean => {
        return sceneConnection && sceneConnection.type && !!sceneConnection.choiceCondition;
    };

    const shouldShowConditionButton = (): boolean => {
        return sceneConnection?.type && sceneConnection.type !== ConnectionType.NORMAL;
    };

    return (
        <Modal className="modal" open={open} onClose={onClose}>
            <Box
                className={`modal__wrapper ${
                    sceneConnection?.type !== ConnectionType.NORMAL && sceneConnection?.choiceCondition ? 'modal__wrapper-large' : 'modal__wrapper-small'
                } `}
            >
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
                        </Select>
                        <FormHelperText>{onRenderTypeHelper(sceneConnection?.type || ConnectionType.NORMAL)}</FormHelperText>
                    </FormControl>

                    {sceneConnection && sceneConnection.type === ConnectionType.CHOICE && (
                        <TextField
                            type="text"
                            label={t('interface.editor.event.scene_link_choice_label')}
                            helperText={t('interface.editor.event.scene_actor_x_offset_helper')}
                            variant="outlined"
                            value={getCurrentConnectionChoiceLabel()}
                            onChange={(event) => setConnectionChoiceLabel(event.target.value)}
                        />
                    )}

                    {shouldShowConditionButton() && (
                        <Box>
                            <Button onClick={onAddConditionToConnection}>{t('interface.editor.event.add_link_condition')}</Button>
                            {sceneConnection?.choiceCondition && (
                                <Button onClick={onRemoveConditionFromConnection}>{t('interface.editor.event.remove_link_condition')}</Button>
                            )}
                        </Box>
                    )}

                    {shouldShowConditionTree() && <CompositeEntityFilter filterTree={sceneConnection?.choiceCondition} onFilterTreeChange={onConditionChanged} />}
                </Box>
            </Box>
        </Modal>
    );
}
