import { EntityType } from '../enums/Entities.enum';
import { EntityFilterTree } from './EntityFilterTree.model';
import { EntityVariableValue } from './EntityVariableValue.model';
import { VariableOperator } from './Variable.model';
export class Modifier {
    public modifiedEntityVariable: EntityVariableValue;
    public targetEntityFilter: EntityFilterTree;
    public originEntityFilter?: EntityFilterTree;

    constructor() {
        this.modifiedEntityVariable = {
            entityType: null,
            operator: VariableOperator.CHANGE_BY,
            value: '',
            variableKey: '',
        };
        this.targetEntityFilter = new EntityFilterTree();
    }
}
