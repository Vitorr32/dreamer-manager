import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Typography } from '@mui/material';
import { DescribeFilterTreeNode } from './DescribeFilterTreeNode.component';

interface IProps {
    modifier: Modifier;
}

export function DescribeModifier({ modifier }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    return (
        <Box sx={{ color: 'text.primary' }}>
            <Box></Box>
        </Box>
    );
}
