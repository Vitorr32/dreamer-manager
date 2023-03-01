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
import { Character, CharacterType, CharacterVariablesKey, Ethnicity, Gender } from 'renderer/shared/models/base/Character.model';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Dreamer } from 'renderer/shared/models/base/Dreamer.model';
import { TraitList } from 'renderer/shared/components/character/TraitList.component';
import { useState } from 'react';
import { Culture } from 'renderer/shared/models/enums/Culture.enum';

interface IProps {
    character: Dreamer | Character;
    onChange: (key: CharacterVariablesKey, value: any, isNumberInput?: boolean) => void;
    onNextStep: () => void;
}

export function CharacterBasicInfoEditor({ character, onChange, onNextStep }: IProps) {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const nations = useAppSelector((state: RootState) => state.database.nations);
    const cities = useAppSelector((state: RootState) => state.database.cities);
    const [errorState, setErrorState] = useState<{ [key in CharacterVariablesKey]: boolean }>();

    const getCitiesFromNations = (nationID: string) => {
        return cities.filter((city) => city.country === nationID);
    };

    const onBasicInfoSubmit = (ev: any) => {
        ev.preventDefault();

        let hasError = false;
        const updatedInfoErrors = {
            ...errorState,
        };

        //Required Check
        [
            CharacterVariablesKey.ID,
            CharacterVariablesKey.TYPE,
            CharacterVariablesKey.HEIGHT,
            CharacterVariablesKey.NAME,
            CharacterVariablesKey.SURNAME,
            CharacterVariablesKey.BIRTHDAY,
            CharacterVariablesKey.NATIONALITY,
            CharacterVariablesKey.HOMETOWN,
            CharacterVariablesKey.ETHNICITY,
            CharacterVariablesKey.CULTURE,
            CharacterVariablesKey.TRAITS,
        ].forEach((fieldKey) => {
            let fieldHasError = character[fieldKey] ? false : true;
            updatedInfoErrors[fieldKey] = fieldHasError;

            if (fieldHasError && !hasError) {
                hasError = true;
            }
        });

        if (hasError) {
            setErrorState(updatedInfoErrors);
            return;
        }

        onNextStep();
    };

    const onInputChange = (key: CharacterVariablesKey, value: any, isNumberInput: boolean = false) => {
        if (isNumberInput) {
            try {
                value = parseFloat(value);
            } catch (e) {
                value = 0;
            }
        }

        onChange(key, value);
        setErrorState({ ...errorState, [key]: value ? false : true });
    };

    return (
        <Stack direction="column" component={'form'} noValidate autoComplete="off" onSubmit={onBasicInfoSubmit}>
            <TextField
                label={t('interface.editor.character.input_label_id')}
                required
                value={character.id}
                onChange={(ev) => onInputChange(CharacterVariablesKey.ID, ev.target.value)}
                variant="outlined"
                error={errorState?.[CharacterVariablesKey.ID]}
                helperText={errorState?.[CharacterVariablesKey.ID] ? t('interface.editor.commons.required') : t('interface.editor.character.input_helper_id')}
            />

            <Box sx={{ display: 'flex', columnGap: '20px', marginTop: '20px' }}>
                <TextField
                    label={t('interface.editor.character.input_label_first_name')}
                    required
                    value={character.name}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.NAME, ev.target.value)}
                    variant="outlined"
                    error={errorState?.[CharacterVariablesKey.NAME]}
                    helperText={errorState?.[CharacterVariablesKey.NAME] ? t('interface.editor.commons.required') : ''}
                />
                <TextField
                    label={t('interface.editor.character.input_label_nickname')}
                    value={character.nickname}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.NICKNAME, ev.target.value)}
                    variant="outlined"
                />
                <TextField
                    label={t('interface.editor.character.input_label_surname')}
                    required
                    value={character.surname}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.SURNAME, ev.target.value)}
                    variant="outlined"
                    error={errorState?.[CharacterVariablesKey.SURNAME]}
                    helperText={errorState?.[CharacterVariablesKey.SURNAME] ? t('interface.editor.commons.required') : ''}
                />
            </Box>

            <TextField
                label={t('interface.editor.character.input_label_height')}
                error={errorState?.[CharacterVariablesKey.HEIGHT]}
                helperText={errorState?.[CharacterVariablesKey.HEIGHT] ? t('interface.editor.commons.required') : t('interface.editor.character.input_helper_height')}
                sx={{ marginTop: '20px' }}
                required
                onChange={(ev) => onInputChange(CharacterVariablesKey.HEIGHT, ev.target.value, true)}
                value={character.height || ''}
                InputProps={{
                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
            />

            <FormControl required error={errorState?.[CharacterVariablesKey.TYPE]} sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_type')}</InputLabel>
                <Select
                    value={character.type || ''}
                    label={t('interface.editor.character.input_label_type')}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.TYPE, ev.target.value)}
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
                <FormHelperText>
                    {errorState?.[CharacterVariablesKey.TYPE] ? t('interface.editor.commons.required') : t('interface.editor.character.input_helper_type')}
                </FormHelperText>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormControl required error={errorState?.[CharacterVariablesKey.BIRTHDAY]} sx={{ marginTop: '20px' }}>
                    <DesktopDatePicker
                        label={t('interface.editor.character.input_label_birthday')}
                        mask="__/__/____"
                        minDate={new Date(1560, 0, 0)}
                        maxDate={new Date(1700, 12, 30)}
                        onError={(reason: any) => setErrorState({ ...errorState, [CharacterVariablesKey.BIRTHDAY]: !!reason })}
                        inputFormat={t('interface.utils.date_format')}
                        value={character.birthday || new Date(1560, 0, 1)}
                        onChange={(e: any) => onInputChange(CharacterVariablesKey.BIRTHDAY, e.toISOString())}
                        renderInput={(params: any) => <TextField required {...params} />}
                    />
                    <FormHelperText>
                        {errorState?.[CharacterVariablesKey.BIRTHDAY] ? t('interface.editor.commons.invalid_date') : t('interface.editor.character.input_helper_birthday')}
                    </FormHelperText>
                </FormControl>
            </LocalizationProvider>

            <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_nationality')}</InputLabel>
                <Select
                    value={character.nationality || ''}
                    label={t('interface.editor.character.input_label_nationality')}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.NATIONALITY, ev.target.value)}
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

            <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t(`interface.editor.character.${character.nationality ? 'input_label_hometown' : 'input_placeholder_hometown_disabled'}`)}</InputLabel>
                <Select
                    disabled={!character.nationality}
                    value={character.hometown || ''}
                    label={t(`interface.editor.character.${character.nationality ? 'input_label_hometown' : 'input_placeholder_hometown_disabled'}`)}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.HOMETOWN, ev.target.value)}
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

            <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_ethnicity')}</InputLabel>
                <Select
                    value={character.ethnicity || ''}
                    label={t('interface.editor.character.input_label_ethnicity')}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.ETHNICITY, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.character.input_placeholder_ethnicity')}
                    </MenuItem>
                    {Object.values(Ethnicity).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {errorState?.[CharacterVariablesKey.ETHNICITY] ? t('interface.editor.commons.required') : t('interface.editor.character.input_helper_ethnicity')}
                </FormHelperText>
            </FormControl>

            <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_culture')}</InputLabel>
                <Select
                    value={character.culture || ''}
                    label={t('interface.editor.character.input_label_culture')}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.CULTURE, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.character.input_placeholder_culture')}
                    </MenuItem>
                    {Object.values(Culture).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {errorState?.[CharacterVariablesKey.CULTURE] ? t('interface.editor.commons.required') : t('interface.editor.character.input_helper_culture')}
                </FormHelperText>
            </FormControl>

            {/* TODO: Create a good way to add/remove languages of the character */}
            {/* <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_language')}</InputLabel>
                <Select
                    value={character.language || []}
                    label={t('interface.editor.character.input_label_language')}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.LANGUAGE, ev.target.value)}
                    multiple
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.character.input_placeholder_language')}
                    </MenuItem>
                    {Object.values(Culture).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {errorState?.[CharacterVariablesKey.CULTURE] ? t('interface.editor.commons.required') : t('interface.editor.character.input_helper_culture')}
                </FormHelperText>
            </FormControl> */}

            {character.type === CharacterType.STAFF && (
                <FormControl required sx={{ marginTop: '20px' }}>
                    <InputLabel>{t('interface.editor.character.input_label_gender')}</InputLabel>
                    <Select
                        value={character.gender || ''}
                        label={t('interface.editor.character.input_label_gender')}
                        onChange={(ev) => onInputChange(CharacterVariablesKey.GENDER, ev.target.value)}
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
                    sx={{ margin: '0' }}
                    control={<Checkbox checked={character.isActive || false} onChange={(ev) => onInputChange(CharacterVariablesKey.ACTIVE, ev.target.checked)} />}
                    label={
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>
                            {t('interface.editor.character.input_label_active')}
                        </Typography>
                    }
                />
                <FormHelperText>{t('interface.editor.character.input_helper_active')}</FormHelperText>
            </FormControl>

            <FormControl required sx={{ marginTop: '20px' }}>
                <InputLabel>{t('interface.editor.character.input_label_residence')}</InputLabel>
                <Select
                    value={character.residenceLocation || ''}
                    label={t('interface.editor.character.input_label_residence')}
                    onChange={(ev) => onInputChange(CharacterVariablesKey.RESIDENCE_LOCATION, ev.target.value)}
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
                <TraitList traitList={character.traits} readOnly={false} onChange={(traits) => onInputChange(CharacterVariablesKey.TRAITS, traits)} />
                <FormHelperText>{t('interface.editor.character.trait_list_helper')}</FormHelperText>
            </Box>

            <Button type="submit" variant="contained" sx={{ marginLeft: 'auto', display: 'inline-block', marginTop: '20px' }}>
                Next Step
            </Button>
        </Stack>
    );
}
