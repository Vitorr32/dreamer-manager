import React from 'react';
import { Box } from '@mui/system';
import { ConditionTree, Node } from 'renderer/shared/models/base/ConditionTree';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import { WorldSnapshot } from 'renderer/shared/models/engine/WorldSnapshot';
import { ConditionLineSummary } from './ConditionLineSummary.component';

interface IProps {
    conditionTree: ConditionTree;
    worldSnapshot?: WorldSnapshot;
}

export function ConditionTreeSummary({ conditionTree, worldSnapshot }: IProps) {
    const { t } = useTranslation();

    const root = conditionTree.root;

    console.log(root);

    const renderConditionNodeSummary = (node: Node): React.ReactElement | null => {
        console.log('node', node);
        if (!node) {
            console.log('returning Null', node);
            return null;
        }

        return (
            <Box className="node-summary">
                <Box className="node-summary__logic">
                    {worldSnapshot && (
                        <Typography component="span" className="node-summary__check">
                            ( <CheckIcon sx={{ color: 'green' }} /> / <CloseIcon sx={{ color: 'crimson' }} />)
                        </Typography>
                    )}
                    <Typography>{t(node.logicOperator)}</Typography>
                </Box>
                <ul className="node-summary__conditions">
                    {node.conditions.map((condition) => (
                        <li key={`line_${uuidv4()}`}>
                            <ConditionLineSummary condition={condition} worldSnapshot={worldSnapshot} />
                        </li>
                    ))}
                    {node.children.map((node) => (
                        <li key={`node_${uuidv4()}`}>{renderConditionNodeSummary(node)}</li>
                    ))}
                </ul>
            </Box>
        );
    };

    return <Box className="condition-tree-summary">{renderConditionNodeSummary(root)}</Box>;
}
