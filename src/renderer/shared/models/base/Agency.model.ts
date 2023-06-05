import { EntityBase } from './Entity.model';
import { Variables, VariableType } from './Variable.model';

export enum AgencyVariablesKey {
    ID = 'id',
}

export const AgencyEntityVariables: Variables = {
    id: { key: AgencyVariablesKey.ID, displayName: 'model.id', type: VariableType.TEXT, read: true, edit: false },
};

export class Agency extends EntityBase {
    static get _variables() {
        return AgencyEntityVariables;
    }

    id: string;
    treasury: number;
    //First number the amount, second the interest and third is the ID of the institution that lent the money.
    debt: [number, number, string][];
    buildings: string[];
}
