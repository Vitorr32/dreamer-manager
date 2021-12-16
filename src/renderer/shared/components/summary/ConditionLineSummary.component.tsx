import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Agent, Condition, LocationSelector, NumericSelector, TimeSelector } from 'renderer/shared/models/base/Condition.model';
import { ConditionInitiator } from 'renderer/shared/models/enums/ConditionInitiator.enum';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { JoinArrayOfString } from 'renderer/shared/utils/StringOperations';

interface IProps {
    condition: Condition;
    //Context should have all worlds, event and character information. If not present use placeholders.
    context?: any;
}

export function ConditionLineSummary({ condition, context }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const getAgentString = (agent: Agent, context: any): string => {
        //TODO: Get the agent name from the context when actualy in-game summary
        switch (agent) {
            case Agent.SELF:
                return t('summary.agent.unknown_self');
            case Agent.INTERACTED:
                return t('summary.agent.unknown_interacted');
            case Agent.PRODUCER:
                return t('summary.agent.unknown_producer');
            case Agent.TUTOR:
                return t('summary.agent.unknown_tutor');
            default:
                return '';
        }
    };

    const getNameFromDatabase = (line: Condition) => {
        switch (line.initiator) {
            case ConditionInitiator.ATTRIBUTE_RANGE:
                return t(line.targets.length > 1 ? 'summary.attribute.plural' : 'summary.attribute.singular', { name: JoinArrayOfString(line.targets.map((target) => database.mappedDatabase.attributes[target].name)) });
            case ConditionInitiator.TRAIT:
                return t(line.targets.length > 1 ? 'summary.trait.plural' : 'summary.trait.singular', { name: JoinArrayOfString(line.targets.map((target) => database.mappedDatabase.traits[target].name)) });
            case ConditionInitiator.STATUS_RANGE:
                return t('summary.status.pattern', { name: JoinArrayOfString(line.targets.map((target) => t(target))) });
            case ConditionInitiator.RELATIONSHIP:
                return t('summary.relationship.pattern', { name: JoinArrayOfString(line.targets.map((target) => t(target))) });
            default:
                return t('summary.common.defaultAgent');
        }
    };

    const getSummaryForSelector = (line: Condition): string => {
        switch (line.selector) {
            case NumericSelector.BETWEEN:
                return 'summary.condition.between';
            case NumericSelector.BIGGER_THAN:
                return 'summary.condition.bigger_than';
            case NumericSelector.BIGGER_THAN_TARGET:
                return 'summary.condition.bigger_than_target';
            case NumericSelector.EXACTLY:
                return 'summary.condition.exactly';
            case NumericSelector.SMALLER_THAN:
                return 'summary.condition.smaller_than';
            case NumericSelector.SMALLER_THAN_TARGET:
                return 'summary.condition.smaller_than_target';
            case TimeSelector.IS_DAY:
                return 'summary.condition.is_day';
            case TimeSelector.IS_NIGHT:
                return 'summary.condition.is_night';
            case TimeSelector.IS_HOLIDAY:
                return 'summary.condition.is_holiday';
            case TimeSelector.IS_WEEKDAY:
                return 'summary.condition.is_weekday';
            case TimeSelector.IS_WEEKEND:
                return 'summary.condition.is_weekend';
            case TimeSelector.IS_AFTER_DATE:
                return 'summary.condition.after_date';
            case TimeSelector.IS_AT_DATE:
                return 'summary.condition.is_date';
            case TimeSelector.IS_BEFORE_DATE:
                return 'summary.condition.before_date';
            case LocationSelector.IS_AT_LOCATION_OF_TYPE:
                return 'summary.condition.is_at';
            default:
                return 'summary.common.defaultSelector';
        }
    };

    const getTreatedParameterValue = (parameter: number | string | undefined, line: Condition): any => {
        if (!parameter) {
            return t('summary.common.defaultValue');
        }

        if (typeof parameter === 'string') {
            return t(parameter);
        }

        if (line.initiator === ConditionInitiator.TIME) {
            return new Date(parameter);
        }

        return parameter;
    };

    const renderConditionLineSentence = (line: Condition, context: any): string => {
        return t(getSummaryForSelector(line), {
            activeAgent: getAgentString(line.activeAgent, context),
            passiveAgent: getAgentString(line.passiveAgent, context),
            variable: getNameFromDatabase(line),
            parameter: getTreatedParameterValue(line.parameters?.[0], line),
            lowerValue: line.parameters?.[0] || t('summary.common.defaultValue'),
            higherValue: line.parameters?.[1] || t('summary.common.defaultValue'),
        });
    };

    return (
        <Box className="condition-line-summary">
            <Box className="condition-line-summary__wrapper">
                <Typography variant="body1">{renderConditionLineSentence(condition, context)}</Typography>
            </Box>
        </Box>
    );
}
