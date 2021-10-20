import { ModifierType, ModifierTypeSection } from '../models/base/Modifier';

export function GetModifierTypesOfSection(section: ModifierTypeSection): ModifierType[] {
    switch (section) {
        case ModifierTypeSection.ATTR_SECTION:
            return [ModifierType.MODIFY_SKILL_POTENTIAL_VALUE, ModifierType.MODIFY_SKILL_GAIN_MULTIPLIER_VALUE, ModifierType.MODIFY_SKILL_CURRENT_VALUE];
        case ModifierTypeSection.EVENT_SECTION:
            return [ModifierType.MODIFY_EVENT_FLAG_ADD, ModifierType.MODIFY_EVENT_FLAG_REMOVE, ModifierType.MODIFY_EVENT_TRIGGER];
        case ModifierTypeSection.RELATIONSHIP_SECTION:
            return [
                ModifierType.MODIFY_RELATIONSHIP_RELATION_FAMILIARITY,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_LOVE_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_POWER_VALUE,
                ModifierType.MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE,
            ];
        case ModifierTypeSection.STATIC_SECTION:
            return [
                ModifierType.MODIFY_STRESS_VALUE,
                ModifierType.MODIFY_STRESS_MAXIMUM,
                ModifierType.MODIFY_STRESS_FALL_MULTIPLIER,
                ModifierType.MODIFY_STRESS_GAIN_MULTIPLIER,
                ModifierType.MODIFY_ENERGY_VALUE,
                ModifierType.MODIFY_ENERGY_MAXIMUM,
                ModifierType.MODIFY_ENERGY_FALL_MULTIPLIER,
                ModifierType.MODIFY_ENERGY_GAIN_MULTIPLIER,
                ModifierType.MODIFY_MOOD_VALUE,
                ModifierType.MODIFY_LEARNING_RATE,
            ];
        case ModifierTypeSection.TRAIT_SECTION:
            return [ModifierType.MODIFY_TRAIT_GAIN, ModifierType.MODIFY_TRAIT_REMOVE];
        default:
            return [];
    }
}
