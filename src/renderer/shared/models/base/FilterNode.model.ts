import { DEFAULT_EXTERNAL_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EvaluateVariableOperator } from 'renderer/shared/utils/General';
import { GetEntitiesOfType } from 'renderer/shared/utils/DatabaseOperations';
import { MappedDatabase } from 'renderer/redux/interfaces/MappedDatabase.interface';
import { findCommonItemsOnObjectArrays, mergeArraysAndRemoveDuplicates } from 'renderer/shared/utils/ArrayOperations';
import { ExternalExpandedEntityFilter } from '../interfaces/ExternalExpandedEntityFilter.interface';
import { LogicOperator } from '../enums/LogicOperator.enum';
import { EntityBase } from './Entity.model';

export class FilterNode {
    // The logic operator of this node, will define how the evaluation of the nodes conditions/children will be evaluated
    public logicOperator: LogicOperator = LogicOperator.IF;

    // The child nodes of this node, for this node evaluation to be true the children also need to be true
    public children: FilterNode[] = [];

    // The list of conditions of this specific node, together with the logic operator, will define the evaluation of this node
    public entityFilters: ExternalExpandedEntityFilter[] = [DEFAULT_EXTERNAL_ENTITY_FILTER];

    // Evaluate if the conditions of this node are met, if the node has children, evaluate if the children are met
    // If the node has no conditions or children, return true
    public resolveFilterNode(currentDatabase: MappedDatabase, entitiesFiltered?: EntityBase[]): EntityBase[] {
        // No empty node allowed
        if (this.entityFilters.length === 0) return [];

        // Get all the entities on the database for this node's entity type, then filter them out using the entity filters of this node.
        // Unless this node parent already filtered some entities, then use the previously filtered entities for the array.
        let entitiesFound = entitiesFiltered || GetEntitiesOfType(this.entityFilters[0].entityType);

        // Evaluate this nodes entity filters.
        switch (this.logicOperator) {
            case LogicOperator.IF: {
                // Evaluate if logic operator, the filter will only apply to the entity filter of index 0.
                const entityFilter = this.entityFilters[0];
                entitiesFound = entitiesFound.filter((entity) => {
                    const valueInEntity = entity.getVariableValueByName(entityFilter.variableKey);
                    return EvaluateVariableOperator(entityFilter.operator, valueInEntity, entityFilter.value);
                });
                break;
            }
            case LogicOperator.AND:
                // Go trough every entity filter of this node and apply to the entities Found array, so we can filter all of the entity filters.
                // Returns true when the filters did not find any entity, otherwise continues filtering the array of entities.
                this.entityFilters.some((entityFilter) => {
                    if (entitiesFound.length === 0) return true;

                    entitiesFound = entitiesFound.filter((entity) => {
                        const valueInEntity = entity.getVariableValueByName(entityFilter.variableKey);
                        return EvaluateVariableOperator(entityFilter.operator, valueInEntity, entityFilter.value);
                    });

                    return false;
                });
                break;
            case LogicOperator.OR:
                // Go trough every entity filter of this node, and apply a filter that checks in any of the filters is true.
                entitiesFound = entitiesFound.filter((entity) => {
                    return this.entityFilters.some((entityFilter) => {
                        const valueInEntity = entity.getVariableValueByName(entityFilter.variableKey);
                        return EvaluateVariableOperator(entityFilter.operator, valueInEntity, entityFilter.value);
                    });
                });
                break;
        }

        // All filtered entities at this point.
        const allEvaluations: EntityBase[][] = [entitiesFound];

        // Get the filtered entities from its children, note that the initial entities list sent to the children is the entities found a the parent node.
        if (this.children.length > 0) {
            this.children.forEach((childNode) => allEvaluations.push(childNode.resolveFilterNode(currentDatabase, entitiesFound)));
        }

        switch (this.logicOperator) {
            // Get only entities that are present in all of the sub-arrays
            case LogicOperator.AND:
                return findCommonItemsOnObjectArrays<EntityBase>(allEvaluations, (a, b) => a.id === b.id);
            case LogicOperator.OR:
                return mergeArraysAndRemoveDuplicates<EntityBase>(allEvaluations, (a, b) => a.id === b.id);
            case LogicOperator.IF:
            default:
                return entitiesFound;
        }
    }
}
