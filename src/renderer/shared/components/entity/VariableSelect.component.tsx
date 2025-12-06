import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityVariable, Variables } from 'renderer/shared/models/base/Variable.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { GetVariablesOfEntity } from 'renderer/shared/utils/EntityHelpers';

interface IProps {
    entity: EntityType;
    entityVariableKey: string;
    onVariableChange: (variable: EntityVariable) => void;
}

export function VariableSelect({ entity, entityVariableKey, onVariableChange }: IProps) {
    const { t } = useTranslation();
    const [entityVariables, setEntityVariables] = useState<Variables>();

    useEffect(() => {
        console.log('Entity changed in VariableSelect:', entity);
        setEntityVariables(GetVariablesOfEntity(entity));
    }, [entity]);

    return (
        <FormControl fullWidth>
            <InputLabel>{t('interface.editor.modifier.input_label_variable')}</InputLabel>
            <Select value={entityVariableKey} label={t('interface.editor.modifier.input_label_variable')} onChange={(e) => onVariableChange(entityVariables[e.target.value])}>
                {Object.keys(entityVariables).map((variableID) => (
                    <MenuItem key={variableID} value={variableID}>
                        {t(entityVariables[variableID].displayName)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
