import { VariableOperator } from 'renderer/shared/models/enums/VariableOperator';
import { Character, CharacterType, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { Agency, AgencyVariablesKey } from 'renderer/shared/models/base/Agency.model';
import { DEFAULT_EXTERNAL_ENTITY_FILTER, PLAYER_AGENCY } from 'renderer/shared/Constants';
import { Actor, ActorVariablesKey } from 'renderer/shared/models/base/Actor.model';
import { Relationship, RelationshipVariablesKey } from 'renderer/shared/models/base/Relationship.model';
import { Trigger } from '../models/enums/Trigger.enum';
import { DynamicEntity } from '../models/enums/DynamicEntity.enum';
import { EntityType } from '../models/enums/Entities.enum';
import { EntityFilterTree } from '../models/base/EntityFilterTree.model';
import { EntityFilterOptions } from '../models/options/EntityFilterOptions.model';

export const getDynamicEntityFilterDataAsFilterTree = (dynamicEntity: DynamicEntity, options?: EntityFilterOptions): EntityFilterTree => {
    const dynamicEntityFilterTree: EntityFilterTree = new EntityFilterTree();
    dynamicEntityFilterTree.filterShortcut = dynamicEntity;

    switch (dynamicEntity) {
        case DynamicEntity.EVERYONE:
            // To set the Everyone filter, just get all character of age bigger than 0, which means everyone currently instantiated in game.
            dynamicEntityFilterTree.root.entityFilters[0].entityType = EntityType.CHARACTERS;
            dynamicEntityFilterTree.root.entityFilters[0].operator = VariableOperator.GREATER_THAN;
            dynamicEntityFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()[CharacterVariablesKey.AGE].key;
            dynamicEntityFilterTree.root.entityFilters[0].value = 0;
            break;
        case DynamicEntity.ALL_DREAMERS_OF_STUDIO:
            dynamicEntityFilterTree.root.logicOperator = LogicOperator.AND;

            dynamicEntityFilterTree.root.entityFilters[0].entityType = EntityType.CHARACTERS;
            dynamicEntityFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()[CharacterVariablesKey.AGENCY].key;
            dynamicEntityFilterTree.root.entityFilters[0].isFilteringExternalKey = true;
            dynamicEntityFilterTree.root.entityFilters[0].externalEntityFilter = [
                {
                    entityType: EntityType.AGENCY,
                    variableKey: Agency.getEntityVariables()[AgencyVariablesKey.ID].key,
                    operator: VariableOperator.EQUALS_TO,
                    value: PLAYER_AGENCY,
                },
            ];

            dynamicEntityFilterTree.root.entityFilters.push(DEFAULT_EXTERNAL_ENTITY_FILTER);
            dynamicEntityFilterTree.root.entityFilters[1].entityType = EntityType.CHARACTERS;
            dynamicEntityFilterTree.root.entityFilters[1].variableKey = Character.getEntityVariables()[CharacterVariablesKey.TYPE].key;
            dynamicEntityFilterTree.root.entityFilters[1].operator = VariableOperator.EQUALS_TO;
            dynamicEntityFilterTree.root.entityFilters[1].value = CharacterType.STAFF;
            break;
        case DynamicEntity.ALL_STAFF_OF_AGENCY:
            dynamicEntityFilterTree.root.logicOperator = LogicOperator.AND;

            dynamicEntityFilterTree.root.entityFilters[0].entityType = EntityType.CHARACTERS;
            dynamicEntityFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()[CharacterVariablesKey.AGENCY].key;
            dynamicEntityFilterTree.root.entityFilters[0].isFilteringExternalKey = true;
            dynamicEntityFilterTree.root.entityFilters[0].externalEntityFilter = [
                {
                    entityType: EntityType.AGENCY,
                    variableKey: Agency.getEntityVariables()[AgencyVariablesKey.ID].key,
                    operator: VariableOperator.EQUALS_TO,
                    value: PLAYER_AGENCY,
                },
            ];

            dynamicEntityFilterTree.root.entityFilters.push(DEFAULT_EXTERNAL_ENTITY_FILTER);
            dynamicEntityFilterTree.root.entityFilters[1].entityType = EntityType.CHARACTERS;
            dynamicEntityFilterTree.root.entityFilters[1].variableKey = Character.getEntityVariables()[CharacterVariablesKey.TYPE].key;
            dynamicEntityFilterTree.root.entityFilters[1].operator = VariableOperator.EQUALS_TO;
            dynamicEntityFilterTree.root.entityFilters[1].value = CharacterType.STAFF;
            break;
        case DynamicEntity.EVERYONE_ON_AGENCY:
            dynamicEntityFilterTree.root.entityFilters[0].entityType = EntityType.CHARACTERS;
            dynamicEntityFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()[CharacterVariablesKey.AGENCY].key;
            dynamicEntityFilterTree.root.entityFilters[0].isFilteringExternalKey = true;
            dynamicEntityFilterTree.root.entityFilters[0].externalEntityFilter = [
                {
                    entityType: EntityType.AGENCY,
                    variableKey: Agency.getEntityVariables()[AgencyVariablesKey.ID].key,
                    operator: VariableOperator.EQUALS_TO,
                    value: PLAYER_AGENCY,
                },
            ];
            break;
        case DynamicEntity.ALL_ACTORS:
            dynamicEntityFilterTree.root.logicOperator = LogicOperator.OR;

            if (options.specifiedEntities[EntityType.ACTORS]) {
                dynamicEntityFilterTree.root.entityFilters = options.specifiedEntities[EntityType.ACTORS].map(
                    ({ data }: { label: string; data: any; shortcut?: DynamicEntity }) => {
                        return {
                            ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                            entity: EntityType.ACTORS,
                            variableKey: Actor.getEntityVariables()[ActorVariablesKey.ID].key,
                            operator: VariableOperator.EQUALS_TO,
                            value: data.id,
                        };
                    }
                );
            } else {
                console.error('Tried to select all actors when no such entity was specified for this event.');
            }
            break;
        case DynamicEntity.PROTAGONIST:
            dynamicEntityFilterTree.root.entityFilters.push({
                ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                entityType: EntityType.CHARACTERS,
                variableKey: Character.getEntityVariables()[CharacterVariablesKey.IS_PLAYER].key,
                operator: VariableOperator.EQUALS_TO,
                value: true,
            });
            break;
        case DynamicEntity.SELF:
            dynamicEntityFilterTree.root.entityFilters.push({
                ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                entityType: EntityType.CHARACTERS,
                variableKey: Character.getEntityVariables()[CharacterVariablesKey.ID].key,
                operator: VariableOperator.EQUALS_TO,
                value: DynamicEntity.SELF,
            });
            break;
        case DynamicEntity.SELF_FRIENDS:
            dynamicEntityFilterTree.root.logicOperator = LogicOperator.AND;

            dynamicEntityFilterTree.root.entityFilters.push(
                {
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entityType: EntityType.RELATIONSHIP,
                    variableKey: Character.getEntityVariables()[CharacterVariablesKey.ID].key,
                    externalEntityFilter: [
                        {
                            entityType: EntityType.CHARACTERS,
                            operator: VariableOperator.EQUALS_TO,
                            variableKey: Actor.getEntityVariables()[CharacterVariablesKey.ID].key,
                            value: DynamicEntity.SELF,
                        },
                    ],
                },
                {
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entityType: EntityType.RELATIONSHIP,
                    variableKey: Relationship.getEntityVariables()[RelationshipVariablesKey.FAVOR].key,
                    operator: VariableOperator.EQUAL_OR_GREATER_THAN,
                    value: 50,
                }
            );
            break;
        case DynamicEntity.SELF_RIVALS:
            dynamicEntityFilterTree.root.logicOperator = LogicOperator.AND;

            dynamicEntityFilterTree.root.entityFilters.push(
                {
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entityType: EntityType.RELATIONSHIP,
                    variableKey: Actor.getEntityVariables()[ActorVariablesKey.CHARACTER_ID].key,
                    externalEntityFilter: [
                        {
                            entityType: EntityType.CHARACTERS,
                            operator: VariableOperator.EQUALS_TO,
                            variableKey: Actor.getEntityVariables()[ActorVariablesKey.ID].key,
                            value: DynamicEntity.SELF,
                        },
                    ],
                },
                {
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entityType: EntityType.RELATIONSHIP,
                    variableKey: Relationship.getEntityVariables().favor.key,
                    operator: VariableOperator.EQUAL_OR_LESSER_THAN,
                    value: 0,
                },
                {
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entityType: EntityType.RELATIONSHIP,
                    variableKey: Relationship.getEntityVariables().respect.key,
                    operator: VariableOperator.EQUAL_OR_GREATER_THAN,
                    value: 50,
                }
            );
            break;
        default:
            console.error(`No entity selected, or unknown entity "${dynamicEntity}"`);
            break;
    }

    return dynamicEntityFilterTree;
};

export function GetEntityTypeOfDynamicEntity(dynamicEntity: DynamicEntity): EntityType {
    switch (dynamicEntity) {
        case DynamicEntity.ALL_ACTORS:
            return EntityType.ACTORS;
        case DynamicEntity.SELF_DREAMER:
        case DynamicEntity.ALL_DREAMERS_OF_STUDIO:
            return EntityType.DREAMER;
        case DynamicEntity.SELF_PRODUCER:
        case DynamicEntity.EVERYONE:
        case DynamicEntity.EVERYONE_ON_AGENCY:
        case DynamicEntity.SELF:
        case DynamicEntity.SELF_FRIENDS:
        case DynamicEntity.SELF_RIVALS:
        case DynamicEntity.ALL_STAFF_OF_AGENCY:
            return EntityType.CHARACTERS;
        case DynamicEntity.MC_AGENCY:
        case DynamicEntity.SELF_AGENCY:
            return EntityType.AGENCY;
        case DynamicEntity.SPECIFIC_FILTER:
            return null;
        default:
            console.error('Unknown dynamic entity:', dynamicEntity);
            return null;
    }
}

export function FilterPossibleDynamicEntitiesForTriggerType(effectTriggerType: Trigger, effectSource: EntityType): DynamicEntity[] {
    switch (effectTriggerType) {
        case Trigger.ON_INTERACTION_START:
            return [DynamicEntity.SELF, DynamicEntity.SELF_FRIENDS, DynamicEntity.SELF_RIVALS];
        case Trigger.ON_EVENT_START:
            return [DynamicEntity.ALL_ACTORS, DynamicEntity.PROTAGONIST];
        case Trigger.ON_RECORD_START:
            return [DynamicEntity.SELF, DynamicEntity.SELF_FRIENDS, DynamicEntity.SELF_RIVALS];
        case Trigger.ON_SHOW_START:
            return [DynamicEntity.EVERYONE];
        case Trigger.ON_TRAINING_START:
            return [];
        default:
            return [];
    }
}
