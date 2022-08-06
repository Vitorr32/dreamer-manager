import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Character, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Nation } from 'renderer/shared/models/enums/Nation.enum';

interface IProps {
    character: Character;
    onChange: (key: CharacterVariablesKey, value: any) => void;
}

export function CharacterBasicInfoEditor({ character, onChange }: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();

    return (
        <Box className="char-basic-info-editor">
            <Box className="char-basic-info-editor__names">
                <TextField
                    label={t('interface.editor.character.input_label_first_name')}
                    required
                    value={character.name}
                    onChange={(ev) => onChange(CharacterVariablesKey.NAME, ev.target.value)}
                    variant="outlined"
                />
                <TextField
                    label={t('interface.editor.character.input_label_nickname')}
                    value={character.nickname}
                    onChange={(ev) => onChange(CharacterVariablesKey.NICKNAME, ev.target.value)}
                    variant="outlined"
                />
                <TextField
                    label={t('interface.editor.character.input_label_surname')}
                    required
                    value={character.surname}
                    onChange={(ev) => onChange(CharacterVariablesKey.SURNAME, ev.target.value)}
                    variant="outlined"
                />
            </Box>

            <Box className="char-basic-info-editor__status">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label={t('interface.editor.character.input_label_birthday')}
                        mask="__/__/____"
                        onError={(reason: any) => console.error('*** VariableValueInput Error on Datepicker: ', reason)}
                        inputFormat={DATE_ONLY_DAY_FORMAT}
                        value={new Date(character.birthday || '01/01/0001')}
                        onChange={(e: any) => onChange(CharacterVariablesKey.BIRTHDAY, e.toDateString())}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <FormControl>
                    <FormControlLabel control={<Checkbox checked={character.isActive} />} label={t('interface.editor.character.input_label_active')} />
                    <FormHelperText>{t('interface.editor.character.input_helper_active')}</FormHelperText>
                </FormControl>

                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_nationality')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={character.nationality || ''}
                        label={t('interface.editor.character.input_label_nationality')}
                        onChange={(ev) => onChange(CharacterVariablesKey.NATIONALITY, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_nationality')}
                        </MenuItem>
                        {Object.values(Nation).map((nation) => (
                            <MenuItem key={`nationality_${nation}`} value={nation}>
                                {t(nation)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_nationality')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={character.nationality || ''}
                        label={t('interface.editor.character.input_label_nationality')}
                        onChange={(ev) => onChange(CharacterVariablesKey.NATIONALITY, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_nationality')}
                        </MenuItem>
                        {Object.values(Nation).map((nation) => (
                            <MenuItem key={`nationality_${nation}`} value={nation}>
                                {t(nation)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
