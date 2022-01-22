import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en_US } from './resources/en_US';
import { pt_BR } from './resources/pt_BR';
import { format as formatDate, isDate, isValid } from 'date-fns';
import { dateLocales } from 'renderer/shared/utils/Localization';

i18n.use(initReactI18next).init({
    resources: {
        en_US,
        pt_BR,
    },
    lng: 'en_US',
    fallbackLng: 'en_US',
    interpolation: {
        escapeValue: false,
        format: (value, format, lng) => {
            if (isDate(value) && format && lng) {
                const locale = dateLocales[lng];

                if (!isValid(value)) {
                    return 'Invalid Date';
                }

                switch (format) {
                    case 'short':
                        return formatDate(value, 'P', { locale });
                    case 'long':
                        return formatDate(value, 'PPPP', { locale });
                    case 'time':
                        return formatDate(value, 'Pp', { locale });
                    // case 'relative':
                    //     return formatRelative(value, new Date(), { locale });
                    // case 'ago':
                    //     return formatDistance(value, new Date(), {
                    //         locale,
                    //         addSuffix: true,
                    //     });
                    default:
                        return formatDate(value, format, { locale });
                }
            }

            return value;
        },
    },
});
