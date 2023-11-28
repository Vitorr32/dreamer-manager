import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';
import { EntityVariableValue } from 'renderer/shared/models/interfaces/EntityVariableValue.interface';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { GetEntityTypeOfDynamicEntity } from 'renderer/shared/utils/DynamicEntities';
import { GetVariablesOfEntity } from 'renderer/shared/utils/EntityHelpers';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { Box, Button, IconButton, Modal, Popover, Tooltip, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { DescribeEVVList } from '../summary/DescribeEVVList.component';

interface IProps {
    entityFilter: EntityVariableValue;
    onFilterChange: (entityFilter: EntityVariableValue) => void;
    entityFilterOptions?: EntityFilterOptions;
    isEditor?: boolean;
}

export function EntityFilterEditor({ entityFilter, onFilterChange, entityFilterOptions, isEditor = false }: IProps) {
    const { t } = useTranslation();

    const [selectedVariable, setSelectedVariable] = useState<EntityVariable>();
    const [comparisonModalOpen, setComparisonModalState] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        // Populate selected variable from data coming from props.
        if (entityFilter.entityType && entityFilter.variableKey) {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entityType)[entityFilter.variableKey]);
        } else {
            setSelectedVariable(null);
        }
    }, [entityFilter]);

    const onFilterChanged = (key: 'entityType' | 'variableKey' | 'value' | 'operator' | 'externalEntityFilter', newValue: any) => {
        const updatedFilter = CopyClassInstance(entityFilter);

        if (key === 'variableKey') {
            setSelectedVariable(GetVariablesOfEntity(entityFilter.entityType)[newValue]);
            updatedFilter.value = null;
        } else if (key === 'entityType') {
            setSelectedVariable(null);
            updatedFilter.variableKey = null;
            updatedFilter.operator = null;
            updatedFilter.value = null;

            // In case the entity type is actually a dynamic entity value, populate the entity type and specify the dynamic entity value.
            if (Object.values(DynamicEntity).includes(newValue as DynamicEntity)) {
                updatedFilter.targetDynamicEntity = newValue as DynamicEntity;
                updatedFilter.entityType = GetEntityTypeOfDynamicEntity(newValue as DynamicEntity);
                onFilterChange(updatedFilter);
                return;
            }
            updatedFilter.targetDynamicEntity = null;
        }

        updatedFilter[key] = newValue;
        onFilterChange(updatedFilter);
    };

    const onExternalFilterChanged = (value: EntityVariableValue, index: number) => {
        const updatedExternalFilters = CopyClassInstance(entityFilter.externalEntityFilter || []);

        if (updatedExternalFilters.length === 0) {
            onFilterChanged('externalEntityFilter', [value]);
            return;
        }

        updatedExternalFilters[index] = value;
        onFilterChanged('externalEntityFilter', [value]);
    };

    const comparisonPopoverOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const comparisonPopoverOnClose = () => {
        setAnchorEl(null);
    };

    const getComparisonTriggerJSX = () => {
        if (entityFilter.externalEntityFilter.length === 0) {
            return (
                <Tooltip title={t('interface.editor.condition.set_comparison_label', { entity: t(entityFilter.entityType) })}>
                    <IconButton onClick={() => setComparisonModalState(true)}>
                        <ManageSearchIcon />
                    </IconButton>
                </Tooltip>
            );
        }

        return (
            <>
                <Button onClick={comparisonPopoverOnClick}>{t(entityFilter.entityType)}</Button>
                <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={comparisonPopoverOnClose}>
                    <DescribeEVVList evvArray={entityFilter.externalEntityFilter} />
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>
            </>
        );
    };

    useEffect(() => {
        if (entityFilterOptions?.isLookingForSpecificEntity && entityFilter.entityType !== entityFilterOptions?.isLookingForSpecificEntity) {
            onFilterChanged('entityType', entityFilterOptions.isLookingForSpecificEntity);
        }
    });

    return (
        <Box sx={{ display: 'flex', gap: '20px' }}>
            {/* ENTITY SELECT */}
            <EntitySelect
                entity={entityFilter}
                onEntityChange={(entityType) => onFilterChanged('entityType', entityType)}
                disabled={!!entityFilterOptions?.isLookingForSpecificEntity}
                entityFilterOptions={entityFilterOptions}
            />

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
            {selectedVariable && entityFilter.externalEntityFilter.length === 0 && (
                <VariableValueInput
                    variable={selectedVariable}
                    variableValue={entityFilter.value}
                    onVariableValueChange={(value) => onFilterChanged('value', value)}
                    isEditor={isEditor}
                />
            )}

            {/* COMPARATOR/EXTERNAL SELECTOR */}
            {selectedVariable && !isEditor && (
                <>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>{t('interface.commons.or')}</Typography>
                    {getComparisonTriggerJSX()}
                    <Modal open={comparisonModalOpen} onClose={() => setComparisonModalState(false)}>
                        <Box>
                            {...entityFilter.externalEntityFilter.map((externalFilter, index) => {
                                return (
                                    <EntityFilterEditor
                                        key={`comparison_entity_filter_${uuidv4()}`}
                                        entityFilter={externalFilter}
                                        onFilterChange={(newFilter) => onExternalFilterChanged(newFilter, index)}
                                        entityFilterOptions={entityFilterOptions}
                                    />
                                );
                            })}
                        </Box>
                    </Modal>
                </>
            )}
        </Box>
    );
}
