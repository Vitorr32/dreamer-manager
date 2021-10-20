import { ModifierType, ModifierTypeSection } from '../models/base/Modifier';

export function GetModifierTypesOfSection(section: ModifierTypeSection): ModifierType[] {
    switch (section) {
        case ModifierTypeSection.ATTR_SECTION:
            return [ModifierType.MODIFY_SKILL_POTENTIAL_VALUE, ModifierType.MODIFY_SKILL_GAIN_MULTIPLIER_VALUE, ModifierType.MODIFY_SKILL_CURRENT_VALUE];
        case ModifierTypeSection.EVENT_SECTION:
            return [ModifierType.MODIFY_EVENT_FLAG_ADD, ModifierType.MODIFY_EVENT_FLAG_REMOVE, ModifierType.MODIFY_EVENT_TRIGGER];
        default:
            return [];
    }
}
