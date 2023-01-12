import { Source } from '../base/Effect.model';
import { ShortcutFilter } from '../base/EntityVariableValue.model';
import { EntityType } from '../enums/Entities.enum';
export interface EntityFilterOptions {
    specifiedEntities?: {
        [key in EntityType]?: {
            label: string;
            data: any;
            shortcut?: ShortcutFilter;
        }[];
    };
    filteredEntities?: EntityType[];
    filteredAttributes?: {
        [key in EntityType]?: string[];
    };
    allowConditionTree?: boolean;
    sourceType?: Source;
    sourceID?: string;
}
