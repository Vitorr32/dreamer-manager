import { useTranslation } from 'react-i18next';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { List, ListItem, ListSubheader } from '@mui/material';
import { DescribeEVVList } from './DescribeEVVList.component';

interface IProps {
    filterNode: FilterNode;
}

export function DescribeFilterTreeNode({ filterNode }: IProps) {
    const { t } = useTranslation();

    return (
        <List>
            <ListSubheader>{t(filterNode.logicOperator)}</ListSubheader>
            <DescribeEVVList evvArray={filterNode.entityFilters} />
            {filterNode.children.length !== 0 ? (
                <List>
                    {...filterNode.children.map((childNode) => (
                        <ListItem>
                            <DescribeFilterTreeNode filterNode={childNode} />
                        </ListItem>
                    ))}
                </List>
            ) : null}
        </List>
    );
}
