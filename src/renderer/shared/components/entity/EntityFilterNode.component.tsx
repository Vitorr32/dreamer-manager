import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilterTree, FilterNode } from 'renderer/shared/models/base/EntityFilterTree.model';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterEditor } from './EntityFilterEditor.component';

interface IProps {
    filterNode: FilterNode;
    index: number;
    depth: number;
    isRoot?: boolean;
    onFilterNodeChange: (entityFilterTree: FilterNode, indexOfNode: number) => void;
}

export function EntityFilterNode({ filterNode, onFilterNodeChange, index, isRoot = false }: IProps) {
    const { t } = useTranslation();

    const onLogicOperatorChange = (operator: LogicOperator): void => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        filterNode.logicOperator = operator

        onFilterNodeChange(updatedFilterNode, index);
    };

    const onChildNodeChange = (node: FilterNode, childIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.children[childIndex] = node;
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onConditionChange = (filter: EntityFilter, filterListIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.entityFilters[filterListIndex] = filter
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onConditionLineRemoval = (toRemoveIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.entityFilters.splice(toRemoveIndex, 1);
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onSubNodeRemoval = (toRemoveIndex: number) => {
        const updatedFilterNode = CopyClassInstance(filterNode);
        updatedFilterNode.children.splice(toRemoveIndex, 1);
        onFilterNodeChange(updatedFilterNode, index);
    };

    const onAddConditionLine = () => {
        if (filterNode.logicOperator === LogicOperator.IF && filterNode.entityFilters.length !== 0) {
            console.error("Can't have multiple lines for a if node");
            return;
        }

        const newNode: Node = Object.assign({}, conditionNode);

        newNode.conditions.push(new Condition());
        onChange(index, newNode);
    };

    const onAddConditionSubNode = () => {
        if (conditionNode.logicOperator === LogicOperator.IF && conditionNode.conditions.length !== 0) {
            console.error("Can't have multiple lines for a if node");
            return;
        }

        const newNode: Node = Object.assign({}, conditionNode);

        newNode.children.push(new Node());
        onChange(index, newNode);
    };

    return (
        <Box className="condition-node">
            <Box className="condition-node__config">
                <FormControl variant="standard">
                    <InputLabel id="logic-operator-label">Logic Operator</InputLabel>
                    <Select labelId="logic-operator-label" id="logic-operator" value={conditionNode.logicOperator} onChange={onLogicOperatorChange}>
                        <MenuItem value={LogicOperator.IF}>IF</MenuItem>
                        <MenuItem value={LogicOperator.OR}>OR</MenuItem>
                        <MenuItem value={LogicOperator.AND}>AND</MenuItem>
                    </Select>
                </FormControl>

                <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />} onClick={onAddConditionSubNode}>
                    Add Sub Node
                </Button>

                <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />} onClick={onAddConditionLine}>
                    Add Condition Line
                </Button>

                {index !== -1 && (
                    <Button className="condition-node__remove" variant="contained" startIcon={<CloseIcon />} onClick={() => onRemoveSelf && onRemoveSelf(index)}>
                        Remove Node
                    </Button>
                )}
            </Box>

            <Box className="node-children">
                {conditionNode.conditions.map((conditionLine, index) => {
                    return (
                        <ConditionLine
                            key={`condition_line_${depth}_${index}`}
                            index={index}
                            conditionLine={conditionLine}
                            onChange={onConditionChange}
                            onRemove={onConditionLineRemoval}
                        />
                    );
                })}

                {conditionNode.children.map((childNode, index) => {
                    return (
                        <ConditionNode
                            key={`condition_node_${depth}_${index}`}
                            depth={depth + 1}
                            onChange={onChildNodeChange}
                            onRemoveSelf={onSubNodeRemoval}
                            index={index}
                            conditionNode={childNode}
                        />
                    );
                })}
            </Box>
        </Box>
}
