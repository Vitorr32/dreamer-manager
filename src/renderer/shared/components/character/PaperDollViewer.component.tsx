import { Button, Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Emotion, PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { PaperPiece, PieceType } from 'renderer/shared/models/base/PaperPiece.model';
import { useState } from 'react';
import { ApplyFileProtocol, GetFileFromResources, GetFileNameFromPath } from 'renderer/shared/utils/StringOperations';
import CloseIcon from '@mui/icons-material/Close';
import { CopyClassInstance } from 'renderer/shared/utils/General';

interface IProps {
    character: Character;
    paperDoll: PaperDoll;
    emotion: Emotion;
    editable?: boolean;
    fullBody?: boolean;
    onPaperDollChange?: (paperDoll: PaperDoll) => void;
}

export function PaperDollViewer({ character, paperDoll, emotion, editable = false, fullBody = false, onPaperDollChange }: IProps) {
    const theme = useTheme();
    const paperPieces = useAppSelector((state: RootState) => state.database.mappedDatabase.paperPieces);

    const { t, i18n } = useTranslation();

    const getPieceOfTypeForEmotion = (paperDoll: PaperDoll, emotion: Emotion, pieceType: PieceType): PaperPiece => {
        const closestEmotion = getClosestEmotion(paperDoll, emotion);

        switch (pieceType) {
            case PieceType.BODY:
                return paperPieces[paperDoll.emotions[closestEmotion]?.bodyPiece || 0];
            case PieceType.FACE:
                return paperPieces[paperDoll.emotions[closestEmotion].facePiece];
            case PieceType.HAIR:
                return paperPieces[paperDoll.emotions[closestEmotion].hairPiece];
            case PieceType.FULL_BODY_CLOTHING:
                return paperPieces[paperDoll.fullBodyClothing];
            case PieceType.UPPER_CLOTHING:
                return paperPieces[paperDoll.upperClothing];
            case PieceType.LOWER_CLOTHING:
                return paperPieces[paperDoll.lowerClothing];
            case PieceType.LOWER_UNDERWEAR:
                return paperPieces[paperDoll.lowerUnderwear];
            case PieceType.UPPER_UNDERWEAR:
                return paperPieces[paperDoll.upperUnderwear];
        }
    };

    const getClosestEmotion = (paperDoll: PaperDoll, emotion: Emotion): Emotion => {
        switch (emotion) {
            case Emotion.DEPRESSED:
                return Emotion.SAD;
            case Emotion.EUPHORIC:
                return Emotion.HAPPY;
            case Emotion.TERRIFIED:
                return Emotion.SCARED;
            case Emotion.ANGRY:
                return Emotion.ANNOYED;
            case Emotion.ASHAMED:
                return Emotion.EMBARRASSED;
            case Emotion.SAD:
            case Emotion.HAPPY:
            case Emotion.SCARED:
            case Emotion.ANNOYED:
            case Emotion.EMBARRASSED:
                return !!paperDoll.emotions[emotion] ? emotion : Emotion.NEUTRAL;
            default:
                return Emotion.NEUTRAL;
        }
    };

    const getCustomSprite = (paperDoll: PaperDoll, emotion: Emotion): string => {
        while (true) {
            if (paperDoll.emotions[emotion]) {
                return paperDoll.emotions[emotion].customFileAbsolutePath;
            }

            emotion = getClosestEmotion(paperDoll, emotion);

            if (emotion === Emotion.NEUTRAL) {
                return paperDoll.emotions[emotion].customFileAbsolutePath;
            }
        }
    };

    const onImageSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files === null || event.target.files.length === 0) {
            return;
        }

        const files = [];
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            files.push({ path: file.path, name: file.name });
        }

        const updatedPaperDoll = CopyClassInstance(paperDoll);
        updatedPaperDoll.emotions[emotion].customFileAbsolutePath = ApplyFileProtocol(files[0].path);
        onPaperDollChange(updatedPaperDoll);
    };

    const onImageRemoved = async (): Promise<void> => {
        const updatedPaperDoll = CopyClassInstance(paperDoll);
        const emotionSprite = updatedPaperDoll.emotions[emotion];

        console.log('emotionSprite.customFilePath.pop()', emotionSprite.customFilePath?.pop());
        console.log('GetFileNameFromPath(emotionSprite.customFileAbsolutePath)', GetFileNameFromPath(emotionSprite.customFileAbsolutePath));

        //If there is no original custom file before the current one.
        if (!emotionSprite.customFilePath || emotionSprite.customFilePath.length === 0) {
            updatedPaperDoll.emotions[emotion].customFileAbsolutePath = null;
            onPaperDollChange(updatedPaperDoll);
            return;
        }

        //If there is a original custom file that is different from the current one, rollback to that one.
        if (GetFileNameFromPath(emotionSprite.customFileAbsolutePath) !== emotionSprite.customFilePath.pop()) {
            const originalFileInfo = await GetFileFromResources(emotionSprite.customFilePath);
            updatedPaperDoll.emotions[emotion].customFileAbsolutePath = ApplyFileProtocol(originalFileInfo.path);
            onPaperDollChange(updatedPaperDoll);
            return;
        }

        //If the image removed is the original one
        if (GetFileNameFromPath(emotionSprite.customFileAbsolutePath) === emotionSprite.customFilePath.pop()) {
            updatedPaperDoll.emotions[emotion].customFileAbsolutePath = null;
            updatedPaperDoll.emotions[emotion].customFilePath = null;
            onPaperDollChange(updatedPaperDoll);
        }
    };

    return (
        <Stack direction="column">
            {editable && paperDoll.isCustom && (
                <Button variant="contained" component="label">
                    {t('interface.editor.paper_doll.input_label_custom_image')}
                    <input name="avatar" type="file" hidden onChange={onImageSelected} accept="image/*" />
                </Button>
            )}

            {paperDoll.isCustom && getCustomSprite(paperDoll, emotion) && (
                <>
                    <img src={getCustomSprite(paperDoll, emotion)} />
                    <Button variant="contained" onClick={onImageRemoved}>
                        <CloseIcon />
                    </Button>
                </>
            )}

            {!paperDoll.isCustom && (
                <>
                    <img src={getPieceOfTypeForEmotion(paperDoll, emotion, PieceType.BODY)?.absolutePath}></img>
                    <img src={getPieceOfTypeForEmotion(paperDoll, emotion, PieceType.HAIR)?.absolutePath}></img>
                    <img src={getPieceOfTypeForEmotion(paperDoll, emotion, PieceType.FACE)?.absolutePath}></img>
                </>
            )}
        </Stack>
    );
}
