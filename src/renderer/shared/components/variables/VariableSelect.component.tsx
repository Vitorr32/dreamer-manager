import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityVariable, Variables } from 'renderer/shared/models/base/Variable.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { GetVariablesOfEntity } from 'renderer/shared/utils/EntityHelpers';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    entity: EntityType;
    entityVariableKey: string;
    onVariableChange: (variable: EntityVariable) => void;
    isEditor?: boolean;
}
interface SuggestionObject {
    label: string;
    value: string;
    data: EntityVariable;
    group: string;
}

export function VariableSelect({ entity, entityVariableKey, onVariableChange, isEditor = false }: IProps) {
    const { t } = useTranslation();

    const [entityVariables, setEntityVariables] = useState<Variables>();
    const [suggestions, setSuggestions] = useState<SuggestionObject[]>();

    useEffect(() => {
        if (entity) {
            setEntityVariables(GetVariablesOfEntity(entity));
        } else {
            setEntityVariables(null);
        }
    }, [entity]);

    useEffect(() => {
        const getVariablesOfEntityAsSuggestions = (): SuggestionObject[] => {
            return entityVariables
                ? Object.keys(entityVariables)
                      .map((variableID) => {
                          return {
                              label: entityVariables[variableID].displayName,
                              value: entityVariables[variableID].key,
                              data: entityVariables[variableID],
                              group: entityVariables[variableID].groupBy ? entityVariables[variableID].groupBy : '',
                          };
                      })
                      .filter((variable) => {
                          return isEditor ? variable.data.edit : true;
                      })
                      .sort((a, b) => (a.group !== b.group ? 1 : -1))
                : [];
        };

        if (entityVariables) {
            setSuggestions(getVariablesOfEntityAsSuggestions());
        } else {
            setSuggestions(null);
        }
    }, [entityVariables, isEditor]);

    return (
        entityVariables &&
        suggestions && (
            <Autocomplete
                fullWidth
                value={suggestions.find((suggestion) => suggestion.value === entityVariableKey) || null}
                sx={{ minWidth: '300px' }}
                options={suggestions}
                groupBy={(option) => t(option.group)}
                onChange={(_, option: any) => onVariableChange(entityVariables[option.value])}
                renderInput={(params) => <TextField {...params} value={entityVariableKey} label={t('interface.editor.modifier.input_label_variable')} />}
                renderOption={(props, option) => (
                    <li {...props} key={`autocomplete_option_${uuidv4()}`}>
                        {t(option.label)}
                    </li>
                )}
                getOptionLabel={(option) => t(typeof option === 'string' ? option : t(option.label))}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
            />
        )
    );
}
