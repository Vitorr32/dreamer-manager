export enum ModifierType {
    UNDEFINED = 'model.undefined',

    //SKILLS MODIFIERS
    MODIFY_SKILL_CURRENT_VALUE = 'model.modifier.type.attr_value',
    MODIFY_SKILL_GAIN_MULTIPLIER_VALUE = 'model.modifier.type.attr_multiplier',
    MODIFY_SKILL_POTENTIAL_VALUE = 'model.modifier.type.attr_potential',

    //RELATIONSHIP MODIFIERS
    MODIFY_RELATIONSHIP_RELATION_RESPECT_VALUE = 'model.modifier.type.relationship_respect',
    MODIFY_RELATIONSHIP_RELATION_FAVOR_VALUE = 'model.modifier.type.relationship_favor',
    MODIFY_RELATIONSHIP_RELATION_ATTRACT_VALUE = 'model.modifier.type.relationship_attract',
    MODIFY_RELATIONSHIP_RELATION_LOVE_VALUE = 'model.modifier.type.relationship_love',
    MODIFY_RELATIONSHIP_RELATION_POWER_VALUE = 'model.modifier.type.relationship_power',
    MODIFY_RELATIONSHIP_RELATION_FAMILIARITY = 'model.modifier.type.relationship_familiarity',

    //TRAIT MODIFIERS
    MODIFY_TRAIT_GAIN = 'model.modifier.type.trait_gain',
    MODIFY_TRAIT_REMOVE = 'model.modifier.type.trait_remove',

    //EVENT MODIFIERS
    MODIFY_EVENT_FLAG_REMOVE = 'model.modifier.type.event_flag_remove',
    MODIFY_EVENT_FLAG_ADD = 'model.modifier.type.event_flag_add',
    MODIFY_EVENT_TRIGGER = 'model.modifier.type.event_trigger',

    //STATIC MODIFIERS
    MODIFY_MOOD_VALUE = 'model.modifier.type.static_mood',
    MODIFY_LEARNING_RATE = 'model.modifier.type.static_learning_rate',

    MODIFY_ENERGY_VALUE = 'model.modifier.type.static_energy',
    MODIFY_ENERGY_GAIN_MULTIPLIER = 'model.modifier.type.static_energy_gain',
    MODIFY_ENERGY_FALL_MULTIPLIER = 'model.modifier.type.static_energy_fall',
    MODIFY_ENERGY_MAXIMUM = 'model.modifier.type.static_energy_max',

    MODIFY_STRESS_VALUE = 'model.modifier.type.static_stress',
    MODIFY_STRESS_GAIN_MULTIPLIER = 'model.modifier.type.static_stress_gain',
    MODIFY_STRESS_FALL_MULTIPLIER = 'model.modifier.type.static_stress_fall',
    MODIFY_STRESS_MAXIMUM = 'model.modifier.type.static_stress_max',
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
