import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityVariable, Variables } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';

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

    return (
        <FormControl fullWidth>
            <InputLabel>{t('interface.editor.modifier.input_label_variable')}</InputLabel>
            <Select value={entityVariableKey} label={t('interface.editor.modifier.input_label_variable')} onChange={(e) => onVariableChange(entityVariables[e.target.value])}>
                {entityVariables &&
                    Object.keys(entityVariables).map((variableID) => (
                        <MenuItem key={variableID} value={variableID}>
                            {t(entityVariables[variableID].displayName)}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}
