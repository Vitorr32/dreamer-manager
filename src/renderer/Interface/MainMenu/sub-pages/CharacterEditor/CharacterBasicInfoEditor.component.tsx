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

export function CharacterBasicInfoEditor({ character, onChange }: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();

    const nations = useAppSelector((state: RootState) => state.database.nations);
    const cities = useAppSelector((state: RootState) => state.database.cities);

    const getCitiesFromNations = (nationID: string) => {
        return cities.filter((city) => city.country === nationID);
    };

    console.log('current character', character);

    return (
        <Box className="char-basic-info-editor">
            <Box className="char-basic-info-editor__subsection-status">
                <Typography>{t('interface.editor.character.section_title_basic_info')}</Typography>
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

                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_type')}</InputLabel>
                    <Select
                        value={character.hometown || ''}
                        label={t('interface.editor.character.input_label_type')}
                        onChange={(ev) => onChange(CharacterVariablesKey.TYPE, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_type')}
                        </MenuItem>
                        {Object.values(CharacterType).map((enumValue) => (
                            <MenuItem key={enumValue} value={enumValue}>
                                {t(enumValue)}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{t('interface.editor.character.input_helper_type')}</FormHelperText>
                </FormControl>

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
                    <InputLabel>{t('interface.editor.character.input_label_nationality')}</InputLabel>
                    <Select
                        value={character.nationality || ''}
                        label={t('interface.editor.character.input_label_nationality')}
                        onChange={(ev) => onChange(CharacterVariablesKey.NATIONALITY, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_nationality')}
                        </MenuItem>
                        {nations.map((nation) => (
                            <MenuItem key={nation.id} value={nation.id}>
                                {t(nation.name)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_hometown')}</InputLabel>
                    <Select
                        value={character.hometown || ''}
                        label={t('interface.editor.character.input_label_hometown')}
                        onChange={(ev) => onChange(CharacterVariablesKey.HOMETOWN, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_hometown')}
                        </MenuItem>
                        {getCitiesFromNations(character.nationality).map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                                {t(city.name)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {character.type === CharacterType.STAFF && (
                    <FormControl>
                        <InputLabel>{t('interface.editor.character.input_label_gender')}</InputLabel>
                        <Select
                            value={character.gender || ''}
                            label={t('interface.editor.character.input_label_gender')}
                            onChange={(ev) => onChange(CharacterVariablesKey.GENDER, ev.target.value)}
                        >
                            <MenuItem disabled value="">
                                {t('interface.editor.character.input_placeholder_gender')}
                            </MenuItem>
                            {Object.values(Gender).map((gender) => (
                                <MenuItem key={`gender_${gender}`} value={gender}>
                                    {t(gender)}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{t('interface.editor.character.input_helper_gender')}</FormHelperText>
                    </FormControl>
                )}

                <FormControl>
                    <FormControlLabel
                        control={<Checkbox checked={character.isActive} onChange={(ev) => onChange(CharacterVariablesKey.ACTIVE, ev.target.checked)} />}
                        label={t('interface.editor.character.input_label_active')}
                    />
                    <FormHelperText>{t('interface.editor.character.input_helper_active')}</FormHelperText>
                </FormControl>
            </Box>

            <Box className="char-basic-info-editor__subsection-living-standard">
                <Typography>{t('interface.editor.character.section_title_living_conditions')}</Typography>

                <FormControl>
                    <InputLabel>{t('interface.editor.character.input_label_residence')}</InputLabel>
                    <Select
                        value={character.residenceLocation || ''}
                        label={t('interface.editor.character.input_label_residence')}
                        onChange={(ev) => onChange(CharacterVariablesKey.RESIDENCE_LOCATION, ev.target.value)}
                    >
                        <MenuItem disabled value="">
                            {t('interface.editor.character.input_placeholder_residence')}
                        </MenuItem>
                        {cities.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                                {t(city.name)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}
