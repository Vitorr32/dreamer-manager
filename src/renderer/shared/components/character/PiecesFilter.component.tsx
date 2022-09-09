import { Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { PaperPiece, PieceType } from 'renderer/shared/models/base/PaperPiece.model';
import { useState } from 'react';
import { BodyType, Ethnicity, Style } from 'renderer/shared/models/base/Character.model';
import { Emotion } from 'renderer/shared/models/base/PaperDoll.model';

interface IProps {
    onFilterChange: (filteredPieces: PaperPiece[]) => void;
}

export function PaperDollViewer({ onFilterChange }: IProps) {
    const theme = useTheme();
    const paperPieces = useAppSelector((state: RootState) => state.database.paperPieces);

    const { t, i18n } = useTranslation();

    const [currentType, setType] = useState<PieceType>();
    const [currentStyle, setStyle] = useState<Style>();
    const [currentBodyType, setBodyType] = useState<BodyType>();
    const [currentEthnicity, setEthnicity] = useState<Ethnicity>();
    const [currentEmotion, setEmotion] = useState<Emotion>();

    return <Stack direction="column"></Stack>;
}
