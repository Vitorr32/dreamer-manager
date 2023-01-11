import { Entity } from '../enums/Entities.enum';
import { VariableOperator } from './Variable.model';

export enum ShortcutFilter {
    //Allow user to insert use a composite filter
    SPECIFIC_FILTER = 'model.modifier.targeting.specific_filter',
    //Character Entity Shortcuts
    PROTAGONIST = 'model.modifier.targeting.protagonist',
    ALL_DREAMERS_OF_STUDIO = 'model.modifier.targeting.allStudioDreamers',
    ALL_STAFF_OF_STUDIO = 'model.modifier.targeting.allStudioStaff',
    EVERYONE_ON_STUDIO = 'model.modifier.targeting.allStudioEmployees',
    EVERYONE = 'model.modifier.targeting.everyCharacter',
    SELF = 'model.modifier.targeting.self',
    SELF_PRODUCER = 'model.modifier.targeting.selfProducer',
    SELF_FRIENDS = 'model.modifier.targeting.selfFriends',
    SELF_RIVALS = 'model.modifier.targeting.selfRivals',

    //Shortcut for Trait Holders
    TRAIT_HOLDER = '',

    MC_STUDIO = 'model.modifier.targeting.mainStudio',
    ALL_ACTORS = 'model.modifier.targeting.allActors',
}
/**
 * Things to consider:
 *
 * To get all characters, the filter should target all characters with age bigger than 0,
 * To set target as SELF (As in, the character that has the Trait, for example), set the character ID to the value 'SELF'
 */
export enum DynamicValue {
    SELF = 'SELF',
}
export interface EntityVariableValue {
    entity: Entity;
    variableKey: string;
    operator?: VariableOperator;
    value: any;
}

export interface ExternalExpandedEntityFilter extends EntityVariableValue {
    isFilteringExternalKey: boolean;
    externalEntityFilter: EntityVariableValue[];
    isComparingEntities: boolean;
    comparingEntityFilter: EntityVariableValue[];
}
