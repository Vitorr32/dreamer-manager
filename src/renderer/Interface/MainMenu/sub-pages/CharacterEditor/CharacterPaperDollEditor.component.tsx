import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DreamerAttributeViewer } from 'renderer/shared/components/character/DreamerAttributeViewer.component';
import { MAXIMUM_DREAMER_POTENTIAL } from 'renderer/shared/Constants';
import { Character, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { Dreamer, DreamerVariablesKey, FamilySituation } from 'renderer/shared/models/base/Dreamer.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { PaperDollViewer } from 'renderer/shared/components/character/PaperDollViewer.component';
import { Emotion, PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { PiecesSelector } from 'renderer/shared/components/character/PiecesSelector.component';

interface IProps {
    character: Character;
    paperDoll?: PaperDoll;
    onChange: (key: CharacterVariablesKey | DreamerVariablesKey, value: any) => void;
    onPreviousStep: () => void;
}

export function CharacterPaperDollEditor({ character, paperDoll, onChange, onPreviousStep }: IProps) {
    const params = useParams();

    const { t, i18n } = useTranslation();
    const [currentEmotion, setCurrentEmotion] = useState<Emotion>(Emotion.NEUTRAL);
    const [currentPaperDoll, setCurrentPaperDoll] = useState<PaperDoll>(new PaperDoll());

    useEffect(() => {
        if (paperDoll) {
            setCurrentPaperDoll(paperDoll);
        }
    }, []);

    const onFilteredChange = () => {};

    const onPaperDollChange = () => {};

    return (
        <Stack spacing={4} direction="column">
            <FormControl>
                <FormControlLabel
                    control={<Checkbox checked={currentPaperDoll.isCustom || false} onChange={(ev) => onChange(CharacterVariablesKey.PAPER_DOLL, ev.target.checked)} />}
                    label={
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>
                            {t('interface.editor.paper_doll.input_label_is_custom')}
                        </Typography>
                    }
                />
                <FormHelperText>{t('interface.editor.paper_doll.input_helper_is_custom')}</FormHelperText>
            </FormControl>

            <FormControl sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.paper_doll.input_label_emotion')}</InputLabel>
                <Select value={currentEmotion} label={t('interface.editor.paper_doll.input_label_emotion')} onChange={(ev) => setCurrentEmotion(ev.target.value as Emotion)}>
                    {Object.values(Emotion).map((emotion) => (
                        <MenuItem key={`emotion_${emotion}`} value={emotion}>
                            {t(emotion)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <PiecesSelector onFilterChange={onFilteredChange} />

            <PaperDollViewer character={character} paperDoll={currentPaperDoll} emotion={currentEmotion} editable />
            {/* <FormControl>
                <InputLabel>{t('interface.editor.dreamer.input_label_family')}</InputLabel>
                <Select
                    value={character || ''}
                    label={t('interface.editor.dreamer.input_label_family')}
                    onChange={(ev) => onChange(DreamerVariablesKey.FAMILY_SITUATION, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.dreamer.input_placeholder_family')}
                    </MenuItem>
                    {Object.values(FamilySituation).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.dreamer.input_helper_family')}</FormHelperText>
            </FormControl> */}

            <Button variant="contained" onClick={onPreviousStep} sx={{ marginLeft: 'auto', display: 'inline-block', marginTop: '20px' }}>
                {t('interface.commons.previous')}
            </Button>
        </Stack>
    );
}
