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
import { motion } from 'framer-motion';
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
    playAnimation?: boolean;
}

export function ActorOnScene({ actor, animations, isGameCharacter = false, playAnimation = false, onActorClick, actorImagePath }: IProps) {
    const { t, i18n } = useTranslation();

    const [currentAnimationIndex, setCurrentAnimationIndex] = useState<number>(0);
    const [isPlayingAnimation, setPlayingAnimationState] = useState<boolean>(false);
    const currentAnimation = animations && animations.length !== 0 ? animations[currentAnimationIndex] : null;

    // const actorAssociatedCharacter = isGameCharacter ? useSelector((state: RootState) => state.database.mappedDatabase.characters[actor.characterID]) : null;

    const startAnimationPlayback = () => {
        setPlayingAnimationState(true);
        setCurrentAnimationIndex(0);

        playAnimationStep(animations[currentAnimationIndex]);
    };

    const playAnimationStep = (currentAnimation: Animation) => {};

    if (playAnimation && !isPlayingAnimation) {
        startAnimationPlayback();
    }

    const getAnimatedContainer = () => {
        const sumOfDuration = animations.reduce((sum, animation) => sum + animation.duration, 0);

        animations[0].rotation;

        return (
            <motion.div
                animate={{
                    left: animations.map((animation) => animation.xAxisOffset),
                    top: animations.map((animation) => animation.yAxisOffset),
                    scale: animations.map((animation) => animation.scale),
                    rotateY: animations.map((animation) => (animation.facing === 'Left' ? 180 : 0)),
                    rotateZ: animations.map((animation) => animation.rotation),
                }}
                transition={{
                    duration: sumOfDuration,
                    times: animations.map((_animation, index) => {
                        const sumOfDurationUntilNow = animations.slice(0, index).reduce((sum, animation) => sum + animation.duration, 0);
                        return sumOfDurationUntilNow / sumOfDuration;
                    }),
                }}
            />
        );
    };

    return currentAnimation ? (
        <Box className="scene__stage-actor" style={{ top: `${currentAnimation.yAxisOffset}%`, left: `${currentAnimation.xAxisOffset}%` }} onClick={onActorClick}>
            <img src={actorImagePath} alt={actor.id} style={{ transform: `scale(${1 + currentAnimation.scale / 100})` }} />
        </Box>
    ) : null;
}
