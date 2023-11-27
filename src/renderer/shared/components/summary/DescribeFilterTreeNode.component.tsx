import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { Box, List, ListItem, ListSubheader, Typography } from '@mui/material';
import { SummarizeEntityVariableValueObject, SummarizeEntityVariableValueToStringLine } from 'renderer/shared/utils/Summary';
import { EntityVariableValue } from 'renderer/shared/models/interfaces/EntityVariableValue.interface';
import { VariableType } from 'renderer/shared/models/enums/VariableType';

interface IProps {
    filterNode: FilterNode;
}

export function DescribeFilterTreeNode({ filterNode }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const formatSummaryOfNodeFilter = (entityFilter: EntityVariableValue) => {
        if (!entityFilter || !entityFilter.entityType || !entityFilter.variableKey) {
            return <></>;
        }

        const summarizedObject = SummarizeEntityVariableValueObject(entityFilter);
        const evvSummarized = SummarizeEntityVariableValueToStringLine(summarizedObject.variable, entityFilter.operator, entityFilter.value);

        if (entityFilter.externalEntityFilter.length !== 0) {
            const externalsEvvSummarizedArray = entityFilter.externalEntityFilter.map((externalEntityFilter) => {
                const externalSummarizedObject = SummarizeEntityVariableValueObject(entityFilter);
                return SummarizeEntityVariableValueToStringLine(externalSummarizedObject.variable, externalEntityFilter.operator, externalSummarizedObject.value);
            });

            if (summarizedObject.variable.type !== VariableType.EXTERNAL_KEY && summarizedObject.variable.type !== VariableType.EXTERNAL_KEY_LIST) {
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

        return (
            <Typography>
                {summarizedObject.target} {evvSummarized}
            </Typography>
        );
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
