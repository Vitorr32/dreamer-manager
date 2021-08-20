import { ConditionInitiator } from "../enums/ConditionInitiator.enum";
import { ConditionHealthCheckRepository } from "../metadata/ConditionHealth.metadata";
import { Feedback } from "./ConditionFeedback";

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

    public initiator: ConditionInitiator = ConditionInitiator.UNDEFINED
    public agent: ConditionAgent = ConditionAgent.UNDEFINED

    public traitSelector: TraitSelector = TraitSelector.UNDEFINED
    public numericSelector: NumericSelector = NumericSelector.UNDEFINED

    public selector: number = 0;
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

    //Verify the health of the condition metadata, not if the condition actually evaluates to true or false with in-game attributes.
    public EvaluateConditionHealth(): Feedback {
        if (ConditionHealthCheckRepository.hasOwnProperty(this.initiator)) {
            return ConditionHealthCheckRepository[this.initiator](this);
        } else {
            return new Feedback(false, "The condition needs to have an initiator");
        }
    }

    //Verify the condition evaluation in game
    public EvaluateCondition(): boolean {
        //TODO
        return true;
    }
    
}