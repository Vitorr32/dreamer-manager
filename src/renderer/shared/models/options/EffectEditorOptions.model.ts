import { Actor } from "../base/Event.model";
import { ModifierType, ModifierTypeSection } from "../base/Modifier";
export interface EffectEditorOptions {
    specifiedActors?: Actor[];
    filteredTypes?: ModifierTypeSection[];
    filteredModifiers?: {
        [key in ModifierTypeSection] : ModifierType
    };
    allowConditionTree?: boolean;
}
