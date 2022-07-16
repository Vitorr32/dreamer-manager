import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { CopyClassInstance, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';

interface IProps {
    entityFilter: EntityFilter;
    onFilterChange: (entityFilter: EntityFilter) => void;
    lockEntitySelection?: boolean;
}

export function EntityFilterEditor({ entityFilter, onFilterChange, lockEntitySelection = false }: IProps) {
    const { t } = useTranslation();
    const [selectedVariable, setSelectedVariable] = useState<EntityVariable>();

    const onFilterChanged = (key: 'entity' | 'variableKey' | 'value' | 'operator', newValue: any) => {
        const updatedFilter = CopyClassInstance(entityFilter);

        if (key === 'variableKey') {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entity)[newValue]);
            updatedFilter.value = '';
        } else if (key === 'entity') {
            setSelectedVariable(null);
            updatedFilter.variableKey = '';
            updatedFilter.value = '';
        }

        updatedFilter[key] = newValue;
        onFilterChange(updatedFilter);
    };

    return (
        <Box className="">
            {/* ENTITY SELECT */}
            <EntitySelect entity={entityFilter.entity} onEntityChange={(entity) => onFilterChanged('entity', entity)} disabled={lockEntitySelection} />

            {/* VARIABLE SELECT */}
            {entityFilter.entity !== Entity.NONE && (
                <VariableSelect

                    entity={entityFilter.entity}
                    entityVariableKey={entityFilter.variableKey}
                    onVariableChange={(variable) => onFilterChanged('variableKey', variable.key)}
                />
            )}

            {/* OPERATOR SELECT */}
            {selectedVariable && (
                <VariableValueOperator
                    variable={selectedVariable}
                    variableOperator={entityFilter.operator}
                    onOperatorChange={(operator) => onFilterChanged('operator', operator)}
                />
            )}

            {/* VARIABLE INPUT */}
            {selectedVariable && (
                <VariableValueInput variable={selectedVariable} variableValue={entityFilter.value} onVariableValueChange={(value) => onFilterChanged('value', value)} />
            )}
        </Box>
    );
}
