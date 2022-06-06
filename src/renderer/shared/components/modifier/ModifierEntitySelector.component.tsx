import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { Variables, VariableType } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { DATE_ONLY_DAY_FORMAT } from 'renderer/shared/Constants';

interface IProps {
    modifier: Modifier;
    onEntityChange: (entity: Entity) => void;
    onVariableChange: (key: 'variableID' | 'value', value: any) => void;
    options?: EffectEditorOptions;
}

export function ModifierEntitySelector({ modifier, onEntityChange, onVariableChange }: IProps) {
    const { t } = useTranslation();

    const [entityVariables, setEntityVariables] = useState<Variables>();

    const onEntitySelectChange = (entity: Entity): void => {
        setEntityVariables(GetVariablesOfEntity(entity));
        onEntityChange(entity);
    };

    const getInputOfVariableType = (type: VariableType, ID: string): JSX.Element | null => {
        switch (type) {
            case VariableType.ENUMERATOR:
                return (
                    <FormControl fullWidth>
                        <InputLabel>{t('interface.editor.modifier.input_label_value_change')}</InputLabel>
                        <Select
                            value={modifier.modifiedEntityVariable.value}
                            label={t('interface.editor.modifier.input_label_value_change')}
                            onChange={(e) => onVariableChange('value', e.target.value)}
                        >
                            {entityVariables[ID].options.map((option) => (
                                <MenuItem value={option}>{t(option)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case VariableType.PERCENTAGE_OR_MULTIPLIER:
            case VariableType.NUMBER:
                return (
                    <TextField
                        value={modifier.modifiedEntityVariable.value}
                        label={t('interface.editor.modifier.input_label_value_change')}
                        type="number"
                        onChange={(e) => onVariableChange('value', e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                );
            case VariableType.TEXT:
                return (
                    <TextField
                        value={modifier.modifiedEntityVariable.value}
                        label={t('interface.editor.modifier.input_label_value_change')}
                        onChange={(e) => onVariableChange('value', e.target.value)}
                    />
                );
            case VariableType.DATE:
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label={t('interface.editor.condition.time_datepicker_label')}
                            mask="__/__/____"
                            onError={(reason) => console.log(reason)}
                            inputFormat={DATE_ONLY_DAY_FORMAT}
                            value={new Date(modifier.modifiedEntityVariable.value || '01/01/0001')}
                            onChange={(e) => onVariableChange('value', e.toDateString())}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                );
            default:
                return null;
        }
    };

    return (
        <Box>
            {/* ENTITY SELECT */}
            <FormControl fullWidth>
                <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
                <Select
                    value={modifier.modifiedEntityVariable?.entity || Entity.NONE}
                    label={t('interface.editor.modifier.input_label_entity')}
                    onChange={(e) => onEntitySelectChange(e.target.value as Entity)}
                >
                    {Object.values(Entity).map((entity) => (
                        <MenuItem value={entity}>{t(entity)}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* VARIABLE SELECT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.entity !== Entity.NONE && (
                <FormControl fullWidth>
                    <InputLabel>{t('interface.editor.modifier.input_label_variable')}</InputLabel>
                    <Select
                        value={modifier.modifiedEntityVariable.variableID}
                        label={t('interface.editor.modifier.input_label_variable')}
                        onChange={(e) => onVariableChange('variableID', e.target.value)}
                    >
                        {Object.keys(entityVariables).map((variable) => {
                            //Check if the variable is editable
                            if (entityVariables[variable].edit) {
                                return <MenuItem value={variable}>{t(entityVariables[variable].displayName)}</MenuItem>;
                            }

                            return null;
                        })}
                    </Select>
                </FormControl>
            )}

            {/* VARIABLE INPUT */}
            {modifier.modifiedEntityVariable &&
                modifier.modifiedEntityVariable.variableID &&
                getInputOfVariableType(entityVariables[modifier.modifiedEntityVariable.variableID].type, modifier.modifiedEntityVariable.variableID)}
        </Box>
    );
}
