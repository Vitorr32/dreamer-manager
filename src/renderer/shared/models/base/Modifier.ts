import { Entity } from '../enums/Entities.enum';
import { EntityFilter, EntityVariableValue } from './EntityVariableValue.model';
import { VariableOperator } from './Variable.model';

export enum ModifierType {
    UNDEFINED = 'model.undefined',

    //ENTITY VARIABLE MODIFIER
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
}

export enum ModifierTypeSection {
    ENTITY_MODIFICATION = 'model.modifier.section.entity',
    RELATIONSHIP_SECTION = 'model.modifier.section.relationship',
    TRAIT_SECTION = 'model.modifier.section.trait',
    EVENT_SECTION = 'model.modifier.section.event',
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

    public modifiedEntityVariable: EntityVariableValue;
    public targetEntityFilter?: EntityFilter;

    constructor() {
        this.type = ModifierType.UNDEFINED;
        this.modifiedEntityVariable = {
            entity: Entity.NONE,
            value: '',
            variableKey: '',
        };
    }
}
