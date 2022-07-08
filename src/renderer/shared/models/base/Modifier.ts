import { DEFAULT_ENTITY_FILTER, DEFAULT_EXTERNAL_ENTITY_FILTER } from 'renderer/shared/Constants';
import { Entity } from '../enums/Entities.enum';
import { EntityVariableValue, ExternalExpandedEntityFilter } from './EntityVariableValue.model';

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

    //EVENT MODIFIERS
    MODIFY_TRIGGER_EVENT = 'model.modifier.type.event_trigger',
}

export enum ModifierTypeSection {
    ENTITY_MODIFICATION = 'model.modifier.section.entity',
    RELATIONSHIP_SECTION = 'model.modifier.section.relationship',
    EVENT_SECTION = 'model.modifier.section.event',
}
export class Modifier {
    public type: ModifierType;
    public modifiedEntityVariable: EntityVariableValue;
    public targetEntityFilter: ExternalExpandedEntityFilter[];
    public originEntityFilter?: ExternalExpandedEntityFilter[];

    constructor() {
        this.type = ModifierType.UNDEFINED;
        this.modifiedEntityVariable = {
            entity: Entity.NONE,
            value: '',
            variableKey: '',
        };
        this.targetEntityFilter = [DEFAULT_EXTERNAL_ENTITY_FILTER];
    }
}
