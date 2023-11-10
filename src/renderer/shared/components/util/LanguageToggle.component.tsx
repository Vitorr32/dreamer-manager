import { MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_CODES } from 'renderer/shared/Constants';
import { getLocaleLabel } from 'renderer/shared/utils/Localization';

export function LanguageToggle() {
    const { t, i18n } = useTranslation();
    return (
        <TextField label={t('interface.commons.language')} value={i18n.language} variant="outlined" select onChange={(event) => i18n.changeLanguage(event.target.value)}>
            {LANGUAGE_CODES.map((value) => {
                return (
                    <MenuItem key={`language_${value}`} value={value}>
                        {getLocaleLabel(value)}
                    </MenuItem>
                );
            })}
        </TextField>
    );
}
