import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';
import { List, ListItem, ListSubheader } from '@mui/material';
import { SummarizeEntityVariableValueObject } from 'renderer/shared/utils/Summary';

interface IProps {
    filterNode: FilterNode;
    isRoot?: boolean;
}

export function DescribeFilterTreeNode({ filterNode, isRoot = false }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const getEntityString = ({ modifiedEntityVariables }: Modifier) => {
        // Check to see if the value of the modifier is a dynamic entity that needs to be mapped using the database of the game.
        if (Object.values(DynamicEntity).includes(modifiedEntityVariables.value)) {
            switch (modifiedEntityVariables.value) {
                case DynamicEntity.SELF:
                    // return
                    break;
                default:
                    return 'Yolo';
            }
        }
        return '';
    };

    return (
        <List>
            <ListSubheader>{t(filterNode.logicOperator)}</ListSubheader>
            {/* <List>
                {...filterNode.entityFilters.map((entityFilter) => {
                    return <ListItem>{SummarizeEntityVariableValueObject(entityFilter)}</ListItem>;
                })}
            </List> */}
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
