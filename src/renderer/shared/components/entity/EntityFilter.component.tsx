import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { EntityVariable, VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EntitySelect } from './EntitySelect.component';
import { VariableSelect } from './VariableSelect.component';
import { VariableValueInput } from './VariableValueInput.component';
import { VariableValueOperator } from './VariableValueOperator.component';

interface IProps {
    entity: Entity;
    onEntityChange: (entity: Entity) => void;
    variable: EntityVariable;
    onVariableChange: (variable: EntityVariable) => void;
    operator: VariableOperator;
    onOperatorChange: (operator: VariableOperator) => void;
    value: any;
    onValueChange: (value: any) => void;
}

export function EntityFilter({ entity, onEntityChange, variable, onVariableChange, operator, onOperatorChange, value, onValueChange }: IProps) {
    const { t } = useTranslation();

    return (
        <Box className="">
            {/* ENTITY SELECT */}
            <EntitySelect entity={entity} onEntityChange={onEntityChange} />

            {/* VARIABLE SELECT */}
            {entity !== Entity.NONE && <VariableSelect entity={entity} entityVariableKey={variable.key} onVariableChange={onVariableChange} />}

            {/* OPERATOR SELECT */}
            {variable && <VariableValueOperator variable={variable} variableOperator={operator} onOperatorChange={onOperatorChange} />}

            {/* VARIABLE INPUT */}
            {variable && <VariableValueInput variable={variable} variableValue={value} onVariableValueChange={onValueChange} />}
        </Box>
    );
}
