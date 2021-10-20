export enum ModifierType {
    UNDEFINED = 'model.undefined',

    //SKILLS MODIFIERS
    MODIFY_SKILL_CURRENT_VALUE = 'model.modifier.skill_current_value',
    MODIFY_SKILL_GAIN_MULTIPLIER_VALUE = 'model.modifier.skill_multiplier_value',
    MODIFY_SKILL_POTENTIAL_VALUE = 'model.modifier.skill_potential_value',

    //RELATIONSHIP MODIFIERS
    MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE = 'model.modifier.relationship_respect',
    MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE = 'model.modifier.relationship_favor',
    MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE = 'model.modifier.relationship_attract',
    MODIFY_RELATIONSHIP_RELATION_LOVE_VALUE = 'model.modifier.relationship_love',
    MODIFY_RELATIONSHIP_RELATION_POWER_VALUE = 'model.modifier.relationship_power',
    MODIFY_RELATIONSHIP_RELATION_FAMILIARITY = 'model.modifier.knowledge_familiarity',

    //TRAIT MODIFIERS
    MODIFY_TRAIT_GAIN = 'model.modifier.trait_gain',
    MODIFY_TRAIT_REMOVE = 'model.modifier.trait_remove',

    //EVENT MODIFIERS
    MODIFY_EVENT_FLAG_REMOVE = 'model.modifier.event_flag_remove',
    MODIFY_EVENT_FLAG_ADD = 'model.modifier.event_flag_add',
    MODIFY_EVENT_TRIGGER = 'model.modifier.event_trigger',

    //STATIC MODIFIERS
    MODIFY_MOOD_VALUE = 'model.modifier.mood',
    MODIFY_LEARNING_RATE = 'model.modifier.learning',

    MODIFY_ENERGY_VALUE = 'model.modifier.energy_value',
    MODIFY_ENERGY_GAIN_MULTIPLIER = 'model.modifier.energy_gain_multiplier',
    MODIFY_ENERGY_FALL_MULTIPLIER = 'model.modifier.energy_fall_multiplier',
    MODIFY_ENERGY_MAXIMUM = 'model.modifier.energy_max',

    MODIFY_STRESS_VALUE = 'model.modifier.stress_value',
    MODIFY_STRESS_GAIN_MULTIPLIER = 'model.modifier.stress_gain_multiplier',
    MODIFY_STRESS_FALL_MULTIPLIER = 'model.modifier.stress_fall_multiplier',
    MODIFY_STRESS_MAXIMUM = 'model.modifier.stress_max',
}

export enum ModifierTypeSection {
    ATTR_SECTION = 'model.modifier.section.attr',
    RELATIONSHIP_SECTION = 'model.modifier.section.relationship',
    TRAIT_SECTION = 'model.modifier.section.trait',
    EVENT_SECTION = 'model.modifier.section.event',
    STATIC_SECTION = 'model.modifier.section.static',
}

export class Modifier {
    public type: ModifierType;

    public modifierTargets: string[];
    public effectiveChange: number;
    public targetSelf: boolean;

    constructor() {
        this.type = ModifierType.UNDEFINED;
        this.modifierTargets = [];
        this.effectiveChange = 0;
        this.targetSelf = true;
    }
}
