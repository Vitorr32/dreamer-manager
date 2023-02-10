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
    filteredEntities?: string[];
    filteredAttributes?: {
        [key in EntityType]?: string[];
    };
    allowConditionTree?: boolean;
    sourceType?: Source;
    sourceID?: string;
}
