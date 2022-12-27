import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { Feedback } from './ConditionFeedback';
import { ExternalExpandedEntityFilter } from './EntityVariableValue.model';

export enum EntitySelector {
    UNDEFINED = 'model.undefined',

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

export class Condition {
    //A number representing any of the selectors of the individual Initiator
    public selector: EntitySelector;
    public entityFilter: ExternalExpandedEntityFilter;

    //Verify the health of the condition metadata, not if the condition actually evaluates to true or false with in-game attributes.
    public EvaluateConditionHealth(): Feedback {
        return new Feedback(false, 'The condition needs to have an initiator');
    }

    //Verify the condition evaluation in game
    public EvaluateCondition(): boolean {
        //TODO
        return true;
    }

    constructor() {
        this.selector = EntitySelector.UNDEFINED;
        this.entityFilter = {
            ...DEFAULT_ENTITY_FILTER,
            isFilteringExternalKey: false,
            externalEntityFilter: [],
            isComparingEntities: false,
            comparingEntityFilter: [],
        };
    }
}
