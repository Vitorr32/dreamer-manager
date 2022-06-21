import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Actor } from 'renderer/shared/models/base/Event.model';
import { ActorSelection } from './ActorSelection.component';

interface IProps {
    actors: Actor[];
    hasOriginActor?: boolean;
    onTargetFilterChange: (filter: EntityFilter) => void;
    onReceptorFilterChange: (filter: EntityFilter) => void;
}

export function AffectedActorsSelect({ actors, hasOriginActor = false, onTargetFilterChange, onReceptorFilterChange }: IProps) {
    const { t, i18n } = useTranslation();

    const onActorChanged = (actors: any, isOrigin: boolean = true) => {
        console.log(actors);
    };

    return (
        <>
            {hasOriginActor && <ActorSelection actorPool={actors} onSelection={(actors) => onActorChanged(actors, true)} />}

            <ActorSelection actorPool={actors} onSelection={(actors) => onActorChanged(actors, false)} multiple addEveryoneOption />
        </>
    );
}
