import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';
import { Box, List, ListItem, ListSubheader, Typography } from '@mui/material';
import { SummarizeEntityVariableValueObject, SummarizeEntityVariableValueToStringLine, SummarizeExternalExpandedEntityFilterObject } from 'renderer/shared/utils/Summary';
import { ExternalExpandedEntityFilter } from 'renderer/shared/models/interfaces/ExternalExpandedEntityFilter.interface';

interface IProps {
    filterNode: FilterNode;
}

export function DescribeFilterTreeNode({ filterNode }: IProps) {
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

    const formatSummaryOfNodeFilter = (entityFilter: ExternalExpandedEntityFilter) => {
        if (!entityFilter || !entityFilter.entityType || !entityFilter.variableKey) {
            return <></>;
        }

        const summarizedObject = SummarizeExternalExpandedEntityFilterObject(entityFilter);
        const evvSummarized = SummarizeEntityVariableValueToStringLine(summarizedObject.variable, entityFilter.operator, entityFilter.value);

        if (entityFilter.isComparingToExternalEntity || entityFilter.isFilteringExternalKey) {
            const externalsEvvSummarizedArray = entityFilter.externalEntityFilter.map((externalEntityFilter) => {
                const externalSummarizedObject = SummarizeEntityVariableValueObject(entityFilter);
                return SummarizeEntityVariableValueToStringLine(externalSummarizedObject.variable, externalEntityFilter.operator, externalSummarizedObject.value);
            });

            if (entityFilter.isComparingToExternalEntity) {
                return (
                    <Box sx={{ display: 'flex' }}>
                        <Typography>{summarizedObject.target}</Typography>
                        <Typography>{evvSummarized}</Typography>
                        <List>
                            <ListSubheader>{t('summary.node.comparison', { entity: t(entityFilter.externalEntityFilter[0].entityType) })}</ListSubheader>
                            <List>
                                {...externalsEvvSummarizedArray.map((externalSummary) => {
                                    return <ListItem key={`comparator_${uuidv4()}`}>{externalSummary}</ListItem>;
                                })}
                            </List>
                        </List>
                    </Box>
                );
            }

            return (
                <List>
                    <ListSubheader>{t('summary.node.comparison', { entity: t(entityFilter.externalEntityFilter[0].entityType) })}</ListSubheader>
                    <List>
                        {...externalsEvvSummarizedArray.map((externalSummary) => {
                            return <ListItem key={`comparator_${uuidv4()}`}>{externalSummary}</ListItem>;
                        })}
                    </List>
                </List>
            );
        }

        return <></>;
    };

    return (
        <List>
            <ListSubheader>{t(filterNode.logicOperator)}</ListSubheader>
            <List>
                {...filterNode.entityFilters.map((entityFilter) => {
                    return <ListItem key={`list_item_${uuidv4()}`}>{formatSummaryOfNodeFilter(entityFilter)}</ListItem>;
                })}
            </List>
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
