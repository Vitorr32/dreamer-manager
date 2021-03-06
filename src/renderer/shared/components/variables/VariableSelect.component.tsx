import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Relationship } from 'renderer/shared/models/base/Relationship.model';
import { EntityVariable, Variables } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    entity: Entity;
    entityVariableKey: string;
    onVariableChange: (variable: EntityVariable) => void;
}

export function VariableSelect({ entity, entityVariableKey, onVariableChange }: IProps) {
    const { t } = useTranslation();
    const [entityVariables, setEntityVariables] = useState<Variables>();

    useEffect(() => {
        if (entity && entity !== Entity.NONE) {
            setEntityVariables(GetVariablesOfEntity(entity));
        } else {
            setEntityVariables(null);
        }
    }, [entity]);

    const getVariablesOfEntityAsSuggestions = (): any[] => {
        return entityVariables
            ? Object.keys(entityVariables).map((variableID) => {
                  return {
                      label: t(entityVariables[variableID].displayName),
                      value: t(entityVariables[variableID].key),
                      data: entityVariables[variableID],
                  };
              })
            : [];
    };

    return entityVariableKey && !entityVariables ? null : (
        <Autocomplete
            fullWidth
            options={getVariablesOfEntityAsSuggestions()}
            onChange={(_, option: any) => onVariableChange(entityVariables[option.value])}
            renderInput={(params) => <TextField {...params} value={entityVariableKey} label={t('interface.editor.modifier.input_label_variable')} />}
            renderOption={(props, option) => (
                <li {...props} key={`autocomplete_option_${uuidv4()}`}>
                    {t(option.label)}
                </li>
            )}
            isOptionEqualToValue={(option, value) => option.value === value.value}
        />
    );
}
