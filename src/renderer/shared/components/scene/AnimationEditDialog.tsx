import { TabContext, TabPanel } from '@mui/lab';
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
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Actor } from 'renderer/shared/models/base/Event.model';
import { BasicAnimations, Scene } from 'renderer/shared/models/base/Scene.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    scene: Scene;
    selectedActor: { actor: Actor; index: number };
    onSceneEdited: (scene: Scene) => void;
}

export function AnimationEditDialog({ isOpen, onClose, scene, selectedActor, onSceneEdited }: IProps) {
    const { t, i18n } = useTranslation();
    const [selectedAnimation, setSelectedAnimation] = useState<number>(0);

    const onAddAnimationToActor = (actorID: string) => {
        const modifiedScene = CopyClassInstance(scene);

        const newAnimation = modifiedScene.actorsState[actorID].animations[modifiedScene.actorsState[actorID].animations.length - 1];
        newAnimation.duration = 1000;
        modifiedScene.actorsState[actorID].animations.push(newAnimation);

        onSceneEdited(modifiedScene);
        setSelectedAnimation(modifiedScene.actorsState[actorID].animations.length - 1);
    };

    const onRemoveAnimationToActor = (actorID: string, animationIndex: number) => {
        const modifiedScene = CopyClassInstance(scene);

        modifiedScene.actorsState[actorID].animations.splice(animationIndex);

        onSceneEdited(modifiedScene);
        setSelectedAnimation(0);
    };

    const onAnimationConfigurationChange = (
        value: any,
        variableName: 'xAxisOffset' | 'yAxisOffset' | 'scale' | 'facing' | 'type' | 'duration',
        actorID: string,
        index: number
    ) => {
        const modifiedScene = CopyClassInstance(scene);
        modifiedScene.actorsState = CopyClassInstance(modifiedScene.actorsState);

        modifiedScene.actorsState[actorID].animations[index] = {
            ...modifiedScene.actorsState[actorID].animations[index],
            [variableName]: value,
        };

        onSceneEdited(modifiedScene);
    };

    return (
        <Dialog className="animation" open={isOpen} onClose={onClose}>
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
                                <Tab label={t('interface.editor.event.scene_actor_animation_add')} onClick={() => onAddAnimationToActor(selectedActor.actor.id)} value={-1} />
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

                                    <FormControl fullWidth variant="filled">
                                        <InputLabel htmlFor={`animation_${index}_type_selected`}>{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                                        <Select
                                            id={`animation_${index}_type_selected`}
                                            value={animation.type}
                                            onChange={(event) => onAnimationConfigurationChange(event.target.value, 'type', selectedActor.actor.id, index)}
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

                                    <FormControl fullWidth>
                                        <ToggleButtonGroup
                                            value={animation.facing}
                                            exclusive
                                            onChange={(_event, facing) => onAnimationConfigurationChange(facing, 'facing', selectedActor.actor.id, index)}
                                            aria-label="text alignment"
                                        >
                                            <ToggleButton value="Left" aria-label="left aligned">
                                                <ArrowLeftIcon /> {t('interface.editor.event.scene_actor_animation_facing_left')}
                                            </ToggleButton>
                                            <ToggleButton value="Right" aria-label="centered">
                                                <ArrowRightIcon /> {t('interface.editor.event.scene_actor_animation_facing_right')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        <FormHelperText> {t('interface.editor.event.scene_actor_animation_facing_helper')}</FormHelperText>
                                    </FormControl>

                                    {animation.type !== BasicAnimations.GET_CLOSER && animation.type !== BasicAnimations.GET_FARTHER && (
                                        <>
                                            <TextField
                                                type="number"
                                                label={t('interface.editor.event.scene_actor_x_offset')}
                                                helperText={t('interface.editor.event.scene_actor_x_offset_helper')}
                                                variant="outlined"
                                                value={animation.xAxisOffset || 0}
                                                onChange={(event) => onAnimationConfigurationChange(Number(event.target.value), 'xAxisOffset', selectedActor.actor.id, index)}
                                            />

                                            <TextField
                                                type="number"
                                                label={t('interface.editor.event.scene_actor_y_offset')}
                                                helperText={t('interface.editor.event.scene_actor_y_offset_helper')}
                                                variant="outlined"
                                                value={animation.yAxisOffset || 0}
                                                onChange={(event) => onAnimationConfigurationChange(Number(event.target.value), 'yAxisOffset', selectedActor.actor.id, index)}
                                            />
                                        </>
                                    )}

                                    {(animation.type === BasicAnimations.GET_CLOSER || animation.type === BasicAnimations.GET_FARTHER) && (
                                        <TextField
                                            type="number"
                                            label={t('interface.editor.event.scene_actor_animation_scale_label')}
                                            helperText={t('interface.editor.event.scene_actor_animation_scale_helper')}
                                            variant="outlined"
                                            value={animation.scale || 0}
                                            onChange={(event) => onAnimationConfigurationChange(Number(event.target.value), 'scale', selectedActor.actor.id, index)}
                                        />
                                    )}

                                    {index !== 0 && (
                                        <TextField
                                            type="number"
                                            label={t('interface.editor.event.scene_actor_duration_label')}
                                            helperText={t('interface.editor.event.scene_actor_duration_helper')}
                                            variant="outlined"
                                            value={animation.duration || 1000}
                                            onChange={(event) => onAnimationConfigurationChange(Number(event.target.value), 'duration', selectedActor.actor.id, index)}
                                        />
                                    )}
                                </TabPanel>
                            ))}
                        </Box>
                    </TabContext>
                </DialogContent>
            )}
        </Dialog>
    );
}
