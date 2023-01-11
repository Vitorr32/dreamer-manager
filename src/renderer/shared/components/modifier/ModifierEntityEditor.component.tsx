import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EntityVariable, VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from '../entity/EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
interface IProps {
    modifier: Modifier;
    onEntityChange: (entity: Entity) => void;
    onVariableChange: (key: 'variableKey' | 'value' | 'operator', value: any) => void;
    options?: EntityFilterOptions;
}

export function ModifierEntityEditor({ modifier, onEntityChange, onVariableChange }: IProps) {
    const { t } = useTranslation();

    return (
        <Box className="entity-editor">
            {/* ENTITY SELECT */}
            <EntitySelect entity={modifier.modifiedEntityVariable?.entity} onEntityChange={onEntityChange} />

            {/* VARIABLE SELECT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.entity && (
                <VariableSelect
                    entity={modifier.modifiedEntityVariable?.entity}
                    entityVariableKey={modifier.modifiedEntityVariable.variableKey}
                    onVariableChange={(variable: EntityVariable) => onVariableChange('variableKey', variable.key)}
                    isEditor
                />
            )}

            {/* OPERATOR SELECT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.variableKey && (
                <VariableValueOperator
                    variable={GetVariablesOfEntity(modifier.modifiedEntityVariable.entity)[modifier.modifiedEntityVariable.variableKey]}
                    variableOperator={modifier.modifiedEntityVariable.operator}
                    onOperatorChange={(operator: VariableOperator) => onVariableChange('operator', operator)}
                    isEditor
                />
            )}

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
