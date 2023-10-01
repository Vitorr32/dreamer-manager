import { DEFAULT_EXTERNAL_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EvaluateVariableOperator, GetEntitiesOfEntity } from 'renderer/shared/utils/General';
import { MappedDatabase } from 'renderer/redux/interfaces/MappedDatabase.interface';
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
        // Unless this node parent already filtered some entities, then use the previously filtered entites for the array.
        let entitiesFound = entitiesFiltered || GetEntitiesOfEntity(this.entityFilters[0].entityType);

        // Evalute this nodes entity filters.
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
                // Go trough every entity filter of this node and apply to the entitesFound array, so we can filter all of the entity filters.
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

        const mappedEntities = {};

        // if(LogicOperator.IF)

        let childrenEvaluations: EntityBase[] = [];
        if (this.children.length > 0) {
            childrenEvaluations = this.children.map((childNode) => childNode.resolveFilterNode(currentDatabase, entitiesFound));
        }

        switch (this.logicOperator) {
            case LogicOperator.AND:
                return [entitiesFound, childrenEvaluations].flat();
            case LogicOperator.OR:
                return entitiesFound || childrenEvaluations.every((value) => value.length !== 0);
            case LogicOperator.IF:
                return entitiesFound;
        }
    }
}
