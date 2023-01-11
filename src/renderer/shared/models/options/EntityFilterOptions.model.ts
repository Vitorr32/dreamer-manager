import { Source } from '../base/Effect.model';
import { ShortcutFilter } from '../base/EntityVariableValue.model';
import { Entity } from '../enums/Entities.enum';
export interface EntityFilterOptions {
    specifiedEntities?: {
        [key in Entity]?: {
            label: string;
            data: any;
            shortcut?: ShortcutFilter;
        }[];
    };
    filteredEntities?: Entity[];
    filteredAttributes?: {
        [key in Entity]?: string[];
    };
    allowConditionTree?: boolean;
    sourceType?: Source;
    sourceID?: string;
}
