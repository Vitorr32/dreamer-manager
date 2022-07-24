import { CustomVariables, Variables } from './Variable.model';

export class EntityBase {
    static get _variables() {
        return {};
    }
    //Custom variables should be added to the entity, and it's values should be saved on the customVariables property here.
    public customVariables: any;

    static getEntityVariables(): Variables {
        return this._variables;
    }

    static addCustomVariablesToEntity(customVariables: CustomVariables): void {
        Object.keys(customVariables).forEach((key) => {});
    }
}
