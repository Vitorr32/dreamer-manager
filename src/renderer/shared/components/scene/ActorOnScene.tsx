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
    onActorClick: () => any;
    playAnimation?: boolean;
}

const spriteGamePath = [SPRITES_FOLDER];

export function ActorOnScene({ actor, animations, isGameCharacter = false, playAnimation = false, onActorClick, actorImagePath }: IProps) {
    const { t, i18n } = useTranslation();

    const [currentAnimation, setCurrentAnimation] = useState<Animation>(animations[0] || null);

    // const actorAssociatedCharacter = isGameCharacter ? useSelector((state: RootState) => state.database.mappedDatabase.characters[actor.characterID]) : null;

    return (
        <Box className="scene__stage-actor" style={{ top: `${currentAnimation.options?.offset.y}%`, left: `${currentAnimation.options?.offset.x}%` }} onClick={onActorClick}>
            <img src={actorImagePath} alt={actor.id} style={{ transform: `scale(${1 + currentAnimation.options.scale / 100})` }} />
        </Box>
    );
}
