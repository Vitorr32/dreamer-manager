import React from 'react';
import { Box } from '@mui/system';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Condition } from 'renderer/shared/models/base/Condition.model';
import { ConditionInitiator } from 'renderer/shared/models/enums/ConditionInitiator.enum';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'renderer/redux/store';
import { useSelector } from 'react-redux';

interface IProps {
    conditionTree: ConditionTree;
    placeholder?: boolean;
}

export function ConditionTreeSummary({ conditionTree, placeholder = false }: IProps) {
    const { t } = useTranslation();

    const root = conditionTree.root;
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

    return (
        <Box className="condition-tree-summary">
            <Box className="condition-tree-summary__root">
                {placeholder ? null : (
                    <Typography component="span" className="condition-tree-summary__check">
                        ( <CheckIcon sx={{ color: 'green' }} /> / <CloseIcon sx={{ color: 'crimson' }} />)
                    </Typography>
                )}
                <Typography>{t(root.logicOperator)}</Typography>

                {root.conditions.map((condition) => renderCondition(condition))}
            </Box>
        </Box>
    );
}
