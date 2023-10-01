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
import { motion, TargetAndTransition, useAnimation } from 'framer-motion';
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
    const [currentAnimationVariants, setAnimationVariants] = useState<{ idle: TargetAndTransition; animation: TargetAndTransition }>();
    const framerMotionAnimationControls = useAnimation();
    // const actorAssociatedCharacter = isGameCharacter ? useSelector((state: RootState) => state.database.mappedDatabase.characters[actor.characterID]) : null;

    useEffect(() => {
        if (playAnimation && !isPlayingAnimation) {
            setPlayingAnimationState(true);
            framerMotionAnimationControls.start('animation');
        }
    }, [playAnimation]);

    useEffect(() => {
        if (!isPlayingAnimation) {
            updateAnimationVariants();
        }
    }, [animations]);

    useEffect(() => {
        if (!isPlayingAnimation && currentAnimationVariants) {
            framerMotionAnimationControls.set('idle');
        }
    }, [currentAnimationVariants]);

    const updateAnimationVariants = () => {
        if (!animations || animations.length === 0) {
            setAnimationVariants(null);
            return;
        }

        const initialAnimationStep = animations[0];
        // Mount initial state of the actor on screen
        const initialState: TargetAndTransition = {
            left: `${initialAnimationStep.xAxisOffset}%`,
            top: `${initialAnimationStep.yAxisOffset}%`,
            scale: 1 + initialAnimationStep.scale / 100,
            rotateY: initialAnimationStep.facing === 'Left' ? 180 : 0,
            rotateZ: initialAnimationStep.rotation,
        };

        const sumOfDuration = animations.reduce((sum, animation) => sum + animation.duration, 0);
        const completeAnimation: TargetAndTransition = {
            left: animations.map((animation) => `${animation.xAxisOffset}%`),
            top: animations.map((animation) => `${animation.yAxisOffset}%`),
            scale: animations.map((animation) => 1 + animation.scale / 100),
            rotateY: animations.map((animation) => (animation.facing === 'Left' ? 180 : 0)),
            rotateZ: animations.map((animation) => animation.rotation),
            transition: {
                duration: sumOfDuration / 1000,
                times: animations.map((_animation, index) => {
                    if (index === 0) {
                        return 0;
                    } if (index === animations.length - 1) {
                        return 1;
                    }

                    const sumOfDurationUntilNow = animations.slice(0, index).reduce((sum, animation) => sum + animation.duration, 0);
                    return sumOfDurationUntilNow / sumOfDuration;
                }),
            },
        };

        setAnimationVariants({ idle: initialState, animation: completeAnimation });
    };

    const onAnimationComplete = () => {
        setPlayingAnimationState(false);
        updateAnimationVariants();

        if (onAnimationEnd) {
            onAnimationEnd();
        }
    };

    return (
        <motion.div
            className="scene__stage-actor"
            animate={framerMotionAnimationControls}
            variants={currentAnimationVariants}
            onAnimationComplete={onAnimationComplete}
            onClick={onActorClick}
        >
            <Box className="scene__stage-sprite-wrapper">
                <img className="scene__stage-sprite" src={actorImagePath} alt={actor.id} />
                {actor.alias && <Typography className="scene__stage-alias" variant="caption">{actor.alias}</Typography>}
            </Box>
        </motion.div>
    );
}
