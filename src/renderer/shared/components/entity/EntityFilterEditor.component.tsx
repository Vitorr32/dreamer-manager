import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';
import { EntityVariableValue } from 'renderer/shared/models/interfaces/EntityVariableValue.interface';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { GetEntityTypeOfDynamicEntity } from 'renderer/shared/utils/DynamicEntities';
import { GetVariablesOfEntity } from 'renderer/shared/utils/EntityHelpers';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { Box, Button, Divider, FormHelperText, IconButton, Modal, Paper, Popover, Stack, Tooltip, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { DescribeEVVList } from '../summary/DescribeEVVList.component';

interface IProps {
    entityFilter: EntityVariableValue;
    onFilterChange: (entityFilter: EntityVariableValue) => void;
    entityFilterOptions?: EntityFilterOptions;
    // If the component should use Editor options or use Filter potions when defining the EVV behavior
    isEditor?: boolean;
    // If the Entity Filter Editor is inside a comparison modal.
    isComparison?: boolean;
}

export function EntityFilterEditor({ entityFilter, onFilterChange, entityFilterOptions, isEditor = false, isComparison = false }: IProps) {
    const { t } = useTranslation();

    const [selectedVariable, setSelectedVariable] = useState<EntityVariable>();
    const [comparisonModalOpen, setComparisonModalState] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const externalFilters = entityFilter.externalEntityFilter || [];
    const hasComparison = externalFilters.length > 0;
    const paperPadding = isComparison ? 1.5 : 2;

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

    const onExternalFilterChanged = (value: EntityVariableValue, index: number, emptyExternalFilter = false) => {
        const updatedExternalFilters = CopyClassInstance(entityFilter.externalEntityFilter || []);

        if (emptyExternalFilter) {
            onFilterChanged('externalEntityFilter', []);
            return;
        }

        if (updatedExternalFilters.length === 0) {
            onFilterChanged('externalEntityFilter', [value]);
            return;
        }

        updatedExternalFilters[index] = value;
        onFilterChanged('externalEntityFilter', updatedExternalFilters);
    };

    const comparisonPopoverOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const comparisonPopoverOnClose = () => {
        setAnchorEl(null);
    };

    const getComparisonTriggerJSX = () => {
        if (!hasComparison) {
            return (
                <Tooltip title={t('interface.editor.condition.set_comparison_label', { entity: t(entityFilter.entityType) })}>
                    <Button variant="outlined" startIcon={<ManageSearchIcon />} onClick={() => setComparisonModalState(true)}>
                        {t('interface.editor.condition.button_compare_entity', { defaultValue: 'Compare with another entity' })}
                    </Button>
                </Tooltip>
            );
        }

        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setComparisonModalState(true)}
                    onMouseEnter={comparisonPopoverOnClick}
                    onMouseLeave={comparisonPopoverOnClose}
                >
                    {t(entityFilter.entityType)}
                </Button>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    sx={{
                        pointerEvents: 'none',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    disableRestoreFocus
                    onClose={comparisonPopoverOnClose}
                >
                    <DescribeEVVList evvArray={externalFilters} />
                </Popover>
                <Tooltip title={t('interface.editor.condition.unset_comparison_label')}>
                    <IconButton onClick={() => onExternalFilterChanged(null, 0, true)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        );
    };

    useEffect(() => {
        if (entityFilterOptions?.isLookingForSpecificEntity && entityFilter.entityType !== entityFilterOptions?.isLookingForSpecificEntity) {
            onFilterChanged('entityType', entityFilterOptions.isLookingForSpecificEntity);
        }
    });

    return (
        <>
            <Paper
                variant={isComparison ? 'outlined' : 'elevation'}
                elevation={isComparison ? 0 : 1}
                sx={{ p: paperPadding, width: '100%', flex: 1, minWidth: 0 }}
            >
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                            {t('interface.editor.condition.step_choose_entity', { defaultValue: 'Step 1 · Pick the entity' })}
                        </Typography>
                        <EntitySelect
                            entity={entityFilter}
                            onEntityChange={(entityType) => onFilterChanged('entityType', entityType)}
                            disabled={!!entityFilterOptions?.isLookingForSpecificEntity}
                            entityFilterOptions={entityFilterOptions}
                        />
                        {!entityFilterOptions?.isLookingForSpecificEntity && (
                            <FormHelperText sx={{ mt: 0.5 }}>
                                {t('interface.editor.condition.entity_helper_text', { defaultValue: 'Choose the entity type you want to inspect.' })}
                            </FormHelperText>
                        )}
                    </Box>

                    {entityFilter.entityType && (
                        <>
                            <Divider textAlign="left">
                                {t('interface.editor.condition.section_attribute', { defaultValue: 'Attribute & rule' })}
                            </Divider>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems="stretch">
                                <VariableSelect
                                    entity={entityFilter.entityType}
                                    entityVariableKey={entityFilter.variableKey}
                                    onVariableChange={(variable) => onFilterChanged('variableKey', variable.key)}
                                    isEditor={isEditor}
                                />

                                {selectedVariable && (
                                    <VariableValueOperator
                                        variable={selectedVariable}
                                        variableOperator={entityFilter.operator}
                                        onOperatorChange={(operator) => onFilterChanged('operator', operator)}
                                        isEditor={isEditor}
                                    />
                                )}
                            </Stack>
                        </>
                    )}

                    {selectedVariable && (
                        <Stack spacing={1.5}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                                    {t('interface.editor.condition.section_value', { defaultValue: 'Step 2 · Provide the comparison value' })}
                                </Typography>
                                {!hasComparison && (
                                    <FormHelperText sx={{ mt: 0.5 }}>
                                        {t('interface.editor.condition.value_helper_text', {
                                            defaultValue: 'Set the value that will be evaluated. You can also compare against another entity.',
                                        })}
                                    </FormHelperText>
                                )}
                            </Box>

                            {!hasComparison && (
                                <VariableValueInput
                                    variable={selectedVariable}
                                    variableValue={entityFilter.value}
                                    onVariableValueChange={(value) => onFilterChanged('value', value)}
                                    isEditor={isEditor}
                                />
                            )}

                            {hasComparison && (
                                <Stack spacing={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('interface.editor.condition.comparison_summary_title', {
                                            defaultValue: 'Using another entity to supply the comparison value:',
                                        })}
                                    </Typography>
                                    <Paper variant="outlined" sx={{ p: 1.5 }}>
                                        <DescribeEVVList evvArray={externalFilters} />
                                    </Paper>
                                </Stack>
                            )}

                            {!isEditor && !isComparison && (
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center" justifyContent="flex-start">
                                    {!hasComparison && (
                                        <>
                                            <Divider flexItem />
                                            <Typography variant="caption" color="text.secondary">
                                                {t('interface.commons.or')}
                                            </Typography>
                                            <Divider flexItem />
                                        </>
                                    )}
                                    {getComparisonTriggerJSX()}
                                </Stack>
                            )}
                        </Stack>
                    )}
                </Stack>
            </Paper>

            {selectedVariable && !isEditor && !isComparison && (
                <Modal open={comparisonModalOpen} onClose={() => setComparisonModalState(false)}>
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '95%', md: 720 },
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            bgcolor: 'background.paper',
                            p: 3,
                        }}
                    >
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="h6">{t('interface.editor.condition.comparison_modal_title')}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t('interface.editor.condition.comparison_modal_helper', {
                                        defaultValue: 'Describe which entities will provide the value for this comparison.',
                                    })}
                                </Typography>
                            </Box>

                            {(externalFilters.length !== 0 ? externalFilters : [DEFAULT_ENTITY_FILTER]).map((externalFilter, index) => (
                                <EntityFilterEditor
                                    key={`comparison_filter_${index}`}
                                    entityFilter={externalFilter}
                                    onFilterChange={(newFilter) => onExternalFilterChanged(newFilter, index)}
                                    entityFilterOptions={{ ...entityFilterOptions, isLookingForSpecificEntity: entityFilter.entityType }}
                                    isComparison
                                />
                            ))}

                            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                <Button onClick={() => onExternalFilterChanged(null, 0, true)}>
                                    {t('interface.editor.condition.unset_comparison_label')}
                                </Button>
                                <Button variant="contained" onClick={() => setComparisonModalState(false)}>
                                    {t('interface.commons.done', { defaultValue: 'Done' })}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Modal>
            )}
        </>
    );
}
