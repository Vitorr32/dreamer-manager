import { Source } from '../base/Effect.model';
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
    //Boolean to check if the entity filter is looking for one specific entity (So all the conditions are about said Entity) or just checking several world states.
    //If true, the filter will only show the specified entities and the conditions will be about them.
    //If false, the filter will show all the entities and the conditions will be about the world states.
    isLookingForSpecifiEntity?: boolean;
    filteredDynamicEntities?: DynamicEntity[];
    filteredAttributes?: {
        [key in EntityType]?: string[];
    };
    fixedEntity?: EntityType;
    allowConditionTree?: boolean;
    sourceType?: Source;
    sourceID?: string;
}
