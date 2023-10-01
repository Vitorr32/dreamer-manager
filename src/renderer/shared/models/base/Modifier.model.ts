import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilterTree } from './EntityFilterTree.model';
import { EntityVariableValue } from '../interfaces/EntityVariableValue.interface';

export class Modifier {
    public modifiedEntityVariables: EntityVariableValue;

    public targetEntityFilter?: EntityFilterTree;

    public originEntityFilter?: EntityFilterTree;

    constructor() {
        this.modifiedEntityVariables = DEFAULT_ENTITY_FILTER;
    }
}
