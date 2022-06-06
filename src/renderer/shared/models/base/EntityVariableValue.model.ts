import { Entity } from '../enums/Entities.enum';

export interface EntityVariableValue {
    entity: Entity;
    variableID: string;
    value: any;
}
