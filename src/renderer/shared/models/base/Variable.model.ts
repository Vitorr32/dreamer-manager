import { Entity } from '../enums/Entities.enum';
import { Attribute } from './Attribute.model';

export enum VariableType {
    TEXT,
    NUMBER,
    PERCENTAGE_OR_MULTIPLIER,
    ENUMERATOR,
    ENUMERATOR_LIST,
    DATE,
    FILE_PATH,
    EXTERNAL_KEY,
    EXTERNAL_KEY_LIST,
    BOOLEAN,
}

export enum VariableOperator {
    NONE = 'model.undefined',
    BIGGER_THAN = 'model.variable.operator.bigger_than',
    EQUAL_OR_BIGGER_THAN = 'model.variable.operator.equal_or_bigger_than',
    SMALLER_THAN = 'model.variable.operator.lesser_than',
    EQUAL_OR_SMALLER_THAN = 'model.variable.operator.equal_or_lesser_than',
    EQUALS_TO = 'model.variable.operator.equals_to',
    NOT_EQUALS_TO = 'model.variable.operator.dont_equals_to',
    CONTAINS = 'model.variable.operator.contains',
    DONT_CONTAINS = 'model.variable.operator.dont_contain',
    STARTS_WITH = 'model.variable.operator.starts_with',

    //Edit Operators, that are used when creating modifiers.
    CHANGE_BY = 'model.variable.operator.change_by',
    CHANGE_TO = 'model.variable.operator.change_to',
    INSERT_INTO_ARRAY = 'model.variable.operator.insert_into_array',
    REMOVE_FROM_ARRAY = 'model.variable.operator.remove_from_array',
}

export interface EntityVariable {
    // Key of the variable on the entity
    key: string;
    // User-friendly variable name
    displayName: string;
    // The type defines what operations and values are accepted to the variable.
    type: VariableType;
    //Group this variable for easier searching on Autocomplete, Optional
    groupBy?: string;
    // If it is a variable with type External Key or External List, it means it points to another entity, like the external key of a SQL table.
    // It should also contains which entity is the external key pointing to.
    externalEntity?: Entity;
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

//TODO: How to make the custom variable to be dynamically added to the game trough mod import?
export interface CustomVariables extends Variables {}
