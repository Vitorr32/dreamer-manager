import React from 'react';
import { ConditionTree, Node } from '../../../shared/models/base/ConditionTree';
import { ConditionNode } from './ConditionNode.component';
interface IProps {
    onChange: (conditionTree: ConditionTree) => void;
    conditionTree: ConditionTree | undefined;
}

export function ConditionTreeEditor({ conditionTree, onChange }: IProps) {
    const onRootChange = (index: number, condition: Node) => {
        if (index !== -1) {
            console.error('ON ROOT CHANGE CALLED FOR WRONG NODE');
            return;
        }
        const updatedTreeRoot = Object.assign({}, conditionTree);
        updatedTreeRoot.root = condition;
        onChange(updatedTreeRoot);
    };

    return <section className="condition-tree-editor">{conditionTree && <ConditionNode index={-1} depth={0} onChange={onRootChange} conditionNode={conditionTree.root} />}</section>;
}
