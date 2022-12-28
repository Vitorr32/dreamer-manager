import { EntityFilterTree } from './EntityFilterTree.model';
import { Modifier } from './Modifier';

export enum Trigger {
    UNDEFINED,

    ALWAYS_ACTIVE,
    ON_INTERACTION_START,
    INTERACTION_END,
    DURING_INTERACTION,

    MAX_TRIGGERS,
}

export enum Duration {
    UNDEFINED,

    PERMANENT,
    SPECIFIC_DURATION,
    SPECIFIC_DATE,

    MAX_DURATIONS,
}

export enum Source {
    UNDEFINED,

    TRAIT,
    RACE,
    ITEM,

    MAX_SOURCES,
}

export enum ConditionFilterOperator {
    ANY_SATISFY_FILTER = 'model.condition.selector.entity.any_true',
    NONE_SATISFY_FILTER = 'model.condition.selector.entity.all_false',
    X_SATISFY_FILTER = 'model.condition.selector.entity.number_x_true',
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

export class Effect {
    //Whatever this effect affect the holder of the effect or the target, if applicable, of the trigger
    public targetSelf: boolean;
    //Source is with item/trait/race is the source of the effect, used to associate the effect to parent
    public sourceType: Source;
    //Source ID, used to get the source of the effect
    public sourceID: string;
    //What trigger the check for this effect
    public trigger: Trigger;
    //Operator that checks the desired result of the Condition Tree
    public conditionFilterLogicOperator: ConditionFilterOperator;
    //What is the condition for the activation of this effect when the trigger is triggered, it also may always happen.
    public conditionTree: EntityFilterTree;
    //After the effect was activated, for how much time does it take effect?
    public durationType: Duration;
    public durationArgs: number[] | undefined;
    //What is the modifier that this effect cause
    public modifier: Modifier;

    constructor(sourceID: string, sourceType: Source, selfTarget?: boolean) {
        this.sourceID = sourceID;
        this.sourceType = sourceType;
        this.targetSelf = true;
        this.trigger = Trigger.UNDEFINED;
        this.conditionTree = undefined;
        this.durationType = Duration.UNDEFINED;
        this.durationArgs = undefined;
        this.modifier = new Modifier();
    }
}
