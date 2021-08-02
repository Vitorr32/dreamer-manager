import { LogicOperator } from "../enums/LogicOperator.enum";

export enum ConditionInitiator {
    UNDEFINED,

    STATUS_RANGE,
    SKILL_RANGE,
    TRAIT,
    EVENT_FLAGGED,
    LOCATION,
    TIME,
    RELATIONSHIP,

    MAX_TYPES
}

export enum ConditionAgent {
    UNDEFINED,

    SELF,
    TARGET,
    SPECIFIC,
    SELF_TARGET,
    SELF_SPECIFIC,
    SPECIFIC_SPECIFIC,
    PLAYER,
    GLOBAL,

    MAX_SPECIFICATORS
}

export enum NumericSelector {
    UNDEFINED,

    BIGGER_THAN,
    SMALLER_THAN,
    BIGGER_THAN_SELF,
    BIGGER_THAN_TARGET,
    BETWEEN,
    EXACTLY,

    MAX_NUMERIC_SELECTORS
}

export enum TraitSelector {
    UNDEFINED,

    HAS,
    DONT,

    MAX_SELECTORS
}

export enum EventFlagSelector {
    UNDEFINED,

    TRIGGERED,
    NOT_TRIGGERED,

    MAX_SELECTORS
}

export enum LocationSelector {
    UNDEFINED,

    IS_AT,
    IS_NOT_AT,

    MAX_SELECTORS
}

export enum TimeSelector {
    UNDEFINED,

    EXACTLY,
    BEFORE,
    AFTER,

    MAX_SELECTORS
}

export enum RelationshipSelector {
    UNDEFINED,

    STATUS,
    KNOWLEDGE,

    MAX_SELECTORS
}

export class Condition {

    public logicOperator: LogicOperator = LogicOperator.IF
    public initiator: ConditionInitiator = ConditionInitiator.UNDEFINED
    public agent: ConditionAgent = ConditionAgent.UNDEFINED

    public selector: NumericSelector | TraitSelector = 0
    /*
        Parameters will represent different values depending the type of initiator that the condition has
        Status: Up to 3 parameters [Status Enumerator, First Input, Second Input]
        Attributes: Up to 3 parameters [Skill ID, First Input, Second Input]
        Trait: Only one parameter [Trait ID]
        Event: Only one parameter [Flag ID]
        Location: Only one parameter [Location ID]
        Time: Only one parameter [Timestamp in seconds]
        Relationship: Up to 4 parameters [Character ID, Relationship Attribute, First Input, Second Input]
    */
    public parameters: number[] = []



    public EvaluateCondition(Character self, List <Character > targets, int ? world = null): boolean {
    return true;
}

    public Feedback EvalueConditionHealth() {
    Feedback conditionFeedback = new Feedback();

    switch (this.initiator) {
        case Initiator.ATTRIBUTE_RANGE:
            if (this.agent == Agent.UNDEFINED) {
                conditionFeedback.message = "The attribute range initiator demands the selection of a agent for comparation";
                conditionFeedback.valid = false;
                return conditionFeedback;
            }

            Feedback attrSelectorFeedback = CheckIfNumericSelectorIsValid(this.attrRange.attrRangeParameters, this.attrRange.selector);
            if (attrSelectorFeedback != null) {
                return (Feedback)attrSelectorFeedback;
            }
            else {
                conditionFeedback.valid = true;
                return conditionFeedback;
            }
        default:
            conditionFeedback.valid = false;
            conditionFeedback.message = "The condition needs to have an initiator";
            Debug.Log("Unknown initiator" + this.initiator);
            return conditionFeedback;
    }
}

    public Feedback CheckIfNumericSelectorIsValid(int[] parameters, NumericSelector numericSelector) {
    int parametersLenght = parameters != null ? parameters.Length : 0;

    switch (numericSelector) {
        case NumericSelector.BETWEEN:
            //The first parameters is always an id, the second and third should be the range
            if (parametersLenght > 3) {
                return null;
            }
            else {
                return new Feedback() {
                    message = "The selector between needs to have the lower and upper range limit declared on the inputs",
                        valid = false
                };
            }
        case NumericSelector.BIGGER_THAN_SELF:
        case NumericSelector.SMALLER_THAN:
        case NumericSelector.EXACTLY:
            if (parametersLenght > 1) {
                return null;
            }
            else {
                return new Feedback() {
                    message = "The selector between needs to have the lower and upper range limit declared on the inputs",
                        valid = false
                };
            }
        default:
            return new Feedback() {
                message = "The numeric selector needs to be selected to allow the condition to be valid",
                    valid = false
            };

    }
}
}