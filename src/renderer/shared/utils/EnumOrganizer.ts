import { ModifierType, ModifierTypeSection } from '../models/base/Modifier';

export function GetModifierTypesOfSection(section: ModifierTypeSection, filteredSections: ModifierTypeSection[] = []): ModifierType[] {
    if (filteredSections.includes(section)) {
        return [];
    }

    switch (section) {
        case ModifierTypeSection.ENTITY_MODIFICATION:
            return [ModifierType.MODIFY_ENTITY_VARIABLE];
        case ModifierTypeSection.EVENT_SECTION:
            return [ModifierType.MODIFY_TRIGGER_EVENT];
        case ModifierTypeSection.RELATIONSHIP_SECTION:
            return [
                ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_LOVE_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE,
            ];
        default:
            return [];
    }
}
