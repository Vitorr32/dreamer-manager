import { store } from 'renderer/redux/store';
import { EntityType } from '../models/enums/Entities.enum';

export function getDynamicEntity<T>(dynamicEntity: EntityType): T | T[] {
    const storeState = store.getState();

    if (!storeState.gameState.isActive) {
    }
    return [];
}
