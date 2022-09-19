import { Button, Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Emotion, PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { PaperPiece, PieceType } from 'renderer/shared/models/base/PaperPiece.model';
import { useState } from 'react';
import { ApplyFileProtocol } from 'renderer/shared/utils/StringOperations';

interface IProps {
    character: Character;
    paperDoll: PaperDoll;
    emotion: Emotion;
    editable?: boolean;
    fullBody?: boolean;
}

export function PaperDollViewer({ character, paperDoll, emotion, editable = false, fullBody = false }: IProps) {
    const theme = useTheme();
    const paperPieces = useAppSelector((state: RootState) => state.database.mappedDatabase.paperPieces);

    const { t, i18n } = useTranslation();
    const [tempImagePath, setTempImagePath] = useState<string>();

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
                return !!paperDoll.emotions[emotion] ? emotion : !!paperDoll.emotions[Emotion.SAD] ? Emotion.SAD : Emotion.NEUTRAL;
            case Emotion.EUPHORIC:
                return !!paperDoll.emotions[emotion] ? emotion : !!paperDoll.emotions[Emotion.HAPPY] ? Emotion.HAPPY : Emotion.NEUTRAL;
            case Emotion.TERRIFIED:
                return !!paperDoll.emotions[emotion] ? emotion : !!paperDoll.emotions[Emotion.SCARED] ? Emotion.SCARED : Emotion.NEUTRAL;
            case Emotion.ANGRY:
                return !!paperDoll.emotions[emotion] ? emotion : !!paperDoll.emotions[Emotion.ANNOYED] ? Emotion.ANNOYED : Emotion.NEUTRAL;
            case Emotion.ASHAMED:
                return !!paperDoll.emotions[emotion] ? emotion : !!paperDoll.emotions[Emotion.EMBARRASSED] ? Emotion.EMBARRASSED : Emotion.NEUTRAL;
            case Emotion.SAD:
            case Emotion.HAPPY:
            case Emotion.ANNOYED:
            case Emotion.SCARED:
            case Emotion.EMBARRASSED:
                return !!paperDoll.emotions[emotion] ? emotion : Emotion.NEUTRAL;
            default:
                return Emotion.NEUTRAL;
        }
    };

    const getCustomSprite = (paperDoll: PaperDoll, emotion: Emotion): string => {
        const closestEmotion = getClosestEmotion(paperDoll, emotion);

        return paperDoll.emotions[closestEmotion].customFileAbsolutePath;
    };

    const onImageSelected = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files === null) {
            return;
        }

        const files = [];
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            files.push({ path: file.path, name: file.name });
        }

        setTempImagePath(ApplyFileProtocol(files[0].path));
    };

    return (
        <Stack direction="column">
            {editable && (
                <Button variant="contained" component="label">
                    {t('interface.editor.paper_doll.input_label_custom_image')}
                    <input name="avatar" type="file" hidden onChange={onImageSelected} accept="image/*" />
                </Button>
            )}

            {paperDoll.isCustom && <img src={getCustomSprite(paperDoll, emotion)} />}

            {!paperDoll.isCustom && (
                <>
                    <img src={getPieceOfTypeForEmotion(paperDoll, emotion, PieceType.BODY).absolutePath}></img>
                    <img src={getPieceOfTypeForEmotion(paperDoll, emotion, PieceType.HAIR).absolutePath}></img>
                    <img src={getPieceOfTypeForEmotion(paperDoll, emotion, PieceType.FACE).absolutePath}></img>
                </>
            )}
        </Stack>
    );
}
