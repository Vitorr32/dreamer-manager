import { ModifierType, ModifierTypeSection } from '../base/Modifier';
import { Entity } from '../enums/Entities.enum';

export enum EffectOriginType {
    TRAIT,
    EVENT,
}

export interface EffectEditorOptions {
    isEventEffect?: boolean;
    specifiedEntities?: {
        [key in Entity]?: any[];
    };
    filteredTypes?: ModifierTypeSection[];
    filteredModifiers?: {
        [key in ModifierTypeSection]: ModifierType;
    };
    allowConditionTree?: boolean;
    effectOriginType?: EffectOriginType;
    effectOriginID?: string;
}
