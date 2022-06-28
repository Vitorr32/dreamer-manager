import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Agent, Condition, TimeSelector } from 'renderer/shared/models/base/Condition.model';
import { ConditionInitiator } from 'renderer/shared/models/enums/ConditionInitiator.enum';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { WorldSnapshot } from 'renderer/shared/models/engine/WorldSnapshot';

interface IProps {
    condition: Condition;
    //worldSnapshot should have all worlds, event and character information. If not present use placeholders.
    worldSnapshot?: WorldSnapshot;
}

export function ConditionLineSummary({ condition, worldSnapshot }: IProps) {
    const { t, i18n } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const getAgentString = (agent: Agent, worldSnapshot: any): string => {
        //TODO: Get the agent name from the worldSnapshot when actualy in-game summary
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
            default:
                return t('summary.common.defaultAgent');
        }
    };

    const getSummaryForSelector = (line: Condition): string => {
        switch (line.selector) {
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

    const renderConditionLineSentence = (line: Condition, worldSnapshot: any): string => {
        return t(getSummaryForSelector(line), {
            activeAgent: getAgentString(line.activeAgent, worldSnapshot),
            passiveAgent: getAgentString(line.passiveAgent, worldSnapshot),
            variable: getNameFromDatabase(line),
            parameter: getTreatedParameterValue(line.parameters?.[0], line),
            lowerValue: line.parameters?.[0] || t('summary.common.defaultValue'),
            higherValue: line.parameters?.[1] || t('summary.common.defaultValue'),
        });
    };

    return (
        <Box className="condition-line-summary">
            <Box className="condition-line-summary__wrapper">
                <Typography variant="body1">{renderConditionLineSentence(condition, worldSnapshot)}</Typography>
            </Box>
        </Box>
    );
}
