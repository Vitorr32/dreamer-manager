import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Actor, Flag } from 'renderer/shared/models/base/Event.model';
import { Scene, SceneResult } from 'renderer/shared/models/base/Scene.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ConditionTreeEditor } from '../condition/ConditionTreeEditor.component';
import { EffectEditor } from '../effects/EffectEditor.component';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    sceneResults: SceneResult;
    flags: Flag[];
    actors: Actor[];
    onResultModified: (sceneResult: SceneResult) => void;
}

enum SceneResultAdd {
    MODIFY_FLAG_TO_ACTOR,
    MODIFY_FLAG_TO_WORLD,
    APPLY_EFFECT_TO_WORLD,
}

export function SceneResultsDialog({ isOpen, onClose, sceneResults, onResultModified, flags, actors }: IProps) {
    const { t, i18n } = useTranslation();

    const [selectedSceneResult, setSelectedSceneResult] = useState<number>();

    const addResultToScene = (resultToAdd: SceneResultAdd): void => {
        const updatedSceneResults: SceneResult = sceneResults
            ? CopyClassInstance(sceneResults)
            : {
                  applyEffect: [],
                  applyFlagToActorInScene: [],
                  applyFlagToActorOnCondition: [],
              };

        switch (resultToAdd) {
            case SceneResultAdd.APPLY_EFFECT_TO_WORLD:
                if (updatedSceneResults.applyEffect) {
                    updatedSceneResults.applyEffect.push(new Effect());
                } else {
                    updatedSceneResults.applyEffect = [new Effect()];
                }
                break;
            case SceneResultAdd.MODIFY_FLAG_TO_ACTOR:
                if (updatedSceneResults.applyEffect) {
                    updatedSceneResults.applyFlagToActorInScene.push({
                        actorID: null,
                        flagID: null,
                    });
                } else {
                    updatedSceneResults.applyFlagToActorInScene = [
                        {
                            actorID: null,
                            flagID: null,
                        },
                    ];
                }
                break;
            case SceneResultAdd.MODIFY_FLAG_TO_WORLD:
                if (updatedSceneResults.applyEffect) {
                    updatedSceneResults.applyFlagToActorOnCondition.push({
                        conditionTree: new ConditionTree(),
                        flagID: null,
                    });
                } else {
                    updatedSceneResults.applyFlagToActorOnCondition = [
                        {
                            conditionTree: new ConditionTree(),
                            flagID: null,
                        },
                    ];
                }
                break;
        }

        onResultModified(updatedSceneResults);
    };

    const eventHasEffect = (): boolean => {
        return (
            sceneResults &&
            (sceneResults.applyEffect?.length !== 0 || sceneResults.applyFlagToActorInScene?.length !== 0 || sceneResults.applyFlagToActorOnCondition?.length !== 0)
        );
    };

    const appliedEffectHasChanged = (index: number, changedEffect: Effect): void => {
        const updatedSceneResults: SceneResult = CopyClassInstance(sceneResults);
        updatedSceneResults.applyEffect[index] = changedEffect;

        onResultModified(updatedSceneResults);
    };

    const flagToActorHasChanged = (index: number, keyName: 'flagID' | 'actorID', value: string): void => {
        const updatedSceneResults: SceneResult = CopyClassInstance(sceneResults);
        updatedSceneResults.applyFlagToActorInScene[index][keyName] = value;

        onResultModified(updatedSceneResults);
    };

    const flagToWorldStateHasChanged = (index: number, keyName: 'conditionTree' | 'flagID', value: any): void => {
        const updatedSceneResults: SceneResult = CopyClassInstance(sceneResults);
        updatedSceneResults.applyFlagToActorOnCondition[index][keyName] = value;

        onResultModified(updatedSceneResults);
    };

    console.log(sceneResults);

    return (
        <Dialog className={`scene-result__dialog ${eventHasEffect() ? 'modal__wrapper-large' : ''}`} open={isOpen} onClose={onClose}>
            <DialogContent>
                <Typography variant="h5">{t('interface.editor.event.scene_effect_heading')}</Typography>

                <DialogContentText>{t('interface.editor.event.scene_effect_helper')}</DialogContentText>

                {sceneResults &&
                    sceneResults.applyEffect &&
                    sceneResults.applyEffect.map((effectToApply, index) => {
                        <Box className="scene-result__result" key={`effect_applied_${index}`}>
                            <EffectEditor effect={effectToApply} index={index} onChange={appliedEffectHasChanged} />
                        </Box>;
                    })}

                {sceneResults &&
                    sceneResults.applyFlagToActorInScene &&
                    sceneResults.applyFlagToActorInScene.map((flagApplial, index) => {
                        <Box className="scene-result__result" key={`flag_applied_${index}`}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel>{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                                <Select value={flagApplial.flagID} onChange={(event) => flagToActorHasChanged(index, 'flagID', event.target.value)}>
                                    {flags.map((flag) => (
                                        <MenuItem value={flag.id}>{flag.displayName}</MenuItem>
                                    ))}
                                </Select>
                                {(!flags || flags.length === 0) && <FormHelperText>{t('interface.editor.event.scene_result_no_flags')}</FormHelperText>}
                            </FormControl>

                            <FormControl fullWidth variant="filled">
                                <InputLabel>{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                                <Select value={flagApplial.flagID} onChange={(event) => flagToActorHasChanged(index, 'actorID', event.target.value)}>
                                    {actors?.map((actor) => (
                                        <MenuItem value={actor.id}>{actor.alias}</MenuItem>
                                    ))}
                                </Select>
                                {(!actors || actors.length === 0) && <FormHelperText>{t('interface.editor.event.scene_result_no_actors')}</FormHelperText>}
                            </FormControl>
                        </Box>;
                    })}

                {sceneResults &&
                    sceneResults.applyFlagToActorOnCondition &&
                    sceneResults.applyFlagToActorOnCondition.map((flagApplial, index) => {
                        <Box className="scene-result__result" key={`flag_applied_${index}`}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel>{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                                <Select value={flagApplial.flagID} onChange={(event) => flagToWorldStateHasChanged(index, 'flagID', event.target.value)}>
                                    {flags.map((flag) => (
                                        <MenuItem value={flag.id}>{flag.displayName}</MenuItem>
                                    ))}
                                </Select>
                                {(!flags || flags.length === 0) && <FormHelperText>{t('interface.editor.event.scene_result_no_flags')}</FormHelperText>}
                            </FormControl>

                            <ConditionTreeEditor
                                conditionTree={flagApplial.conditionTree}
                                onChange={(conditionTree) => flagToWorldStateHasChanged(index, 'conditionTree', conditionTree)}
                            />
                        </Box>;
                    })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => addResultToScene(SceneResultAdd.APPLY_EFFECT_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_effect')}</Button>
                <Button onClick={() => addResultToScene(SceneResultAdd.MODIFY_FLAG_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_flag_any')}</Button>
                <Button onClick={() => addResultToScene(SceneResultAdd.MODIFY_FLAG_TO_ACTOR)}>{t('interface.editor.event.scene_effect_button_add_flag_actor')}</Button>
            </DialogActions>
        </Dialog>
    );
}
