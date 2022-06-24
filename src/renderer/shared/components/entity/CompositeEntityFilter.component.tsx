import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { EntityFilterEditor } from './EntityFilterEditor.component';

interface IProps {
    entityFilters: EntityFilter[];
    onFiltersChange: (entityFilters: EntityFilter[]) => void;
}

export function CompositeEntityFilter({ entityFilters, onFiltersChange }: IProps) {
    const { t } = useTranslation();

    const onIndividualFilterChange = (updatedFilter: EntityFilter, index: number) => {
        const updatedList = CopyClassInstance(entityFilters);

        updatedList[index] = updatedFilter;
        onFiltersChange(updatedList);
    };

    const onAddFilterToList = () => {
        const updatedList = CopyClassInstance(entityFilters);

        updatedList.push(DEFAULT_ENTITY_FILTER);
        onFiltersChange(updatedList);
    };

    const onRemoveFilterFromList = (index: number) => {
        const updatedList = CopyClassInstance(entityFilters);

        updatedList.splice(index, 1);
        onFiltersChange(updatedList);
    };

    return (
        <Box className="composite-entity-filter">
            <Button onClick={onAddFilterToList}>ADD</Button>

            {entityFilters.map((filter, index) => {
                return (
                    <Box key={`filter_${index}`}>
                        <EntityFilterEditor entityFilter={filter} onFilterChange={(updatedFilter) => onIndividualFilterChange(updatedFilter, index)} />
                        <Button onClick={() => onRemoveFilterFromList(index)}>X</Button>
                    </Box>
                );
            })}
        </Box>
    );
}
