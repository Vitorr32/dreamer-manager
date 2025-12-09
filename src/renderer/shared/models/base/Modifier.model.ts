import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';
import { EntityFilterTree } from './EntityFilterTree.model';
import { EntityVariableValue } from '../interfaces/EntityVariableValue.interface';
import { EntityType } from '../enums/Entities.enum';

export class Modifier {
    // The variables and their values that will be modified on the target entity
    public modifiedEntityVariables: EntityVariableValue;

    // An filter to determine which entities will be affected by this modifier
    public targetEntityFilter: EntityFilterTree;

    // The origin of this modifier, could be an event ID, trait ID, flag ID, etc.
    public origin?: string;
    public originEnityType?: EntityType;

    constructor() {
        this.modifiedEntityVariables = DEFAULT_ENTITY_FILTER;
        this.targetEntityFilter = new EntityFilterTree();
    }
}
