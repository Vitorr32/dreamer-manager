import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Actor } from 'renderer/shared/models/base/Actor.model';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { ActorSelection } from './ActorSelection.component';

interface IProps {
    actors: Actor[];
    hasOriginActor?: boolean;
    onTargetFilterChange: (filter: EntityFilter) => void;
    onReceptorFilterChange: (filter: EntityFilter) => void;
}

export function AffectedActorsSelect({ actors, hasOriginActor = false, onTargetFilterChange, onReceptorFilterChange }: IProps) {
    const { t, i18n } = useTranslation();

    const onActorChanged = (changedActor: string | 'ALL', isOrigin: boolean = true) => {
        if (changedActor === 'ALL') {
            const allActorsFilters: EntityFilter = {
                entity: Entity.ACTORS,
                variableKey: '',
                operator: VariableOperator.EQUALS_TO,
                value: actors.map((actor) => actor.id),
            };

            if (isOrigin) {
                onReceptorFilterChange(allActorsFilters);
            } else {
                onTargetFilterChange(allActorsFilters);
            }
            return;
        }

        const newFilter = {
            entity: Entity.ACTORS,
            variableKey: Actor.getEntityVariables().id,
            operator: VariableOperator.EQUALS_TO,
            value: changedActor,
        };

        if (isOrigin) {
            onReceptorFilterChange(newFilter);
        } else {
            onTargetFilterChange(newFilter);
        }
    };

    return (
        <>
            {hasOriginActor && <ActorSelection actorPool={actors} onSelection={(actors) => onActorChanged(actors, true)} />}

            <ActorSelection actorPool={actors} onSelection={(actors) => onActorChanged(actors, false)} multiple addEveryoneOption />
        </>
    );
}
