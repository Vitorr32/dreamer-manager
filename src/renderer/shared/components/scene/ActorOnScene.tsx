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

    const startAnimationPlayback = () => {};

    if (playAnimation && !isPlayingAnimation) {
        startAnimationPlayback();
    }

    return currentAnimation ? (
        <Box className="scene__stage-actor" style={{ top: `${currentAnimation.yAxisOffset}%`, left: `${currentAnimation.xAxisOffset}%` }} onClick={onActorClick}>
            <img src={actorImagePath} alt={actor.id} style={{ transform: `scale(${1 + currentAnimation.scale / 100})` }} />
        </Box>
    ) : null;
}
