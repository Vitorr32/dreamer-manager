import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Flag } from 'renderer/shared/models/base/Event.model';
import { Scene, SceneResult } from 'renderer/shared/models/base/Scene.model';
import { EffectEditor } from '../effects/EffectEditor.component';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    scene: Scene;
    flags: Flag[];
    onResultModified: (sceneResult: SceneResult) => void;
}

enum SceneResultAdd {
    MODIFY_FLAG_TO_ACTOR,
    MODIFY_FLAG_TO_WORLD,
    APPLY_EFFECT_TO_WORLD,
}

export function SceneResultsDialog({ isOpen, onClose, scene, onResultModified, flags }: IProps) {
    const { t, i18n } = useTranslation();

    const [selectedSceneResult, setSelectedSceneResult] = useState<number>();

    const addResultToScene = (resultToAdd: SceneResultAdd): void => {
        switch (resultToAdd) {
            case SceneResultAdd.APPLY_EFFECT_TO_WORLD:
            case SceneResultAdd.MODIFY_FLAG_TO_ACTOR:
            case SceneResultAdd.MODIFY_FLAG_TO_WORLD:
        }
    };

    const eventHasEffect = (): boolean => {
        const sceneResult = scene.sceneResult;
        return sceneResult.applyEffect?.length !== 0 || sceneResult.applyFlagToActorInScene?.length !== 0 || sceneResult.applyFlagToActorOnCondition?.length !== 0;
    };

    const appliedEffectHasChanged = (index: number, changedEffect: Effect): void => {};

    const flagToActorHasChanged = (index: number, flagID: string): void => {};

    return (
        <Dialog className={`scene-result__dialog ${eventHasEffect() ? 'modal__wrapper-large' : ''}`} open={isOpen} onClose={onClose}>
            <DialogContent>
                <Typography variant="h5">{t('interface.editor.event.scene_effect_heading')}</Typography>

                <DialogContentText>{t('interface.editor.event.scene_effect_helper')}</DialogContentText>

                {scene.sceneResult.applyEffect?.map((effectToApply, index) => {
                    <Box className="scene-result__result" key={`effect_applied_${index}`}>
                        <EffectEditor effect={effectToApply} index={index} onChange={appliedEffectHasChanged} />
                    </Box>;
                })}

                {scene.sceneResult.applyFlagToActorInScene?.map((flagApplial, index) => {
                    <Box className="scene-result__result" key={`flag_applied_${index}`}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel htmlFor="link_type">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                            <Select id="link_type" value={flagApplial.flagID} onChange={(event) => flagToActorHasChanged(index, event.target.value)}>
                                {flags.map((flag) => (
                                    <MenuItem value={flag.id}>{flag.displayName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>;
                })}

                <Box className=""></Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => addResultToScene(SceneResultAdd.APPLY_EFFECT_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_effect')}</Button>
                <Button onClick={() => addResultToScene(SceneResultAdd.MODIFY_FLAG_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_flag_any')}</Button>
                <Button onClick={() => addResultToScene(SceneResultAdd.MODIFY_FLAG_TO_ACTOR)}>{t('interface.editor.event.scene_effect_button_add_flag_actor')}</Button>
            </DialogActions>
        </Dialog>
    );
}
