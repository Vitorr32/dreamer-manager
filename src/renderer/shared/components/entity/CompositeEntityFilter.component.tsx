import { useTranslation } from 'react-i18next';
import { EntityFilterTree, FilterNode } from 'renderer/shared/models/base/EntityFilterTree.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterNode } from './EntityFilterNode.component';

interface IProps {
    filterTree: EntityFilterTree;
    onFilterTreeChange: (entityFilterTree: EntityFilterTree) => void;
}

export function CompositeEntityFilter({ filterTree, onFilterTreeChange }: IProps) {
    const { t } = useTranslation();

    const onRootFilterChange = (updatedRoot: FilterNode): void => {
        const updatedTree = CopyClassInstance(filterTree);
        updatedTree.root = updatedRoot;

        onFilterTreeChange(updatedTree);
    };

    return filterTree && <EntityFilterNode filterNode={filterTree.root} index={0} isRoot={true} onFilterNodeChange={onRootFilterChange} />;
}
