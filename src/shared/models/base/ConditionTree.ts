import { LogicOperator } from "../enums/LogicOperator.enum";
import { NodeFeedback } from './ConditionFeedback';
import { Condition } from "./Condition.model";

export class Node {
    //The logic operator of this node, will define how the evaluation of the nodes conditions/children will be evaluated
    public logicOperator: LogicOperator = LogicOperator.IF;
    //The child nodes of this node, for this node evaluation to be true the children also neeed to be true
    public children: Node[] = [];
    //The list of conditions of this specific node, together with the logic operator, will define the evaluation of this node
    public conditions: Condition[] = [];

    public CheckIfNodeIsValid(): NodeFeedback {
        const nodeFeedback: NodeFeedback = new NodeFeedback();

        nodeFeedback.conditionFeedbacks = this.conditions.map(condition => condition.EvaluateConditionHealth());
        nodeFeedback.childrenFeedback = this.children.map(childNode => childNode.CheckIfNodeIsValid());

        const childrenSum = this.children.length + this.conditions.length;
        switch (this.logicOperator) {
            case LogicOperator.IF:
                if (childrenSum === 1) {
                    nodeFeedback.valid = true;
                }
                else if (childrenSum === 0) {
                    nodeFeedback.valid = false;
                    nodeFeedback.message = "The Node with logic operator IF need to have one condition/child node to be valid";
                }
                else {
                    nodeFeedback.valid = false;
                    nodeFeedback.message = "The node with logic operator IF needs to have only one condition/child node to be valid";
                }
                break;
            case LogicOperator.AND:
            case LogicOperator.OR:
                if (childrenSum === 1) {
                    nodeFeedback.valid = false;
                    nodeFeedback.message = "The node with logic operator AND/OR need to have at least two conditions/child nodes to be valid";
                }
                else if (childrenSum === 0) {
                    nodeFeedback.valid = false;
                    nodeFeedback.message = "The Node with logic operator AND/OR need to have at least two conditions/child nodes to be valid";
                } else {
                    nodeFeedback.valid = true;
                }
                break;
            default:
                nodeFeedback.valid = false;
                nodeFeedback.message = "An Node needs to have a logic operator selected to be valid";
                break;
        }

        return new NodeFeedback();
    }
}

export class ConditionTree {
    //TODO: Import from Ruler Code
}