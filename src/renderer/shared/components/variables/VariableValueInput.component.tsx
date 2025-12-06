import { v4 as uuidv4 } from 'uuid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { GetEntitiesOfType } from 'renderer/shared/utils/DatabaseOperations';
import LoopIcon from '@mui/icons-material/Loop';
import { useState } from 'react';
import { VariableType } from 'renderer/shared/models/enums/VariableType';
import { ResourcesSearch } from '../file/ResourcesSearch';

interface IProps {
    variable: EntityVariable;
    variableValue: any;
    onVariableValueChange: (value: any) => void;
    isEditor: boolean;
    options?: EntityFilterOptions;
}

export function VariableValueInput({ variable, variableValue, onVariableValueChange, isEditor, options }: IProps) {
    const { t } = useTranslation();
    const theme = useTheme();

    const [alternativeInput, setInputType] = useState<boolean>(false);

    const getSuggestionsForAutocompleteOfEntity = (entity: EntityType): any[] => {
        const allEntities = GetEntitiesOfType(entity);

        if (options && options.specifiedEntities && options.specifiedEntities[entity]) {
            allEntities.push(...options.specifiedEntities[entity].map((specifiedEntity) => specifiedEntity.data));
        }

        return allEntities.map((singularEntity) => ({ label: singularEntity.id, id: singularEntity.id, data: singularEntity }));
    };

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
                            {variable.options.map((option) => (
                                <MenuItem key={`entity_var_${uuidv4()}`} value={option}>
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
                            <DesktopDatePicker
                                label={t('interface.editor.condition.time_datepicker_label')}
                                onError={(reason: any) => console.error('*** VariableValueInput Error on Datepicker: ', reason)}
                                value={new Date(variableValue || '01/01/0001')}
                                onChange={(e: any) => onVariableValueChange(e.toISOString())}
                            />
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
                        value={variableValue}
                        sx={{ minWidth: '200px' }}
                        options={getSuggestionsForAutocompleteOfEntity(variable.externalEntity)}
                        renderInput={(params) => <TextField {...params} label={t(variable.externalEntity)} />}
                        getOptionLabel={(option) => t(option)}
                        isOptionEqualToValue={(option, value) => option.id === value}
                        onChange={(_, option: any) => onVariableValueChange(option.id)}
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
            default:
                console.error(`Unknown variable type ${type}`);
                return null;
        }
    };

    return getInputOfVariableType(variable.type);
}
