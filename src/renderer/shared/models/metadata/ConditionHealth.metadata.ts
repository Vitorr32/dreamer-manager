import { Agent, Condition, NumericSelector } from '../base/Condition.model';
import { Feedback } from '../base/ConditionFeedback';
import { ConditionInitiator } from '../enums/ConditionInitiator.enum';

export const ConditionHealthCheckRepository: { [conditionInitiator: string]: (condition: Condition) => Feedback } = {
    [ConditionInitiator.ATTRIBUTE_RANGE]: (condition: Condition) => {
        const conditionFeedback = new Feedback();

        if (condition.actingAgent === Agent.UNDEFINED || condition.recipientAgent === Agent.UNDEFINED) {
            conditionFeedback.message = 'The attribute range initiator demands the selection of a agent for comparation';
            conditionFeedback.valid = false;
            return conditionFeedback;
        }

        const attrSelectorFeedback: Feedback | null = CheckIfNumericSelectorIsValid(condition.parameters, condition.selector as NumericSelector);
        if (attrSelectorFeedback !== null) {
            return attrSelectorFeedback;
        } else {
            conditionFeedback.valid = true;
            return conditionFeedback;
        }
    },
};

export function CheckIfNumericSelectorIsValid(parameters: number[], numericSelector: NumericSelector): Feedback | null {
    const parametersLenght: number = parameters != null ? parameters.length : 0;

    switch (numericSelector) {
        case NumericSelector.BETWEEN:
            //The first parameters is always an id, the second and third should be the range
            return parametersLenght > 2 ? null : new Feedback(false, 'The selector between needs to have the lower and upper range limit declared on the inputs');
        case NumericSelector.BIGGER_THAN_SELF:
        case NumericSelector.SMALLER_THAN:
        case NumericSelector.EXACTLY:
            return parametersLenght > 1 ? null : new Feedback(false, 'The selector needs to have a number input declared');
        default:
            return new Feedback(false, 'The numeric selector needs to be selected to allow the condition to be valid');
    }
}
