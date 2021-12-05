import { ConditionInitiator } from '../enums/ConditionInitiator.enum';
import { ConditionHealthCheckRepository } from '../metadata/ConditionHealth.metadata';
import { Feedback } from './ConditionFeedback';

// export enum ConditionAgent {
//     UNDEFINED = 'model.undefined',

//     SELF = 'model.condition.selector.agent.self',
//     TARGET = 'model.condition.selector.agent.target',
//     SPECIFIC = 'model.condition.selector.agent.specific',
//     SELF_TARGET = 'model.condition.selector.agent.self_target',
//     SELF_SPECIFIC = 'model.condition.selector.agent.self_specific',
//     SPECIFIC_SPECIFIC = 'model.condition.selector.agent.specific_specific',
//     PLAYER = 'model.condition.selector.agent.player',
//     GLOBAL = 'model.condition.selector.agent.global',
// }

export enum Agent {
    UNDEFINED = 'model.undefined',

    SELF = 'model.condition.agent.self',
    PRODUCER = 'model.condition.agent.producer',
    INTERACTED = 'model.condition.agent.interacted',
    SPECIFIC_CHARACTER = 'model.condition.agent.specific_character',
    TUTOR = 'model.condition.agent.tutor',
    GLOBAL = 'model.condition.agent.global',
}

export enum NumericSelector {
    UNDEFINED = 'model.undefined',

    BIGGER_THAN = 'model.condition.selector.numeric.bigger_than',
    BIGGER_THAN_TARGET = 'model.condition.selector.numeric.bigger_than_target',
    SMALLER_THAN = 'model.condition.selector.numeric.smaller_than',
    SMALLER_THAN_TARGET = 'model.condition.selector.numeric.smaller_than_target',
    BETWEEN = 'model.condition.selector.numeric.between',
    EXACTLY = 'model.condition.selector.numeric.exactly',
}

export enum TraitSelector {
    UNDEFINED = 'model.undefined',

    HAS = 'model.condition.selector.trait.has',
    DONT = 'model.condition.selector.trait.dont',
}

export enum EventFlagSelector {
    UNDEFINED = 'model.undefined',

    TRIGGERED = 'model.condition.selector.event.triggered',
    NOT_TRIGGERED = 'model.condition.selector.event.not_triggered',
}

export enum LocationSelector {
    UNDEFINED = 'model.undefined',

    IS_AT = 'model.condition.selector.location.at',
    IS_NOT_AT = 'model.condition.selector.location.not_at',
}

export enum TimeSelector {
    UNDEFINED = 'model.undefined',

    IS_WEEKDAY = 'model.condition.selector.time.weekday',
    IS_WEEKEND = 'model.condition.selector.time.weekend',
    IS_HOLIDAY = 'model.condition.selector.time.holiday',
    IS_NIGHT = 'model.condition.selector.time.night',
    IS_DAY = 'model.condition.selector.time.day',
    IS_AT_DATE = 'model.condition.selector.time.isDate',
    IS_AFTER_DATE = 'model.condition.selector.time.afterDate',
    IS_BEFORE_DATE = 'model.condition.selector.time.beforeDate',
}

export class Condition {
    public initiator: ConditionInitiator;
    public activeAgent: Agent;
    public passiveAgent: Agent;
    //A number representing any of the selectors of the individual Initiator
    public selector: string;
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
    public parameters: number[];
    public targets: string[];

    //Verify the health of the condition metadata, not if the condition actually evaluates to true or false with in-game attributes.
    public EvaluateConditionHealth(): Feedback {
        if (ConditionHealthCheckRepository.hasOwnProperty(this.initiator)) {
            return ConditionHealthCheckRepository[this.initiator](this);
        } else {
            return new Feedback(false, 'The condition needs to have an initiator');
        }
    }

    //Verify the condition evaluation in game
    public EvaluateCondition(): boolean {
        //TODO
        return true;
    }

    constructor() {
        this.initiator = ConditionInitiator.UNDEFINED;
        this.activeAgent = Agent.UNDEFINED;
        this.passiveAgent = Agent.UNDEFINED;
        this.selector = NumericSelector.UNDEFINED;
        this.parameters = [];
        this.targets = [];
    }
}
