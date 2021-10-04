import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Node } from '../../../shared/models/base/ConditionTree';
import { LogicOperator } from '../../../shared/models/enums/LogicOperator.enum';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Condition } from '../../../shared/models/base/Condition.model';
import { ConditionLine } from './ConditionLine.component';

interface IProps {
    conditionNode: Node;
    index: number;
    depth: number;
    onChange: (index: number, node: Node) => void;
}
interface IState {}

export class ConditionNode extends React.Component<IProps, IState> {
    componentDidMount() {
        const newNode: Node = Object.assign({}, this.props.conditionNode);

        newNode.conditions = [new Condition()];

        this.props.onChange(this.props.index, newNode);
    }

    private onLogicOperatorChange(event: React.ChangeEvent<{ value: unknown }>) {
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

    render() {
        const { conditionNode, depth } = this.props;

        return (
            <section className="condition-node">
                <div className="condition-node__config">
                    <FormControl variant="standard" style={{ width: '150px' }}>
                        <InputLabel id="logic-operator-label">Logic Operator</InputLabel>
                        <Select labelId="logic-operator-label" id="logic-operator" value={conditionNode.logicOperator} onChange={this.onLogicOperatorChange.bind(this)}>
                            <MenuItem value={LogicOperator.IF}>IF</MenuItem>
                            <MenuItem value={LogicOperator.OR}>OR</MenuItem>
                            <MenuItem value={LogicOperator.AND}>AND</MenuItem>
                        </Select>
                    </FormControl>

                    <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />}>
                        Add Sub Node
                    </Button>

                    <Button className="condition-node__add" variant="contained" startIcon={<AddIcon />}>
                        Add Condition Line
                    </Button>

                    {this.props.index !== -1 ? (
                        <Button className="condition-node__remove" variant="contained" startIcon={<CloseIcon />}>
                            Remove Node
                        </Button>
                    ) : null}
                </div>

                <div className="node-children">
                    {conditionNode.conditions.map((conditionLine, index) => {
                        return <ConditionLine key={`condition_line_${depth}_${index}`} index={index} conditionLine={conditionLine} onChange={this.onConditionChange.bind(this)} />;
                    })}

                    {conditionNode.children.map((childNode, index) => {
                        return <ConditionNode key={`condition_node_${depth}_${index}`} depth={depth + 1} onChange={this.onChildNodeChange.bind(this)} index={index} conditionNode={childNode} />;
                    })}
                </div>
            </section>
        );
    }
}
