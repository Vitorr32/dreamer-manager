import { Locale } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { LANGUAGE_NAME } from '../Constants';

export const dateLocales: { [key: string]: Locale } = { en_US: enUS, pt_BR: ptBR };

export function getDateLocale(localeString: string) {
    return dateLocales[localeString];
}

export function getLocaleLabel(localeString: string, long = false) {
    return LANGUAGE_NAME[localeString];
}
