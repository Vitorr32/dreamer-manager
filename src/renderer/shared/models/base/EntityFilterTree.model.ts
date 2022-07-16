import { DEFAULT_EXTERNAL_ENTITY_FILTER } from 'renderer/shared/Constants';
import { LogicOperator } from '../enums/LogicOperator.enum';
import { ExternalExpandedEntityFilter } from './EntityVariableValue.model';

export class FilterNode {
    //The logic operator of this node, will define how the evaluation of the nodes conditions/children will be evaluated
    public logicOperator: LogicOperator = LogicOperator.IF;
    //The child nodes of this node, for this node evaluation to be true the children also need to be true
    public children: FilterNode[] = [];
    //The list of conditions of this specific node, together with the logic operator, will define the evaluation of this node
    public entityFilters: ExternalExpandedEntityFilter[] = [DEFAULT_EXTERNAL_ENTITY_FILTER];
}

export class EntityFilterTree {
    public root: FilterNode = new FilterNode();
}
