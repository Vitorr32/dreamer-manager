import { EntityFilterTree } from './EntityFilterTree.model';
import { Modifier } from './Modifier';

export enum Trigger {
    ON_DAY_END = 'model.effect.trigger.on_day_end',
    ON_WEEK_END = 'model.effect.trigger.on_week_end',
    ON_MONTH_END = 'model.effect.trigger.on_month_end',
    ON_YEAR_END = 'model.effect.trigger.on_year_end',
    ON_INTERACTION_START = 'model.effect.trigger.interaction_start',
    ON_EVENT_START = 'model.effect.trigger.event_starts',
    ON_TRAINING_START = 'model.effect.trigger.training_start',
    ON_RECORD_START = 'model.effect.trigger.record_starts',
    ON_SHOW_START = 'model.effect.trigger.show_starts',
}

export enum Period {
    PERMANENT = 'model.effect.period.permanent',
    SPECIFIC_PERIOD = 'model.effect.period.specific_period',
    SPECIFIC_DATE = 'model.effect.period.specific_date_to',
    SPECIFIC_DATE_FROM_TO = 'model.effect.period.specific_date_from_to'
}

export enum Source {
    TRAIT,
    RACE,
    ITEM,
    EVENT,
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
    public periodType: Period;
    //Depending on the effect period type, the value of the periodValue may be a specific date(01/01/2023 on UTC time), a duration string (2w 3d 4h)
    //or a from/to string array ['01/01/2023', '30/01/2023']
    public periodValue: any;
    //What is the modifier that this effect cause
    public modifier: Modifier;

    constructor(sourceID: string, sourceType: Source, selfTarget?: boolean) {
        this.sourceID = sourceID;
        this.sourceType = sourceType;
        this.targetSelf = true;
        this.modifier = new Modifier();
    }
}
