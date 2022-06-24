import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Node } from '../../../shared/models/base/ConditionTree';
import { LogicOperator } from '../../../shared/models/enums/LogicOperator.enum';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Condition } from '../../../shared/models/base/Condition.model';
import { Box } from '@mui/system';
import { ConditionLineWithEntity } from './ConditionLineWithEntity.component';

interface IProps {
    conditionNode: Node;
    index: number;
    depth: number;
    onChange: (index: number, node: Node) => void;
    onRemoveSelf?: (index: number) => void;
}

export function ConditionNode({ conditionNode, index, depth, onChange, onRemoveSelf }: IProps) {
    const onLogicOperatorChange = (event: any): void => {
        const newNode: Node = Object.assign({}, conditionNode);

        newNode.logicOperator = event.target.value as LogicOperator;

        onChange(index, newNode);
    };

    const onChildNodeChange = (childIndex: number, node: Node) => {
        const newNode: Node = Object.assign({}, conditionNode);

        newNode.children[childIndex] = node;

        onChange(index, newNode);
    };

    const onConditionChange = (childIndex: number, condition: Condition) => {
        const newNode: Node = Object.assign({}, conditionNode);

        newNode.conditions[childIndex] = condition;

        onChange(index, newNode);
    };

    const onConditionLineRemoval = (childIndex: number) => {
        const newNode: Node = Object.assign({}, conditionNode);

        newNode.conditions.splice(childIndex, 1);

        onChange(index, newNode);
    };

    const onSubNodeRemoval = (childIndex: number) => {
        const newNode: Node = Object.assign({}, conditionNode);

        newNode.children.splice(childIndex, 1);

        onChange(index, newNode);
    };

    const onAddConditionLine = () => {
        if (conditionNode.logicOperator === LogicOperator.IF && conditionNode.conditions.length !== 0) {
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
                        <ConditionLineWithEntity
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
    );
}
