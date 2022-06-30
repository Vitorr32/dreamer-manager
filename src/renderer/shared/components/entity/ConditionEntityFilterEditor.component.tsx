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
import { EntityFilterEditor } from './EntityFilterEditor.component';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';

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
        } else if (key === 'hasTarget') {
            //If the hasTarget checkbox is toggled, and the value is true, continue to configure the new filter using the external key entity as base.
            onHasTargetCheckboxToggle(newValue);
        }

        updatedFilter[key] = newValue;
        onFilterChange(updatedFilter);
    };

    const onHasTargetCheckboxToggle = (hasTarget: boolean) => {
        if (hasTarget) {
            setExternalEntityFilters({
                ...DEFAULT_ENTITY_FILTER,
                entity: selectedVariable.externalEntity,
            });
            return;
        }

        setExternalEntityFilters(null);
    };

    return (
        <Box className="yolo">
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

            {selectedVariable && (selectedVariable.type === VariableType.EXTERNAL_KEY || selectedVariable.type === VariableType.EXTERNAL_KEY_LIST) && (
                <FormControlLabel
                    control={<Checkbox checked={entityFilter.hasTarget || false} onChange={(event) => onFilterChanged('hasTarget', event.target.checked)} />}
                    label="Label"
                />
            )}

            {entityFilter.hasTarget && <EntityFilterEditor entityFilter={externalEntityFilters} onFilterChange={setExternalEntityFilters} lockEntitySelection />}
        </Box>
    );
}
