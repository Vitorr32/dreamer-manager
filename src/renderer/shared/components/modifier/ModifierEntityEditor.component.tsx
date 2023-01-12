import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EntityVariable, VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntitySelect } from '../entity/EntitySelect.component';
import { VariableSelect } from '../variables/VariableSelect.component';
import { VariableValueInput } from '../variables/VariableValueInput.component';
import { VariableValueOperator } from '../variables/VariableValueOperator.component';
interface IProps {
    modifier: Modifier;
    onEntityChange: (entity: EntityType) => void;
    onVariableChange: (key: 'variableKey' | 'value' | 'operator', value: any) => void;
    options?: EntityFilterOptions;
}

export function ModifierEntityEditor({ modifier, onEntityChange, onVariableChange }: IProps) {
    const { t } = useTranslation();

    return (
        <Box className="entity-editor">
            {/* ENTITY SELECT */}
            <EntitySelect entity={modifier.modifiedEntityVariable?.entityType} onEntityChange={onEntityChange} />

            {/* VARIABLE SELECT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.entityType && (
                <VariableSelect
                    entity={modifier.modifiedEntityVariable?.entityType}
                    entityVariableKey={modifier.modifiedEntityVariable.variableKey}
                    onVariableChange={(variable: EntityVariable) => onVariableChange('variableKey', variable.key)}
                    isEditor
                />
            )}

            {/* OPERATOR SELECT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.variableKey && (
                <VariableValueOperator
                    variable={GetVariablesOfEntity(modifier.modifiedEntityVariable.entityType)[modifier.modifiedEntityVariable.variableKey]}
                    variableOperator={modifier.modifiedEntityVariable.operator}
                    onOperatorChange={(operator: VariableOperator) => onVariableChange('operator', operator)}
                    isEditor
                />
            )}

            {/* VARIABLE INPUT */}
            {modifier.modifiedEntityVariable && modifier.modifiedEntityVariable.variableKey && (
                <VariableValueInput
                    variable={GetVariablesOfEntity(modifier.modifiedEntityVariable.entityType)[modifier.modifiedEntityVariable.variableKey]}
                    variableValue={modifier.modifiedEntityVariable.value}
                    onVariableValueChange={(value: any) => onVariableChange('value', value)}
                />
            )}
        </Box>
    );
}
