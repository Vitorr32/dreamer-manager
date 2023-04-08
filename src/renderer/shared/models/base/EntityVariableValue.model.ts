import { EntityType } from '../enums/Entities.enum';
import { VariableOperator } from './Variable.model';

export enum DynamicEntity {
    //Allow user to insert a composite filter for the dynamic entity.
    SPECIFIC_FILTER = 'model.modifier.targeting.specific_filter',
    //Character Entity Shortcuts
    PROTAGONIST = 'model.modifier.targeting.protagonist',
    ALL_STAFF_OF_AGENCY = 'model.modifier.targeting.allStudioStaff',
    EVERYONE_ON_AGENCY = 'model.modifier.targeting.allStudioEmployees',
    EVERYONE = 'model.modifier.targeting.everyCharacter',
    SELF = 'model.modifier.targeting.self',
    SELF_DREAMER = 'model.modifier.targetting.selfDreamer',
    SELF_FRIENDS = 'model.modifier.targeting.selfFriends',
    SELF_RIVALS = 'model.modifier.targeting.selfRivals',
    SELF_PRODUCER = 'model.modifier.targeting.selfProducer',
    //Dreamers entities shortcuts
    ALL_DREAMERS_OF_STUDIO = 'model.modifier.targeting.allStudioDreamers',
    //Agency entities shortcut
    MC_AGENCY = 'model.modifier.targeting.mainStudio',
    SELF_AGENCY = 'model.modifier.targeting.selfAgency',
    //Actors entities shortcuts
    ALL_ACTORS = 'model.modifier.targeting.allActors',
}

export interface EntityVariableValue {
    entityType?: EntityType;
    specifiedDynamicEntities?: string[]; // Only used on run-time, this are the entities that were pooled when validating the EntityVariableValue.
    specifiedDynamicEntity?: DynamicEntity;
    variableKey?: string;
    operator?: VariableOperator;
    value: any;
}

export interface ExternalExpandedEntityFilter extends EntityVariableValue {
    isFilteringExternalKey: boolean;
    externalEntityFilter: EntityVariableValue[];
    isComparingEntities: boolean;
    comparingEntityFilter: EntityVariableValue[];
}
