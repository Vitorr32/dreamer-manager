import { v4 as uuidv4 } from 'uuid';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { EntityVariableValue } from 'renderer/shared/models/interfaces/EntityVariableValue.interface';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { useEffect } from 'react';
import { EntityFilterEditor } from './EntityFilterEditor.component';

interface IProps {
    filterNode: FilterNode;
    index: number;
    parentIndex?: number;
    depth?: number;
    isRoot?: boolean;
    onFilterNodeChange: (entityFilterTree: FilterNode, indexOfNode: number) => void;
    onRemoveSelf?: (index: number) => void;
    entityFilterOptions?: EntityFilterOptions;
}

export function EntityFilterNode({ filterNode, onFilterNodeChange, onRemoveSelf, index, parentIndex = 0, depth = 0, isRoot = false, entityFilterOptions }: IProps) {
    const { t } = useTranslation();

    // Verify if the there is a locked entity type, and then assign it's values to all the filter nodes
    useEffect(() => {
        if (entityFilterOptions?.isLookingForSpecificEntity) {
            const updatedFilterNode = CopyClassInstance(filterNode);

            updatedFilterNode.entityFilters.forEach((filter, indexOfFilter) => {
                if (filter.entityType !== entityFilterOptions.isLookingForSpecificEntity) {
                    updatedFilterNode.entityFilters[indexOfFilter].entityType = entityFilterOptions.isLookingForSpecificEntity;
                }
            });

            onFilterNodeChange(updatedFilterNode, index);
        }
    });

    const onLogicOperatorChange = (operator: LogicOperator): void => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.logicOperator = operator;

        onFilterNodeChange(updatedFilterNode, index);
    };

    const onChildNodeChange = (node: FilterNode, childIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.children[childIndex] = node;
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onChildNodeRemoval = (toRemoveIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.children.splice(toRemoveIndex, 1);
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onChildNodeAddition = () => {
        if (filterNode.logicOperator === LogicOperator.IF && filterNode.children.length !== 0) {
            console.error("Can't have multiple lines for a if node");
            return;
        }

        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.children.push(new FilterNode());
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onNodeFilterChange = (filter: EntityVariableValue, filterListIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.entityFilters[filterListIndex] = filter;
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onNodeFilterRemoval = (toRemoveIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.entityFilters.splice(toRemoveIndex, 1);
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onNodeFilterAddition = () => {
        if (filterNode.logicOperator === LogicOperator.IF && filterNode.entityFilters.length !== 0) {
            console.error("Can't have multiple lines for a if node");
            return;
        }

        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.entityFilters.push(DEFAULT_ENTITY_FILTER);
        onFilterNodeChange(updatedFilterNode, index);
    };

    return (
        <Box className="condition-node">
            <Box className="condition-node__config">
                <FormControl variant="standard">
                    <InputLabel id="logic-operator-label">{t('interface.editor.entity.input_label_logic_operator')}</InputLabel>
                    <Select
                        labelId="logic-operator-label"
                        id="logic-operator"
                        value={filterNode.logicOperator}
                        onChange={(ev) => onLogicOperatorChange(ev.target.value as LogicOperator)}
                    >
                        <MenuItem value={LogicOperator.IF}>{t(LogicOperator.IF)}</MenuItem>
                        <MenuItem value={LogicOperator.OR}>{t(LogicOperator.OR)}</MenuItem>
                        <MenuItem value={LogicOperator.AND}>{t(LogicOperator.AND)}</MenuItem>
                    </Select>
                </FormControl>

                <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />} onClick={onChildNodeAddition}>
                    {t('interface.editor.entity.button_filter_add_child')}
                </Button>

                <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />} onClick={onNodeFilterAddition}>
                    {t('interface.editor.entity.button_filter_add_filter')}
                </Button>

                {!isRoot && (
                    <Button className="condition-node__remove" variant="contained" startIcon={<CloseIcon />} onClick={() => onRemoveSelf && onRemoveSelf(index)}>
                        {t('interface.editor.entity.button_remove_filter')}
                    </Button>
                )}
            </Box>

            <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography> {t('interface.editor.entity.node_filters')}</Typography>
                {filterNode.entityFilters.map((entityFilter, indexOfFilter) => {
                    return (
                        <Box key={`entity_filter_${depth}_${parentIndex}${uuidv4()}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <EntityFilterEditor
                                entityFilter={entityFilter}
                                onFilterChange={(updatedFilter) => onNodeFilterChange({ ...DEFAULT_ENTITY_FILTER, ...updatedFilter }, indexOfFilter)}
                                entityFilterOptions={entityFilterOptions}
                            />
                            <Button onClick={() => onNodeFilterRemoval(indexOfFilter)}>
                                <CloseIcon />
                            </Button>
                        </Box>
                    );
                })}
            </Box>

            <Box sx={{ marginTop: '10px' }}>
                <Typography>{t('interface.editor.entity.node_children')}</Typography>
                {filterNode.children.map((entityFilter, indexOfFilter) => {
                    return (
                        <EntityFilterNode
                            key={`filter_node_${depth}_${parentIndex}${uuidv4()}`}
                            parentIndex={indexOfFilter}
                            depth={depth + 1}
                            index={indexOfFilter}
                            filterNode={entityFilter}
                            onFilterNodeChange={(updatedFilter) => onChildNodeChange(updatedFilter, indexOfFilter)}
                            onRemoveSelf={onChildNodeRemoval}
                            entityFilterOptions={entityFilterOptions}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}
