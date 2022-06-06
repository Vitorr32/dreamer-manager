import { Entity } from '../enums/Entities.enum';
import { EntityVariableValue } from './EntityVariableValue.model';

export enum ModifierType {
    UNDEFINED = 'model.undefined',

    //ATTRIBUTE MODIFIERS
    MODIFY_SKILL_CURRENT_VALUE = 'model.modifier.type.attr_value',
    MODIFY_SKILL_GAIN_MULTIPLIER_VALUE = 'model.modifier.type.attr_multiplier',
    MODIFY_POTENTIAL_VALUE = 'model.modifier.type.attr_potential',

    MODIFY_ENTITY_VARIABLE = 'model.modifier.type.entity_variable',

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
    ENTITY_MODIFICATION = 'model.modifier.section.entity',
    RELATIONSHIP_SECTION = 'model.modifier.section.relationship',
    TRAIT_SECTION = 'model.modifier.section.trait',
    EVENT_SECTION = 'model.modifier.section.event',
    STATIC_SECTION = 'model.modifier.section.static',
}

export enum ModifierTargetType {
    ATTRIBUTE_ID = 'attributes',
    TRAIT_ID = 'traits',
    EVENT_ID = 'events',
    FLAG_ID = 'flags',
    ORIGIN_ACTOR = 'originActor',
    RECEPTOR_ACTOR = 'receptorActor',
}

export enum ModifierTargetSpecification {
    EVERYONE = 'model.modifier.target.specification.everyone',
    EVERYONE_ATTENDS_CONDITION = 'model.modifier.target.specification.everyone_condition',
}

export class Modifier {
    public type: ModifierType;
    public modifiedWorldState: {
        [key in ModifierTargetType]?: string[];
    };

    public modifiedEntityVariable?: EntityVariableValue;
    // TODO: Remove following property from all code, as it was substituted by the one above.
    public effectiveChange: number;
    public targetSelf: boolean;

    constructor() {
        this.type = ModifierType.UNDEFINED;
        this.effectiveChange = 0;
        this.targetSelf = true;
    }
}
