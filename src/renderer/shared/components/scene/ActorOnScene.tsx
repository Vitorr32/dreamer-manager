import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { motion, TargetAndTransition } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { BACKGROUND_IMAGES_FOLDER, GENERIC_SPRITES_FOLDER, IMAGES_FOLDER, PLACEHOLDER_ACTOR_SPRITE, SPRITES_FOLDER } from 'renderer/shared/Constants';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Actor, ActorType, Event } from 'renderer/shared/models/base/Event.model';
import { Animation } from 'renderer/shared/models/base/Scene.model';

interface IProps {
    actor: Actor;
    animations: Animation[];
    isGameCharacter?: boolean;
    actorImagePath: string;
    onActorClick?: () => any;
    onAnimationEnd?: () => any;
    playAnimation?: boolean;
}

export function ActorOnScene({ actor, animations, isGameCharacter = false, playAnimation = false, onActorClick, onAnimationEnd, actorImagePath }: IProps) {
    const { t, i18n } = useTranslation();

    const [isPlayingAnimation, setPlayingAnimationState] = useState<boolean>(false);
    const [currentAnimationVariants, setAnimationVariants] = useState<{ idle: any; animation: any; transition: any }>();
    // const actorAssociatedCharacter = isGameCharacter ? useSelector((state: RootState) => state.database.mappedDatabase.characters[actor.characterID]) : null;

    useEffect(() => {
        if (playAnimation && !isPlayingAnimation) {
            setPlayingAnimationState(true);
        }
    }, [playAnimation]);

    useEffect(() => {
        if (!isPlayingAnimation) {
            // console.log(animations);
            updateAnimationVariants();
        }
    }, [animations]);

    const updateAnimationVariants = () => {
        if (!animations || animations.length === 0) {
            setAnimationVariants(null);
            return;
        }

        const initialAnimationStep = animations[0];
        //Mount initial state of the actor on screen
        const initialState: TargetAndTransition = {
            left: `${initialAnimationStep.xAxisOffset}%`,
            top: `${initialAnimationStep.yAxisOffset}%`,
            scale: 1 + initialAnimationStep.scale / 100,
            rotateY: initialAnimationStep.facing === 'Left' ? 180 : 0,
            rotateZ: initialAnimationStep.rotation,
        };

        const completeAnimation: TargetAndTransition = {
            left: animations.map((animation) => `${animation.xAxisOffset}%`),
            top: animations.map((animation) => `${animation.yAxisOffset}%`),
            scale: animations.map((animation) => 1 + animation.scale / 100),
            rotateY: animations.map((animation) => (animation.facing === 'Left' ? 180 : 0)),
            rotateZ: animations.map((animation) => animation.rotation),
        };

        const sumOfDuration = animations.reduce((sum, animation) => sum + animation.duration, 0);
        const transitionConfiguration = {
            duration: sumOfDuration,
            times: animations.map((_animation, index) => {
                const sumOfDurationUntilNow = animations.slice(0, index).reduce((sum, animation) => sum + animation.duration, 0);
                return sumOfDurationUntilNow / sumOfDuration;
            }),
        };

        setAnimationVariants({ idle: initialState, animation: completeAnimation, transition: transitionConfiguration });
        setPlayingAnimationState(true);
    };

    const onAnimationComplete = () => {
        setPlayingAnimationState(false);
        onAnimationEnd();
    };

    console.log(currentAnimationVariants);

    return (
        <Box className="scene__stage-actor" onClick={onActorClick}>
            <motion.div
                className="scene__stage-animated"
                initial={isPlayingAnimation ? 'animation' : 'idle'}
                variants={currentAnimationVariants}
                transition={currentAnimationVariants?.transition || null}
                onAnimationComplete={onAnimationComplete}
            >
                <img src={actorImagePath} alt={actor.id} />
            </motion.div>
        </Box>
    );
}
