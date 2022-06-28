import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EntityVariable } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from '../entity/EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
interface IProps {
    modifier: Modifier;
    onEntityChange: (entity: Entity) => void;
    onVariableChange: (key: 'variableKey' | 'value', value: any) => void;
    options?: EffectEditorOptions;
}

export function ModifierEntityEditor({ modifier, onEntityChange, onVariableChange }: IProps) {
    const { t } = useTranslation();

    return (
        <Box>
            {/* ENTITY SELECT */}
            <EntitySelect entity={modifier.modifiedEntityVariable?.entity} onEntityChange={onEntityChange} />

            {/* VARIABLE SELECT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.entity && modifier.modifiedEntityVariable.entity !== Entity.NONE && <VariableSelect
                entity={modifier.modifiedEntityVariable?.entity}
                entityVariableKey={modifier.modifiedEntityVariable.variableKey}
                onVariableChange={(variable: EntityVariable) => onVariableChange('variableKey', variable.key)}
            />}

            {/* VARIABLE INPUT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.variableKey && (
                <VariableValueInput
                    variable={GetVariablesOfEntity(modifier.modifiedEntityVariable.entity)[modifier.modifiedEntityVariable.variableKey]}
                    variableValue={modifier.modifiedEntityVariable.value}
                    onVariableValueChange={(value: any) => onVariableChange('value', value)}
                />
            )}
        </Box>
    );
}
