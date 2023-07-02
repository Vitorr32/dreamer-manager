import { Box, FormHelperText, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { DynamicEntity, EntityVariableValue } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Character, CharacterType, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { Agency, AgencyVariablesKey } from 'renderer/shared/models/base/Agency.model';
import { DEFAULT_EXTERNAL_ENTITY_FILTER, PLAYER_AGENCY } from 'renderer/shared/Constants';
import { Actor } from 'renderer/shared/models/base/Actor.model';
import { ActorVariablesKey } from 'renderer/shared/models/base/Actor.model';
import { Relationship, RelationshipVariablesKey } from 'renderer/shared/models/base/Relationship.model';
import { CompositeEntityFilter } from '../entity/CompositeEntityFilter.component';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EntityFilterOptions;
}

export function ModifierEditor({ modifier, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const onEntityModifierChanged = (entityFilter: EntityVariableValue): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.modifiedEntityVariables = entityFilter;

        if (
            newModifier.modifiedEntityVariables?.specifiedDynamicEntity &&
            newModifier.modifiedEntityVariables?.specifiedDynamicEntity !== modifier.modifiedEntityVariables?.specifiedDynamicEntity
        ) {
            newModifier.targetEntityFilter = getDynamicEntityFilterData(newModifier.modifiedEntityVariables.specifiedDynamicEntity, true);
        }
        onChange(newModifier);
    };

    const onModifierTargetConditionTreeChanged = (conditionTree: EntityFilterTree): void => {
        const newModifier = CopyClassInstance(modifier);
        newModifier.targetEntityFilter = conditionTree;

        if (newModifier?.targetEntityFilter?.root.entityFilters.length === 0) {
            newModifier.targetEntityFilter = undefined;
        }

        onChange(newModifier);
    };

    const getDynamicEntityFilterData = (dynamicEntity: DynamicEntity, isTarget: boolean): EntityFilterTree => {
        const dynamicEntityFilterTree: EntityFilterTree = new EntityFilterTree();

        switch (dynamicEntity) {
            case DynamicEntity.EVERYONE:
                // To set the Everyone filter, just get all character of age bigger than 0, which means everyone currently instantiated in game.
                dynamicEntityFilterTree.root.entityFilters[0].entityType = EntityType.CHARACTERS;
                dynamicEntityFilterTree.root.entityFilters[0].operator = VariableOperator.BIGGER_THAN;
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
                        ({ label, data, shortcut }: { label: string; data: any; shortcut?: DynamicEntity }) => {
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
                    //TODO: Maybe put a feedback message on the front-end?
                    console.error('Tried to select all actors when no such entity exists yet.');
                }
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
                        operator: VariableOperator.EQUAL_OR_BIGGER_THAN,
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
                        variableKey: Relationship.getEntityVariables()['favor'].key,
                        operator: VariableOperator.EQUAL_OR_LESS_THAN,
                        value: 0,
                    },
                    {
                        ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                        entityType: EntityType.RELATIONSHIP,
                        variableKey: Relationship.getEntityVariables()['respect'].key,
                        operator: VariableOperator.EQUAL_OR_BIGGER_THAN,
                        value: 50,
                    }
                );
                break;
            default:
                console.error('No entity selected, or uknown entity' + modifier.modifiedEntityVariables.entityType);
                break;
        }

        return dynamicEntityFilterTree;
    };

    const isTargetFilterNecessary = (): boolean => {
        //Check if the values for the modifier target are non-null
        if (!modifier.modifiedEntityVariables.entityType && !modifier.modifiedEntityVariables.specifiedDynamicEntity) {
            return false;
        }
        //In case that the user choose a specific dynamic entity, but it's value it SPECIFIC_FILTER, it means that the user wants to create a filter himself.
        const specifiedDynamicEntity = modifier.modifiedEntityVariables.specifiedDynamicEntity;
        if (specifiedDynamicEntity === DynamicEntity.SPECIFIC_FILTER) {
            return true;
        }

        if (!modifier.modifiedEntityVariables.specifiedDynamicEntity) {
            return true;
        }

        return false;
    };

    return (
        <>
            <FormHelperText>{t('interface.editor.modifier.modifier_editor_helper_text')}</FormHelperText>
            <EntityFilterEditor entityFilter={modifier.modifiedEntityVariables} onFilterChange={onEntityModifierChanged} entityFilterOptions={options} isEditor />

            {isTargetFilterNecessary() && (
                <Box sx={{ mt: 2 }}>
                    <Typography>{t('interface.editor.modifier.input_label_target_of_modifier')}</Typography>

                    <CompositeEntityFilter
                        filterTree={modifier.targetEntityFilter || new EntityFilterTree()}
                        onFilterTreeChange={onModifierTargetConditionTreeChanged}
                        entityFilterOptions={{ ...options, isLookingForSpecificEntity: modifier.modifiedEntityVariables?.entityType }}
                    />
                </Box>
            )}
        </>
    );
}
