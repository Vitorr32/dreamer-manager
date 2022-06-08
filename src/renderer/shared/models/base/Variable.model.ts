import { Attribute } from './Attribute.model';

export enum VariableType {
    TEXT,
    NUMBER,
    ID_LIST,
    PERCENTAGE_OR_MULTIPLIER,
    ENUMERATOR,
    DATE,
}

export interface Variables {
    [key: string]: {
        // User-friendly variable name
        displayName: string;
        // The type defines what operations and values are accepted to the variable.
        type: VariableType;
        // If it is a variable with special characteristics(such as growth overtime, special calculations and so forth, set the associated object id)
        associatedID?: string;
        // If it is a variable with Enumerator values, here all the possible values should be set.
        options?: string[];
        // This variable should be visible on the editor?
        read: boolean;
        // This variable is editable trough modifiers?
        edit: boolean;
    };
}

//TODO: How to make the custom variable to be dynamically added to the game trough mod import?
export interface CustomVariables extends Variables {
    [key: string]: {
        displayName: string;
        type: VariableType;
        associatedID?: string;
        options?: string[];
        read: boolean;
        edit: boolean;
        customVariableData: Attribute;
    };
}
