import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalExpandedEntityFilter, EntityVariableValue } from 'renderer/shared/models/base/EntityVariableValue.model';
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
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';

interface IProps {
    entityFilter: ExternalExpandedEntityFilter;
    onFilterChange: (entityFilter: ExternalExpandedEntityFilter) => void;
    options: EffectEditorOptions;
}

export function ConditionEntityFilterEditor({ entityFilter, onFilterChange, options }: IProps) {
    const { t } = useTranslation();

    const [selectedVariable, setSelectedVariable] = useState<EntityVariable>();
    const [externalEntityFilters, setExternalEntityFilters] = useState<EntityVariableValue>();
    const [comparingEntityFilters, setComparingEntityFilters] = useState<EntityVariableValue>();

    const onFilterChanged = (key: 'entity' | 'variableKey' | 'value' | 'operator' | 'isFilteringExternalKey' | 'isComparingEntities', newValue: any) => {
        const updatedFilter = CopyClassInstance(entityFilter);

        if (key === 'variableKey') {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entity)[newValue]);
            updatedFilter.value = '';
        } else if (key === 'entity') {
            setSelectedVariable(null);
            updatedFilter.variableKey = '';
            updatedFilter.value = '';
        } else if (key === 'isFilteringExternalKey') {
            //If the isFilteringExternalKey checkbox is toggled, and the value is true, continue to configure the new filter using the external key entity as base.
            onExternalEntityCheckboxToggle(newValue);
        } else if (key === 'isComparingEntities') {
            onComparingEntitiesCheckboxToggle(newValue);
        }

        updatedFilter[key] = newValue;
        onFilterChange(updatedFilter);
    };

    const onExternalEntityCheckboxToggle = (hasTarget: boolean) => {
        if (hasTarget) {
            setExternalEntityFilters({
                ...DEFAULT_ENTITY_FILTER,
                entity: selectedVariable.externalEntity,
            });
            return;
        }

        setExternalEntityFilters(null);
    };

    const onComparingEntitiesCheckboxToggle = (hasTarget: boolean) => {
        if (hasTarget) {
            setComparingEntityFilters({
                ...DEFAULT_ENTITY_FILTER,
                entity: entityFilter.entity,
            });
            return;
        }

        setComparingEntityFilters(null);
    };

    return (
        <Box>
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
            {selectedVariable && !entityFilter.isFilteringExternalKey && (
                <VariableValueOperator
                    variable={selectedVariable}
                    variableOperator={entityFilter.operator}
                    onOperatorChange={(operator) => onFilterChanged('operator', operator)}
                />
            )}

            {/* VARIABLE INPUT */}
            {selectedVariable && !entityFilter.isFilteringExternalKey && !entityFilter.isComparingEntities && (
                <VariableValueInput
                    variable={selectedVariable}
                    variableValue={entityFilter.value}
                    onVariableValueChange={(value) => onFilterChanged('value', value)}
                    options={options}
                />
            )}

            {/* TOGGLE EXTERNAL ENTITY FILTER */}
            {selectedVariable && (selectedVariable.type === VariableType.EXTERNAL_KEY || selectedVariable.type === VariableType.EXTERNAL_KEY_LIST) && (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={entityFilter.isFilteringExternalKey || false}
                            onChange={(event) => onFilterChanged('isFilteringExternalKey', event.target.checked)}
                        />
                    }
                    label={t('interface.editor.entity.input_label_external_filter') as string}
                />
            )}

            {/* EXTERNAL ENTITY FILTER */}
            {entityFilter.isFilteringExternalKey && <EntityFilterEditor entityFilter={externalEntityFilters} onFilterChange={setExternalEntityFilters} lockEntitySelection />}

            {/* TOGGLE ENTITY COMPARISON */}
            {selectedVariable && (
                <FormControlLabel
                    control={
                        <Checkbox checked={entityFilter.isComparingEntities || false} onChange={(event) => onFilterChanged('isComparingEntities', event.target.checked)} />
                    }
                    label={t('interface.editor.entity.input_label_comparison') as string}
                />
            )}

            {/* ENTITY COMPARISON FILTER */}
            {entityFilter.isComparingEntities && <EntityFilterEditor entityFilter={comparingEntityFilters} onFilterChange={setComparingEntityFilters} lockEntitySelection />}
        </Box>
    );
}
