import React from "react";
import { ConditionTree, Node } from "../../../shared/models/base/ConditionTree";
import { ConditionNode } from "./ConditionNode.component";

interface IProps {
}
interface IState {
    conditionTree: ConditionTree
}

export class ConditionTreeEditor extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            conditionTree: new ConditionTree()
        }
    }

    public onRootChange(index: number, condition: Node) {
        if(index !== -1){
            console.error("ON ROOT CHANGE CALLED FOR WRONG NODE")
            return;
        }
        const updatedTreeRoot = Object.assign({}, this.state.conditionTree)
        updatedTreeRoot.root = condition
        this.setState({ conditionTree: updatedTreeRoot })
    }

    render() {
        const { conditionTree } = this.state;

        return (
            <section className="condition-tree-editor">
                <ConditionNode index={-1} depth={0} onChange={this.onRootChange.bind(this)} conditionNode={conditionTree.root} />
            </section>
        )
    }
}
