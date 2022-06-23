import { Variables } from 'electron-log';

export class Entity {
    private static _variables: Variables;

    static getEntityVariables(): Variables {
        return this._variables;
    }
}
