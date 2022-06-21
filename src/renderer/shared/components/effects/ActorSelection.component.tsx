import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Actor } from 'renderer/shared/models/base/Event.model';

interface IProps {
    actorPool: Actor[];
    onSelection: (actorSelection: any) => void;
    addEveryoneOption?: boolean;
    multiple?: boolean;
    helperText?: string;
}

export function ActorSelection({ actorPool, onSelection, addEveryoneOption = false, multiple = false, helperText }: IProps) {
    const { t, i18n } = useTranslation();

    return (
        <FormControl variant="filled">
            <InputLabel>{t('interface.editor.modifier.input_label_actor_selection')}</InputLabel>
            <Select onChange={(event) => onSelection(event.target.value)} multiple={multiple}>
                {addEveryoneOption && (
                    <MenuItem key={`origin_actor_option_all`} value={'ALL'}>
                        {t('interface.editor.actor.option_actor_all')}
                    </MenuItem>
                )}
                {actorPool.map((actor) => (
                    <MenuItem key={`origin_actor_option_${actor.id}`} value={actor.id}>
                        {actor.alias}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
