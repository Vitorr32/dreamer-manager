import { Button } from '@mui/material';
import { Box } from '@mui/system';
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

    const onAddConditionTree = () => {
        if (conditionTree !== undefined) {
            console.error('Tree already is there');
            return;
        }

        onChange(new ConditionTree());
    };

    return (
        <Box>
            <Button variant="contained" onClick={onAddConditionTree}>
                Add Condition for Effect
            </Button>
            {conditionTree && <ConditionNode index={-1} depth={0} onChange={onRootChange} conditionNode={conditionTree.root} />}
        </Box>
    );
}
