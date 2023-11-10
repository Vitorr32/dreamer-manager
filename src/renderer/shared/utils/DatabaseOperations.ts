import { store } from 'renderer/redux/store';
import { EntityType } from '../models/enums/Entities.enum';
import { EntityBase } from '../models/base/Entity.model';

export function GetEntitiesOfType(entity: EntityType): EntityBase[] {
    switch (entity) {
        case EntityType.CHARACTERS:
            return store.getState().database.characters;
        default:
            console.error(`Searched for unknown entity: ${entity}`);
            return [];
    }
}
