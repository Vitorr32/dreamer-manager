import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { FilterNode } from 'renderer/shared/models/base/EntityFilterTree.model';

interface IProps {
    filterNode: FilterNode;
    isRoot?: boolean;
    depth?: number;
}

export function DescribeFilterNode({ filterNode, isRoot = false, depth = 0 }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const renderModifierLine = (modifier: Modifier[]) => {};

    return <></>;
}
