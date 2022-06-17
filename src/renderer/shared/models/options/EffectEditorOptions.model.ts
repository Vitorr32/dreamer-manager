import { Actor } from '../base/Event.model';
import { ModifierType, ModifierTypeSection } from '../base/Modifier';

export enum EffectOriginType {
    TRAIT,
    EVENT,
}

export interface EffectEditorOptions {
    isEventEffect?: boolean;
    specifiedActors?: Actor[];
    filteredTypes?: ModifierTypeSection[];
    filteredModifiers?: {
        [key in ModifierTypeSection]: ModifierType;
    };
    allowConditionTree?: boolean;
    effectOriginType?: EffectOriginType;
    effectOriginID?: string;
}
