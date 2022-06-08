import { Actor } from '../base/Event.model';
import { ModifierType, ModifierTypeSection } from '../base/Modifier';

export interface EffectEditorOptions {
    isEventEffect?: boolean;
    specifiedActors?: Actor[];
    filteredTypes?: ModifierTypeSection[];
    filteredModifiers?: {
        [key in ModifierTypeSection]: ModifierType;
    };
    allowConditionTree?: boolean;
}
