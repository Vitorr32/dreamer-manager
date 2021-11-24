import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Condition } from 'renderer/shared/models/base/Condition.model';
import { ConditionInitiator } from 'renderer/shared/models/enums/ConditionInitiator.enum';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';
import { JoinArrayOfString } from 'renderer/shared/utils/StringOperations';

interface IProps {
    condition: Condition;
}

export function ConditionLineSummary({ condition }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const renderCondition = (line: Condition): React.ReactElement | null => {
        console.log('line', line);

        switch (line.initiator) {
            //Use of Numeric Selector
            case ConditionInitiator.ATTRIBUTE_RANGE:
                return <Typography key={'line_' + uuidv4()}>{line.targets.map((target) => database.mappedDatabase.attributes[target]).join(', ')}</Typography>;
            case ConditionInitiator.STATUS_RANGE:
                return <Typography key={'line_' + uuidv4()}>{t('')}</Typography>;

            default:
                return null;
        }
    };

    const renderInitiatorSentence = (line: Condition): string => {
        switch (line.initiator) {
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
