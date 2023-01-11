import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityVariableValue } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { CopyClassInstance, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';

interface IProps {
    entityFilter: EntityVariableValue;
    onFilterChange: (entityFilter: EntityVariableValue) => void;
    entityFilterOptions?: EntityFilterOptions;
}

export function EntityFilterEditor({ entityFilter, onFilterChange, entityFilterOptions }: IProps) {
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
        <Box sx={{ display: 'flex', gap: '20px' }}>
            {/* ENTITY SELECT */}
            <EntitySelect entity={entityFilter.entity} onEntityChange={(entity) => onFilterChanged('entity', entity)} />

            {/* VARIABLE SELECT */}
            {entityFilter.entity && (
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
