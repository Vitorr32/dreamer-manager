import React from 'react';
import { Box } from '@mui/system';
import { ConditionTree, Node } from 'renderer/shared/models/base/ConditionTree';
import { Typography } from '@mui/material';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { useTranslation } from 'react-i18next';

interface IProps {
    conditionTree: ConditionTree;
    placeholder?: boolean;
}

export function ConditionTreeSummary({ conditionTree, placeholder = false }: IProps) {
    const { t } = useTranslation();

    const root = conditionTree.root;

    return (
        <Box className="condition-tree-summary">
            <Typography>{t(root.logicOperator)}</Typography>
        </Box>
    );
}
