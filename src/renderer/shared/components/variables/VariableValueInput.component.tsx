import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable, VariableType } from 'renderer/shared/models/base/Variable.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { GetEntitiesOfEntity } from 'renderer/shared/utils/General';
import LoopIcon from '@mui/icons-material/Loop';
import { useState } from 'react';
import { ResourcesSearch } from '../file/ResourcesSearch';

interface IProps {
    variable: EntityVariable;
    variableValue: any;
    onVariableValueChange: (value: any) => void;
    options?: EntityFilterOptions;
}

export function VariableValueInput({ variable, variableValue, onVariableValueChange, options }: IProps) {
    const { t } = useTranslation();
    const theme = useTheme();

    const [alternativeInput, setInputType] = useState<boolean>(false);

    const getInputOfVariableType = (type: VariableType): JSX.Element | null => {
        switch (type) {
            case VariableType.ENUMERATOR_LIST:
            case VariableType.ENUMERATOR:
                return (
                    <FormControl fullWidth sx={{ minWidth: '300px' }}>
                        <InputLabel>{t('interface.editor.modifier.input_label_value_change')}</InputLabel>
                        <Select
                            value={variableValue || ''}
                            label={t('interface.editor.modifier.input_label_value_change')}
                            onChange={(e) => onVariableValueChange(e.target.value)}
                        >
                            {variable.options.map((option, index) => (
                                <MenuItem key={`entity_var_${index}`} value={option}>
                                    {t(option)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case VariableType.PERCENTAGE_OR_MULTIPLIER:
            case VariableType.NUMBER:
                return (
                    <TextField
                        fullWidth
                        sx={{ minWidth: '200px' }}
                        value={variableValue || ''}
                        label={t('interface.editor.modifier.input_label_value_change')}
                        type="number"
                        onChange={(e) => onVariableValueChange(e.target.value)}
                    />
                );
            case VariableType.TEXT:
                return (
                    <TextField
                        fullWidth
                        sx={{ minWidth: '200px' }}
                        value={variableValue || ''}
                        label={t('interface.editor.modifier.input_label_value_change')}
                        onChange={(e) => onVariableValueChange(e.target.value)}
                    />
                );
            case VariableType.DATE:
                return (
                    <>
                        {alternativeInput ? (
                            <TextField
                                fullWidth
                                sx={{ minWidth: '200px' }}
                                value={variableValue || ''}
                                label={t('interface.editor.modifier.input_label_value_change')}
                                placeholder={t('interface.editor.modifier.input_placeholder_period')}
                                onChange={(e) => onVariableValueChange(e.target.value)}
                            />
                        ) : (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label={t('interface.editor.condition.time_datepicker_label')}
                                    mask="__/__/____"
                                    onError={(reason: any) => console.error('*** VariableValueInput Error on Datepicker: ', reason)}
                                    value={new Date(variableValue || '01/01/0001')}
                                    onChange={(e: any) => onVariableValueChange(e.toISOString())}
                                    renderInput={(params: any) => <TextField {...params} sx={{ minWidth: '300px' }} />}
                                />
                            </LocalizationProvider>
                        )}
                        <IconButton
                            onClick={() => {
                                setInputType(!alternativeInput);
                                onVariableValueChange('');
                            }}
                        >
                            <LoopIcon />
                        </IconButton>
                    </>
                );
            case VariableType.EXTERNAL_KEY:
            case VariableType.EXTERNAL_KEY_LIST:
                return (
                    <Autocomplete
                        fullWidth
                        freeSolo
                        sx={{ minWidth: '200px' }}
                        options={getSuggestionsForAutocompleteOfEntity(variable.externalEntity)}
                        renderInput={(params) => <TextField {...params} label={t(variable.externalEntity)} />}
                    />
                );
            case VariableType.BOOLEAN:
                return (
                    <FormControlLabel
                        sx={{ color: theme.palette.text.primary }}
                        control={<Checkbox checked={variableValue || false} onChange={(e) => onVariableValueChange(e.target.checked)} />}
                        label={t(variable.displayName)}
                    />
                );
            case VariableType.FILE_PATH:
                return <ResourcesSearch onResourceSelected={(fileName, filePath, path) => onVariableValueChange(path)} rootFolder={[]} />;
        }
    };

    const getSuggestionsForAutocompleteOfEntity = (entity: EntityType): any[] => {
        const allEntities = GetEntitiesOfEntity(entity);

        if (options && options.specifiedEntities && options.specifiedEntities[entity]) {
            allEntities.push(...options.specifiedEntities[entity]);
        }

        return allEntities.map((singularEntity) => ({ label: singularEntity.displayName, id: singularEntity.id, data: singularEntity }));
    };

    return getInputOfVariableType(variable.type);
}
