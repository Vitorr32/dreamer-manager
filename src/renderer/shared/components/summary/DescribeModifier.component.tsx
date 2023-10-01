import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Typography } from '@mui/material';
import { DescribeFilterNode } from './DescribeFilterNode.component';

interface IProps {
    modifier: Modifier;
}

export function DescribeModifier({ modifier }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const getModifierTarget = (modifier: Modifier): JSX.Element | null => {
        if (!modifier.targetEntityFilter) {
            return null;
        }
    };

    return <Box sx={{ color: 'text.primary' }}>{getModifierTarget(modifier)}</Box>;
}
