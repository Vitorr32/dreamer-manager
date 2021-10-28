import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Node } from '../../../shared/models/base/ConditionTree';
import { LogicOperator } from '../../../shared/models/enums/LogicOperator.enum';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Condition } from '../../../shared/models/base/Condition.model';
import { ConditionLine } from './ConditionLine.component';
import { Box } from '@mui/system';

interface IProps {
    conditionNode: Node;
    index: number;
    depth: number;
    onChange: (index: number, node: Node) => void;
    onRemoveSelf?: (index: number) => void;
}
interface IState {}

export class ConditionNode extends React.Component<IProps, IState> {
    componentDidMount() {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.conditions = [new Condition()];

        this.props.onChange(this.props.index, newNode);
    }

    private onLogicOperatorChange(event: any) {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.logicOperator = event.target.value as LogicOperator;

        this.props.onChange(this.props.index, newNode);
    }

    private onChildNodeChange(index: number, node: Node) {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.children[index] = node;

        this.props.onChange(this.props.index, newNode);
    }

    private onConditionChange(index: number, condition: Condition) {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.conditions[index] = condition;

        this.props.onChange(this.props.index, newNode);
    }

    private onConditionLineRemoval(index: number) {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.conditions.splice(index, 1);

        this.props.onChange(this.props.index, newNode);
    }

    private onSubNodeRemoval(index: number) {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.children.splice(index, 1);

        this.props.onChange(this.props.index, newNode);
    }

    private onAddConditionLine() {
        const { conditionNode, index, onChange } = this.props;

        if (conditionNode.logicOperator === LogicOperator.IF && conditionNode.conditions.length !== 0) {
            console.error("Can't have multiple lines for a if node");
            return;
        }

        const newNode: Node = Object.assign({}, conditionNode);

        newNode.conditions.push(new Condition());
        onChange(index, newNode);
    }

    private onAddConditionSubNode() {
        const { conditionNode, index, onChange } = this.props;

        if (conditionNode.logicOperator === LogicOperator.IF && conditionNode.conditions.length !== 0) {
            console.error("Can't have multiple lines for a if node");
            return;
        }

        const newNode: Node = Object.assign({}, conditionNode);

        newNode.children.push(new Node());
        onChange(index, newNode);
    }

    render() {
        const { conditionNode, depth, index, onRemoveSelf } = this.props;

        return (
            <Box className="condition-node">
                <Box className="condition-node__config">
                    <FormControl variant="standard" style={{ width: '150px' }}>
                        <InputLabel id="logic-operator-label">Logic Operator</InputLabel>
                        <Select labelId="logic-operator-label" id="logic-operator" value={conditionNode.logicOperator} onChange={this.onLogicOperatorChange.bind(this)}>
                            <MenuItem value={LogicOperator.IF}>IF</MenuItem>
                            <MenuItem value={LogicOperator.OR}>OR</MenuItem>
                            <MenuItem value={LogicOperator.AND}>AND</MenuItem>
                        </Select>
                    </FormControl>

                    <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />} onClick={this.onAddConditionSubNode.bind(this)}>
                        Add Sub Node
                    </Button>

                    <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />} onClick={this.onAddConditionLine.bind(this)}>
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
                            <ConditionLine key={`condition_line_${depth}_${index}`} index={index} conditionLine={conditionLine} onChange={this.onConditionChange.bind(this)} onRemove={this.onConditionLineRemoval.bind(this)} />
                        );
                    })}

                    {conditionNode.children.map((childNode, index) => {
                        return (
                            <ConditionNode
                                key={`condition_node_${depth}_${index}`}
                                depth={depth + 1}
                                onChange={this.onChildNodeChange.bind(this)}
                                onRemoveSelf={this.onSubNodeRemoval.bind(this)}
                                index={index}
                                conditionNode={childNode}
                            />
                        );
                    })}
                </Box>
            </Box>
        );
    }
}
