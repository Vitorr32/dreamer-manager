import React from 'react';
import { Box } from '@mui/system';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';

interface IProps {
    conditionTree: ConditionTree;
    placeholder?: boolean;
}

export function ConditionTreeSummary({ conditionTree, placeholder = false }: IProps) {
    return <Box className="condition-tree-summary">{'asdasd'}</Box>;
}
