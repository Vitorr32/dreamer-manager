import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilterTree, FilterNode } from 'renderer/shared/models/base/EntityFilterTree.model';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterEditor } from './EntityFilterEditor.component';
import { EntityFilterNode } from './EntityFilterNode.component';

interface IProps {
    filterTree: EntityFilterTree;
    onFilterTreeChange: (entityFilterTree: EntityFilterTree) => void;
}

export function CompositeEntityFilter({ filterTree, onFilterTreeChange }: IProps) {
    const { t } = useTranslation();

    const onRootFilterChange = (updatedRoot: FilterNode): void => {
        //TODO: Update root
    };

    return (
        <Box>
            <EntityFilterNode filterNode={filterTree.root} depth={-1} index={0} onFilterNodeChange={onRootFilterChange} />
        </Box>
    );
}
