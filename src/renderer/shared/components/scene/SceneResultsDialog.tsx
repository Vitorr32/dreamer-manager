import {
    Box,
    Button,
    Collapse,
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
import { Scene, SceneResult, SceneResultType } from 'renderer/shared/models/base/Scene.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ConditionTreeEditor } from '../condition/ConditionTreeEditor.component';
import { EffectEditor } from '../effects/EffectEditor.component';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    sceneResults: SceneResult[];
    flags: Flag[];
    actors: Actor[];
    onResultModified: (sceneResults: SceneResult[]) => void;
}

export function SceneResultsDialog({ isOpen, onClose, sceneResults, onResultModified, flags, actors }: IProps) {
    const { t, i18n } = useTranslation();

    const [selectedSceneResult, setSelectedSceneResult] = useState<number>();

    const addResultToScene = (resultToAdd: SceneResultType): void => {
        const updatedSceneResults: SceneResult[] = !!sceneResults ? CopyClassInstance(sceneResults) : [];

        switch (resultToAdd) {
            case SceneResultType.APPLY_EFFECT_TO_WORLD:
                updatedSceneResults.push({
                    effect: new Effect(),
                    type: SceneResultType.APPLY_EFFECT_TO_WORLD,
                });
                break;
            case SceneResultType.MODIFY_FLAG_TO_ACTOR:
                updatedSceneResults.push({
                    actorID: null,
                    flagID: null,
                    type: SceneResultType.MODIFY_FLAG_TO_ACTOR,
                });
                break;
            case SceneResultType.MODIFY_FLAG_TO_WORLD:
                updatedSceneResults.push({
                    conditionTree: new ConditionTree(),
                    flagID: null,
                    type: SceneResultType.MODIFY_FLAG_TO_WORLD,
                });
                break;
        }

        onResultModified(updatedSceneResults);
    };

    const sceneHasResult = (): boolean => {
        return !!sceneResults && sceneResults.length !== 0;
    };

    const sceneResultsModified = (index: number, keyName: 'flagID' | 'actorID' | 'conditionTree' | 'effect', value: any): void => {
        const updatedSceneResults: SceneResult[] = CopyClassInstance(sceneResults);
        updatedSceneResults[index][keyName] = value;

        onResultModified(updatedSceneResults);
    };

    return (
        <Dialog className={`scene-result__dialog`} PaperProps={{ sx: sceneHasResult() ? { width: '95vw', maxWidth: 'unset' } : {} }} open={isOpen} onClose={onClose}>
            <DialogContent>
                <Typography variant="h5">{t('interface.editor.event.scene_effect_heading')}</Typography>

                <DialogContentText>{t('interface.editor.event.scene_effect_helper')}</DialogContentText>

                {sceneHasResult() &&
                    sceneResults.map((sceneResult, index) => {
                        return (
                            <Box className="scene-result__result" key={`effect_applied_${index}`}>
                                <Box className="scene-result__result-header" onClick={() => setSelectedSceneResult(index === selectedSceneResult ? null : index)}>
                                    <Typography>{t('interface.editor.event.scene_effect_world_effect_display_name', { index })}</Typography>
                                </Box>
                                <Collapse in={selectedSceneResult === index}>
                                    <>
                                        {sceneResult.type === SceneResultType.APPLY_EFFECT_TO_WORLD && (
                                            <EffectEditor
                                                effect={sceneResult.effect}
                                                index={index}
                                                onChange={(index, effect) => sceneResultsModified(index, 'effect', effect)}
                                                options={{
                                                    filteredTypes: [],
                                                    specifiedActors: !!actors ? actors : [],
                                                    allowConditionTree: true,
                                                }}
                                            />
                                        )}

                                        {(sceneResult.type === SceneResultType.MODIFY_FLAG_TO_ACTOR || sceneResult.type === SceneResultType.MODIFY_FLAG_TO_WORLD) && (
                                            <FormControl fullWidth variant="filled">
                                                <InputLabel>{t('interface.editor.event.scene_effect_label_flags_select')}</InputLabel>
                                                <Select value={sceneResult.flagID || ''} onChange={(event) => sceneResultsModified(index, 'flagID', event.target.value)}>
                                                    <MenuItem value=""></MenuItem>
                                                    {flags.map((flag) => (
                                                        <MenuItem value={flag.id}>{flag.displayName}</MenuItem>
                                                    ))}
                                                </Select>
                                                {(!flags || flags.length === 0) && <FormHelperText>{t('interface.editor.event.scene_result_no_flags')}</FormHelperText>}
                                            </FormControl>
                                        )}

                                        {sceneResult.type === SceneResultType.MODIFY_FLAG_TO_ACTOR && (
                                            <FormControl fullWidth variant="filled">
                                                <InputLabel>{t('interface.editor.event.scene_effect_label_actors_select')}</InputLabel>
                                                <Select value={sceneResult.actorID || ''} onChange={(event) => sceneResultsModified(index, 'actorID', event.target.value)}>
                                                    <MenuItem value=""></MenuItem>
                                                    {actors?.map((actor) => (
                                                        <MenuItem value={actor.id}>{actor.alias}</MenuItem>
                                                    ))}
                                                </Select>
                                                {(!actors || actors.length === 0) && <FormHelperText>{t('interface.editor.event.scene_result_no_actors')}</FormHelperText>}
                                            </FormControl>
                                        )}

                                        {sceneResult.type === SceneResultType.MODIFY_FLAG_TO_WORLD && (
                                            <ConditionTreeEditor
                                                conditionTree={sceneResult.conditionTree}
                                                onChange={(conditionTree) => sceneResultsModified(index, 'conditionTree', conditionTree)}
                                            />
                                        )}
                                    </>
                                </Collapse>
                            </Box>
                        );
                    })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => addResultToScene(SceneResultType.APPLY_EFFECT_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_effect')}</Button>
                <Button onClick={() => addResultToScene(SceneResultType.MODIFY_FLAG_TO_WORLD)}>{t('interface.editor.event.scene_effect_button_add_flag_any')}</Button>
                <Button onClick={() => addResultToScene(SceneResultType.MODIFY_FLAG_TO_ACTOR)}>{t('interface.editor.event.scene_effect_button_add_flag_actor')}</Button>
            </DialogActions>
        </Dialog>
    );
}
