import { ModifierType, ModifierTypeSection } from '../models/base/Modifier';

export function GetModifierTypesOfSection(section: ModifierTypeSection, filteredSections: ModifierTypeSection[] = []): ModifierType[] {
    if (filteredSections.includes(section)) {
        return [];
    }

    switch (section) {
        case ModifierTypeSection.ENTITY_MODIFICATION:
            return [ModifierType.MODIFY_ENTITY_VARIABLE];
        case ModifierTypeSection.EVENT_SECTION:
            return [ModifierType.MODIFY_EVENT_FLAG_ADD, ModifierType.MODIFY_EVENT_FLAG_REMOVE, ModifierType.MODIFY_TRIGGER_EVENT];
        case ModifierTypeSection.RELATIONSHIP_SECTION:
            return [
                ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_LOVE_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE,
            ];
        case ModifierTypeSection.TRAIT_SECTION:
            return [ModifierType.MODIFY_TRAIT_GAIN, ModifierType.MODIFY_TRAIT_REMOVE];
        default:
            return [];
    }
}
