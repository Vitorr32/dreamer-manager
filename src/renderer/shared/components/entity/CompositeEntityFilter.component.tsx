import { useTranslation } from 'react-i18next';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterNode } from './EntityFilterNode.component';

interface IProps {
    filterTree: EntityFilterTree;
    onFilterTreeChange: (entityFilterTree: EntityFilterTree) => void;
    entityFilterOptions?: EntityFilterOptions;
}

export function CompositeEntityFilter({ filterTree, onFilterTreeChange, entityFilterOptions }: IProps) {
    const { t } = useTranslation();

    const onRootFilterChange = (updatedRoot: FilterNode): void => {
        const updatedTree = CopyClassInstance(filterTree);
        updatedTree.root = updatedRoot;

        onFilterTreeChange(updatedTree);
    };

    return filterTree && <EntityFilterNode filterNode={filterTree.root} index={0} isRoot onFilterNodeChange={onRootFilterChange} entityFilterOptions={entityFilterOptions} />;
}
