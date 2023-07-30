import { DynamicEntity } from '../base/EntityVariableValue.model';
import { EntityType } from '../enums/Entities.enum';
export interface EntityFilterOptions {
    specifiedEntities?: {
        [key in EntityType]?: {
            label: string;
            data: any;
            shortcut?: DynamicEntity;
        }[];
    };
    //EntityType to check if the entity filter is looking for one specific entity (So all the conditions are about said Entity) or just checking several world states.
    //If true equivalent, the filter will only show the specified entities and the conditions will be about them.
    //If false equivalent, the filter will show all the entities and the conditions will be about the world states.
    isLookingForSpecificEntity?: EntityType;
    filteredDynamicEntities?: DynamicEntity[];
    filteredAttributes?: {
        [key in EntityType]?: string[];
    };
}
