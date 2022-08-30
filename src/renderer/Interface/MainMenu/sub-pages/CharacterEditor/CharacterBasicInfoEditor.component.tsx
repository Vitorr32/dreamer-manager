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
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Character, CharacterType, CharacterVariablesKey, Gender } from 'renderer/shared/models/base/Character.model';
import { DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Dreamer } from 'renderer/shared/models/base/Dreamer.model';
import { TraitList } from 'renderer/shared/components/character/TraitList.component';

interface IProps {
    character: Dreamer | Character;
    onChange: (key: CharacterVariablesKey, value: any) => void;
    onNextStep: () => void;
}

export function CharacterBasicInfoEditor({ character, onChange, onNextStep }: IProps) {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const nations = useAppSelector((state: RootState) => state.database.nations);
    const cities = useAppSelector((state: RootState) => state.database.cities);

    const getCitiesFromNations = (nationID: string) => {
        return cities.filter((city) => city.country === nationID);
    };

    return (
        <Stack direction="column">
            <Box sx={{ display: 'flex', columnGap: '20px' }}>
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

            <TextField
                label={t('interface.editor.character.input_label_height')}
                helperText={t('interface.editor.character.input_helper_height')}
                sx={{ marginTop: '20px' }}
                required
                value={character.height}
                InputProps={{
                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
            />

            <FormControl sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_type')}</InputLabel>
                <Select
                    value={character.type || ''}
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
                    minDate={new Date(1560, 0, 0)}
                    maxDate={new Date(1700, 12, 30)}
                    onError={(reason: any) => console.error('*** VariableValueInput Error on Datepicker: ', reason)}
                    inputFormat={DATE_ONLY_DAY_FORMAT}
                    value={new Date(character.birthday || '01/01/1560')}
                    onChange={(e: any) => onChange(CharacterVariablesKey.BIRTHDAY, e.toDateString())}
                    renderInput={(params: any) => <TextField {...params} sx={{ marginTop: '20px' }} />}
                />
                <FormHelperText>{t('interface.editor.character.input_helper_birthday')}</FormHelperText>
            </LocalizationProvider>

            <FormControl sx={{ marginTop: '20px' }}>
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

            <FormControl sx={{ marginTop: '20px' }}>
                <InputLabel>{t(`interface.editor.character.${character.nationality ? 'input_label_hometown' : 'input_placeholder_hometown_disabled'}`)}</InputLabel>
                <Select
                    disabled={!character.nationality}
                    value={character.hometown || ''}
                    label={t(`interface.editor.character.${character.nationality ? 'input_label_hometown' : 'input_placeholder_hometown_disabled'}`)}
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
                <FormControl sx={{ marginTop: '20px' }}>
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

            <FormControl sx={{ marginTop: '20px' }}>
                <FormControlLabel
                    control={<Checkbox checked={character.isActive || false} onChange={(ev) => onChange(CharacterVariablesKey.ACTIVE, ev.target.checked)} />}
                    label={
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>
                            {t('interface.editor.character.input_label_active')}
                        </Typography>
                    }
                />
                <FormHelperText>{t('interface.editor.character.input_helper_active')}</FormHelperText>
            </FormControl>

            <FormControl sx={{ marginTop: '20px' }}>
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

            <Box sx={{ marginTop: '20px', position: 'relative' }}>
                <TraitList traitList={character.traits} readOnly={false} onChange={(traits) => onChange(CharacterVariablesKey.TRAITS, traits)} />
                <FormHelperText>{t('interface.editor.character.trait_list_helper')}</FormHelperText>
            </Box>

            <Button variant="contained" disabled={!character.type} sx={{ marginLeft: 'auto', display: 'inline-block', marginTop: '20px' }} onClick={onNextStep}>
                Next Step
            </Button>
        </Stack>
    );
}
