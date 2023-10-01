import { Autocomplete, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { PaperPiece, PieceType } from 'renderer/shared/models/base/PaperPiece.model';
import { useEffect, useState } from 'react';
import { BodyType, Ethnicity, Style } from 'renderer/shared/models/base/Character.model';
import { Emotion } from 'renderer/shared/models/enums/sprite/Emotion.enum';

interface IProps {
    selectedPieces?: PaperPiece[];
    onFilterChange: (filteredPieces: PaperPiece[]) => void;
}

enum Filters {
    TYPE = 'model.paper_doll.filters.type',
    EMOTION = 'model.paper_doll.filters.emotion',
    STYLE = 'model.paper_doll.filters.style',
    ETHNICITY = 'model.paper_doll.filters.ethnicity',
    BODY_TYPE = 'model.paper_doll.filters.body_type',
}

export function PiecesSelector({ selectedPieces = [], onFilterChange }: IProps) {
    const theme = useTheme();
    const paperPieces = useAppSelector((state: RootState) => state.database.paperPieces);

    const { t, i18n } = useTranslation();

    const [currentType, setType] = useState<PieceType>();
    const [currentStyle, setStyle] = useState<Style>();
    const [currentBodyType, setBodyType] = useState<BodyType>();
    const [currentEthnicity, setEthnicity] = useState<Ethnicity>();
    const [currentEmotion, setEmotion] = useState<Emotion>();
    const [currentPieces, setFilteredPieces] = useState<PaperPiece[]>([]);

    useEffect(() => {
        if (currentPieces.length === 0) {
            resetFilteredPieces();
        }
    }, []);

    const resetFilteredPieces = (): void => {
        setFilteredPieces(paperPieces);
        setType(null);
        setStyle(null);
        setBodyType(null);
        setEthnicity(null);
        setEmotion(null);
    };

    const getAllFilterOptionsWithFilterType = () => {
        return [
            ...Object.values(PieceType).map((value) => ({ value, filterType: Filters.TYPE })),
            ...Object.values(Emotion).map((value) => ({ value, filterType: Filters.EMOTION })),
            ...Object.values(Style).map((value) => ({ value, filterType: Filters.STYLE })),
            ...Object.values(Ethnicity).map((value) => ({ value, filterType: Filters.ETHNICITY })),
            ...Object.values(BodyType).map((value) => ({ value, filterType: Filters.BODY_TYPE })),
        ];
    };

    return (
        <Stack direction="column">
            <Autocomplete
                id="pieces-filter-tags"
                multiple
                options={getAllFilterOptionsWithFilterType()}
                groupBy={(option) => t(option.filterType)}
                getOptionLabel={(option) => (typeof option === 'string' ? option : t(option.value))}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={t('interface.editor.paper_doll.input_label_filters')} />}
            />

            <Grid container>
                {currentPieces.map((piece) => (
                    <Grid key={`piece_${piece.id}`} item xs={4} sx={{ position: 'relative', border: '2px solid transparent' }}>
                        <img style={{ width: '100%' }} src={piece.absolutePath} alt={piece.id} />
                        <Typography sx={{ position: 'absolute', bottom: '0', left: '0', padding: '5px' }} variant="caption">
                            {piece.id}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
