import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Actor } from 'renderer/shared/models/base/Event.model';
import { ModifierTargetSpecification } from 'renderer/shared/models/base/Modifier';

interface IProps {
    actors: Actor[];
    originActors?: string[] | ModifierTargetSpecification;
    targetActors?: string[] | ModifierTargetSpecification;
    hasOriginActor?: boolean;
    onChange: (values: string[] | ModifierTargetSpecification, isOrigin: boolean) => void;
}

export function AffectedActorsSelect({ actors, originActors, hasOriginActor = false, targetActors, onChange }: IProps) {
    const { t, i18n } = useTranslation();

    const onActorChanged = (actors: string | string[] | ModifierTargetSpecification, isOrigin: boolean = true) => {
        switch (actors) {
            case ModifierTargetSpecification.EVERYONE:
            case ModifierTargetSpecification.EVERYONE_ATTENDS_CONDITION:
                onChange([actors], isOrigin);
            default:
                onChange(Array.isArray(actors) ? actors : [actors], isOrigin);
        }
    };

    return (
        <>
            {hasOriginActor && (
                <FormControl variant="filled">
                    <InputLabel htmlFor="origin_actors">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                    <Select id="origin_actors" value={originActors || ['']} onChange={(event) => onActorChanged(event.target.value, true)} multiple>
                        {actors.map((actor) => (
                            <MenuItem key={`origin_actor_option_${actor.id}`} value={actor.id}>
                                {actor.alias}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* <FormHelperText>{onRenderTypeHelper(sceneConnection?.type || ConnectionType.NORMAL)}</FormHelperText> */}
                </FormControl>
            )}

            <FormControl variant="filled">
                <InputLabel htmlFor="target_actors">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                <Select id="target_actors" value={targetActors || ['']} onChange={(event) => onActorChanged(event.target.value, false)} multiple>
                    <MenuItem key={`target_actor_option_${ModifierTargetSpecification.EVERYONE}`} value={ModifierTargetSpecification.EVERYONE}>
                        {t(ModifierTargetSpecification.EVERYONE)}
                    </MenuItem>
                    <MenuItem
                        key={`target_actor_option_${ModifierTargetSpecification.EVERYONE_ATTENDS_CONDITION}`}
                        value={ModifierTargetSpecification.EVERYONE_ATTENDS_CONDITION}
                    >
                        {t(ModifierTargetSpecification.EVERYONE_ATTENDS_CONDITION)}
                    </MenuItem>
                    {actors
                        .filter((actor) => !(originActors || []).includes(actor.id))
                        .map((actor) => (
                            <MenuItem key={`target_actor_option_${actor.id}`} value={actor.id}>
                                {actor.alias}
                            </MenuItem>
                        ))}
                </Select>
                {/* <FormHelperText>{onRenderTypeHelper(sceneConnection?.type || ConnectionType.NORMAL)}</FormHelperText> */}
            </FormControl>
        </>
    );
}
