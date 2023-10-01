import { DEFAULT_EXTERNAL_ENTITY_FILTER } from 'renderer/shared/Constants';
import { GameState } from 'renderer/redux/gameState/gameState.reducer';
import { EvaluateVariableOperator, GetEntitiesOfEntity } from 'renderer/shared/utils/General';
import { MappedDatabase } from 'renderer/redux/database/database.reducer';
import { ExternalExpandedEntityFilter } from './EntityVariableValue.model';
import { LogicOperator } from '../enums/LogicOperator.enum';
import { VariableOperator } from './Variable.model';

export class FilterNode {
    // The logic operator of this node, will define how the evaluation of the nodes conditions/children will be evaluated
    public logicOperator: LogicOperator = LogicOperator.IF;

    // The child nodes of this node, for this node evaluation to be true the children also need to be true
    public children: FilterNode[] = [];

    // The list of conditions of this specific node, together with the logic operator, will define the evaluation of this node
    public entityFilters: ExternalExpandedEntityFilter[] = [DEFAULT_EXTERNAL_ENTITY_FILTER];

    // Evaluate if the conditions of this node are met, if the node has children, evaluate if the children are met
    // If the node has no conditions or children, return true
    public resolveFilterNode(currentDatabase: MappedDatabase, entitiesFiltered?: any[]) {
        // No empty node allowed
        if (this.entityFilters.length === 0) return false;

        // Get all the entities on the database for this node's entity type, then filter them out using the entity filters of this node.
        // Unless this node parent already filtered some entities, then use the previously filtered entites for the array.
        let entitiesFound = entitiesFiltered || GetEntitiesOfEntity(this.entityFilters[0].entityType);

        // Evalute this nodes entity filters.
        switch (this.logicOperator) {
            case LogicOperator.IF:
                // Evaluate if logic operator, the filter will only apply to the entity filter of index 0.
                const entityFilter = this.entityFilters[0];
                entitiesFound = entitiesFound.filter((entity) => {
                    const valueInEntity = entity[entityFilter.variableKey];
                    return EvaluateVariableOperator(entityFilter.operator, valueInEntity, entityFilter.value);
                });
                break;
            case LogicOperator.AND:
                // Go trough every entity filter of this node and apply to the entitesFound array, so we can filter all of the entity filters.
                // Returns true when the filters did not find any entity, otherwise continues filtering the array of entities.
                this.entityFilters.some((entityFilter) => {
                    if (entitiesFound.length === 0) return true;

                    entitiesFound = entitiesFound.filter((entity) => {
                        const valueInEntity = entity[entityFilter.variableKey];
                        return EvaluateVariableOperator(entityFilter.operator, valueInEntity, entityFilter.value);
                    });

                    return false;
                });
                break;
            case LogicOperator.OR:
                // Go trough every entity filter of this node, and apply a filter that checks in any of the filters is true.
                entitiesFound = entitiesFound.filter((entity) => {
                    return this.entityFilters.some((entityFilter) => {
                        const valueInEntity = entity[entityFilter.variableKey];
                        return EvaluateVariableOperator(entityFilter.operator, valueInEntity, entityFilter.value);
                    });
                });
                break;
        }

        // Now that all the filters have been applied to the entites array, verify if any entity has been found, otherwise the filter
        // Failed to find anything that match the filters, therefore returning a false evalutation to the node conditions.
        const nodeFiltersResult = entitiesFound.length !== 0;

        let childrenEvaluations: boolean[] = [];
        if (this.children.length > 0) {
            childrenEvaluations = this.children.map((childNode) => childNode.resolveFilterNode(currentDatabase, entitiesFound));
        }

        switch (this.logicOperator) {
            case LogicOperator.AND:
                return nodeFiltersResult && childrenEvaluations.every((value) => value === true);
            case LogicOperator.OR:
                return nodeFiltersResult || childrenEvaluations.every((value) => value === true);
            case LogicOperator.IF:
                return nodeFiltersResult;
        }
    }
}

export class EntityFilterTree {
    public root: FilterNode = new FilterNode();

    public resolveFilterTree(database: MappedDatabase) {
        return this.root.resolveFilterNode(database);
    }
}
