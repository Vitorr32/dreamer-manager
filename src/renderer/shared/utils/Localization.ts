import { Locale } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';

export const dateLocales: { [key: string]: Locale } = { en_US: enUS, pt_BR: ptBR };

export function getDateLocale(localeString: string) {
    return dateLocales[localeString];
}
