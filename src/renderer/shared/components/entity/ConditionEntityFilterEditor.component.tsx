import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConditionEntityFilter, EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityVariable, VariableType } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { CopyClassInstance, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { Checkbox, FormControlLabel } from '@mui/material';

interface IProps {
    entityFilter: ConditionEntityFilter;
    onFilterChange: (entityFilter: ConditionEntityFilter) => void;
}

export function ConditionEntityFilterEditor({ entityFilter, onFilterChange }: IProps) {
    const { t } = useTranslation();

    const [selectedVariable, setSelectedVariable] = useState<EntityVariable>();
    const [externalEntityFilters, setExternalEntityFilters] = useState<EntityFilter>();

    const onFilterChanged = (key: 'entity' | 'variableKey' | 'value' | 'operator' | 'hasTarget' | 'targetFilter', newValue: any) => {
        const updatedFilter = CopyClassInstance(entityFilter);

        if (key === 'variableKey') {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entity)[newValue]);
        } else if (key === 'entity') {
            setSelectedVariable(null);
        }

        updatedFilter[key] = newValue;
        onFilterChange(updatedFilter);
    };

    return (
        <Box className="">
            {/* ENTITY SELECT */}
            <EntitySelect entity={entityFilter.entity} onEntityChange={(entity) => onFilterChanged('entity', entity)} />

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

            {selectedVariable && selectedVariable.type === VariableType.EXTERNAL_KEY && (
                <FormControlLabel
                    control={<Checkbox checked={entityFilter.hasTarget || false} onChange={(event) => onFilterChanged('hasTarget', event.target.checked)} />}
                    label="Label"
                />
            )}

            {
                // entityFilter.hasTarget &&
            }
        </Box>
    );
}
