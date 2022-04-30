import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Actor } from 'renderer/shared/models/base/Event.model';

interface IProps {
    actors: Actor[];
    originActor?: string;
    targetActor?: string;
    returnData?: any;
    onChange: (values: string[], returnData?: any) => void;
}

export function AffectedActorsSelect({ actors, originActor, targetActor, onChange, returnData }: IProps) {
    const { t, i18n } = useTranslation();

    const onActorChanged = (actor: string, isOrigin: boolean = true) => {
        if (!actor) {
            return;
        }

        onChange([!isOrigin ? originActor : actor, isOrigin ? targetActor : actor], returnData);
    };

    return (
        <>
            <FormControl variant="filled">
                <InputLabel htmlFor="origin_actor">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                <Select id="origin_actor" value={originActor} onChange={(event) => onActorChanged(event.target.value, true)}>
                    {actors.map((actor) => (
                        <MenuItem value={actor.id}>{actor.alias}</MenuItem>
                    ))}
                </Select>
                {/* <FormHelperText>{onRenderTypeHelper(sceneConnection?.type || ConnectionType.NORMAL)}</FormHelperText> */}
            </FormControl>

            <FormControl variant="filled">
                <InputLabel htmlFor="origin_actor">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                <Select id="origin_actor" value={originActor} onChange={(event) => onActorChanged(event.target.value, false)}>
                    {actors.filter(actor => actor.id !== originActor).map((actor) => (
                        <MenuItem value={actor.id}>{actor.alias}</MenuItem>
                    ))}
                </Select>
                {/* <FormHelperText>{onRenderTypeHelper(sceneConnection?.type || ConnectionType.NORMAL)}</FormHelperText> */}
            </FormControl>

        </>
    );
}
