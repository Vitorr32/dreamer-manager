import { Package } from '../files/Package.model';
import { CustomVariables, Variables } from './Variable.model';

export class EntityBase {
    static get _variables() {
        return {};
    }
    //Custom variables should be added to the entity, and it's values should be saved on the customVariables property here.
    public customVariables: any;
    //Information about the entity file of origin, when the entity is edited or deleted, it will target the file specified in this variable.
    public metadata: {
        file?: {
            path: string[];
            name: string;
            packageName: string;
            packageID: string;
        };
    } = {};

    static getEntityVariables(): Variables {
        return this._variables;
    }

    static addCustomVariablesToEntity(customVariables: CustomVariables): void {
        Object.keys(customVariables).forEach((key) => {});
    }

    public setFileMetadata(path: string[], name: string, targetPackage: Package) {
        this.metadata.file = {
            path,
            name,
            packageName: targetPackage.name,
            packageID: targetPackage.id,
        };
    }
}
