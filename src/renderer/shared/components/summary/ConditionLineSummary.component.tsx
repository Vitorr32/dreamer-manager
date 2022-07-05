import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Condition, TimeSelector } from 'renderer/shared/models/base/Condition.model';
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

    const getSummaryForSelector = (line: Condition): string => {
        switch (line.selector) {
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

        return parameter;
    };

    const renderConditionLineSentence = (line: Condition, worldSnapshot: any): string => {
        return t(getSummaryForSelector(line), {
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
