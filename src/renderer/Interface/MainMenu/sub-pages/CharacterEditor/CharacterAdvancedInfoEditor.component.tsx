import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Affluency, Character, CharacterType, CharacterVariablesKey, FamilySituation, Gender } from 'renderer/shared/models/base/Character.model';
import { DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';

interface IProps {
    character: Character;
    onChange: (key: CharacterVariablesKey, value: any) => void;
}

export function CharacterAdvancedInfoEditor({ character, onChange }: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();

    return (
        <Box className="char-advanced-info-editor">
            <Box className="char-basic-info-editor__subsection-living-standard">
                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_affluency')}</InputLabel>
                    <Select
                        value={character.standardOfLiving || ''}
                        label={t('interface.editor.character.input_label_affluency')}
                        onChange={(ev) => onChange(CharacterVariablesKey.AFFLUENCY, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_affluency')}
                        </MenuItem>
                        {Object.values(Affluency).map((affluency) => (
                            <MenuItem key={`affluency_${affluency}`} value={affluency}>
                                {t(affluency)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_family')}</InputLabel>
                    <Select
                        value={character.familySituation || ''}
                        label={t('interface.editor.character.input_label_family')}
                        onChange={(ev) => onChange(CharacterVariablesKey.FAMILY_SITUATION, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_family')}
                        </MenuItem>
                        {Object.values(FamilySituation).map((enumValue) => (
                            <MenuItem key={enumValue} value={enumValue}>
                                {t(enumValue)}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{t('interface.editor.character.input_helper_family')}</FormHelperText>
                </FormControl>
            </Box>
        </Box>
    );
}
