import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariable, VariableType } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { GetEntitiesOfEntity } from 'renderer/shared/utils/General';

interface IProps {
    variable: EntityVariable;
    variableValue: any;
    onVariableValueChange: (value: any) => void;
    options?: EffectEditorOptions;
}

export function VariableValueInput({ variable, variableValue, onVariableValueChange, options }: IProps) {
    const { t } = useTranslation();
    const theme = useTheme();

    const getInputOfVariableType = (type: VariableType): JSX.Element | null => {
        switch (type) {
            case VariableType.ENUMERATOR_LIST:
            case VariableType.ENUMERATOR:
                return (
                    <FormControl fullWidth>
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
                        value={variableValue || ''}
                        label={t('interface.editor.modifier.input_label_value_change')}
                        onChange={(e) => onVariableValueChange(e.target.value)}
                    />
                );
            case VariableType.DATE:
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            fullWidth
                            label={t('interface.editor.condition.time_datepicker_label')}
                            mask="__/__/____"
                            onError={(reason: any) => console.error('*** VariableValueInput Error on Datepicker: ', reason)}
                            value={new Date(variableValue || '01/01/0001')}
                            onChange={(e: any) => onVariableValueChange(e.toDateString())}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                );
            case VariableType.EXTERNAL_KEY:
            case VariableType.EXTERNAL_KEY_LIST:
                return (
                    <Autocomplete
                        fullWidth
                        freeSolo
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
                return <>{/* <ResourcesSearch onResourceSelected={onBackgroundSelected} rootFolder={[IMAGES_FOLDER, ]} /> */}</>;
        }
    };

    const getSuggestionsForAutocompleteOfEntity = (entity: Entity): any[] => {
        const allEntities = GetEntitiesOfEntity(entity);

        if (options && options.specifiedEntities && options.specifiedEntities[entity]) {
            allEntities.push(...options.specifiedEntities[entity]);
        }

        return allEntities.map((singularEntity) => ({ label: singularEntity.displayName, id: singularEntity.id, data: singularEntity }));
    };

    return getInputOfVariableType(variable.type);
}
