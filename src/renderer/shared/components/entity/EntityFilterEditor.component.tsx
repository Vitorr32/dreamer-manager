import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicEntity, EntityVariableValue } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { CopyClassInstance, GetEntityTypeOfDynamicEntity, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';

interface IProps {
    entityFilter: EntityVariableValue;
    onFilterChange: (entityFilter: EntityVariableValue) => void;
    entityFilterOptions?: EntityFilterOptions;
    isEditor?: boolean;
}

export function EntityFilterEditor({ entityFilter, onFilterChange, entityFilterOptions, isEditor = false }: IProps) {
    const { t } = useTranslation();
    const [selectedVariable, setSelectedVariable] = useState<EntityVariable>();

    useEffect(() => {
        //Populate selected variable from data comming from props.
        if (entityFilter.entityType && entityFilter.variableKey) {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entityType)[entityFilter.variableKey]);
        } else {
            setSelectedVariable(null);
        }
    }, []);

    const onFilterChanged = (key: 'entityType' | 'variableKey' | 'value' | 'operator', newValue: any) => {
        const updatedFilter = CopyClassInstance(entityFilter);

        if (key === 'variableKey') {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entityType)[newValue]);
            updatedFilter.value = null;
        } else if (key === 'entityType') {
            setSelectedVariable(null);
            updatedFilter.variableKey = null;
            updatedFilter.operator = null;
            updatedFilter.value = null;

            //In case the entity type is actually a dynamic entity value, populate the entity type and specify the dynamic entity value.
            if (Object.values(DynamicEntity).includes(newValue as DynamicEntity)) {
                updatedFilter.specifiedDynamicEntity = newValue as DynamicEntity;
                updatedFilter.entityType = GetEntityTypeOfDynamicEntity(newValue as DynamicEntity);
                onFilterChange(updatedFilter);
                return;
            } else {
                updatedFilter.specifiedDynamicEntity = null;
            }
        }

        updatedFilter[key] = newValue;
        onFilterChange(updatedFilter);
    };

    return (
        <Box sx={{ display: 'flex', gap: '20px' }}>
            {/* ENTITY SELECT */}
            <EntitySelect entity={entityFilter} onEntityChange={(entityType) => onFilterChanged('entityType', entityType)} entityFilterOptions={entityFilterOptions} />

            {/* VARIABLE SELECT */}
            {entityFilter.entityType && (
                <VariableSelect
                    entity={entityFilter.entityType}
                    entityVariableKey={entityFilter.variableKey}
                    onVariableChange={(variable) => onFilterChanged('variableKey', variable.key)}
                    isEditor={isEditor}
                />
            )}

            {/* OPERATOR SELECT */}
            {selectedVariable && (
                <VariableValueOperator
                    variable={selectedVariable}
                    variableOperator={entityFilter.operator}
                    onOperatorChange={(operator) => onFilterChanged('operator', operator)}
                    isEditor={isEditor}
                />
            )}

            {/* VARIABLE INPUT */}
            {selectedVariable && (
                <VariableValueInput variable={selectedVariable} variableValue={entityFilter.value} onVariableValueChange={(value) => onFilterChanged('value', value)} />
            )}
        </Box>
    );
}
