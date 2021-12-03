import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Agent, Condition, NumericSelector } from 'renderer/shared/models/base/Condition.model';
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
                console.error('Unknown agent! ' + agent);
                return '';
        }
    };

    const getNameFromDatabase = (line: Condition) => {
        switch (line.initiator) {
            case ConditionInitiator.ATTRIBUTE_RANGE:
                return t(line.targets.length > 1 ? 'summary.attribute.plural' : 'summary.attribute.singular', { name: JoinArrayOfString(line.targets.map((target) => database.mappedDatabase.attributes[target].name)) });
            default:
                return '';
        }
    };

    const renderConditionLineSentence = (line: Condition): string => {
        switch (line.selector) {
            case NumericSelector.BETWEEN:
                return t('summary.condition.between', { agent: getAgentString(line.activeAgent, context), variable: getNameFromDatabase(line) });
            //Use of Numeric Selector
            case ConditionInitiator.ATTRIBUTE_RANGE:
                return JoinArrayOfString(line.targets.map((target) => database.mappedDatabase.attributes[target].name));
            case ConditionInitiator.TRAIT:
                return JoinArrayOfString(line.targets.map((target) => database.mappedDatabase.traits[target].name));
            case ConditionInitiator.STATUS_RANGE:
            default:
                return '';
        }
    };

    return (
        <Box className="condition-line-summary">
            <Box className="condition-line-summary__wrapper">
                <Typography variant="body1">Yolo</Typography>
            </Box>
        </Box>
    );
}
