import { EntityType } from '../enums/Entities.enum';
import { VariableType } from '../enums/VariableType';

export interface EntityVariable {
    // Key of the variable on the entity
    key: string;
    // User-friendly variable name
    displayName: string;
    // The type defines what operations and values are accepted to the variable.
    type: VariableType;
    // Group this variable for easier searching on Autocomplete, Optional
    groupBy?: string;
    // If it is a variable with type External Key or External List, it means it points to another entity, like the external key of a SQL table.
    // It should also contains which entity is the external key pointing to.
    externalEntity?: EntityType;
    // If it is a variable with Enumerator values, here all the possible values should be set.
    options?: string[];
    // If it is a number variable that has limits, what is the minimum and maximum values? otherwise any value can be set
    max?: number;
    min?: number;
    // This variable should be visible on the editor?
    read: boolean;
    // This variable is editable trough modifiers?
    edit: boolean;
}

export interface Variables {
    [key: string]: EntityVariable;
}

// TODO: How to make the custom variable to be dynamically added to the game trough mod import?
export type CustomVariables = Variables;
