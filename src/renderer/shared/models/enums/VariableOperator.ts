export enum VariableOperator {
    NONE = 'model.undefined',
    // Filter for Numbers/Floats
    BIGGER_THAN = 'model.variable.operator.bigger_than',
    EQUAL_OR_BIGGER_THAN = 'model.variable.operator.equal_or_bigger_than',
    LESS_THAN = 'model.variable.operator.lesser_than',
    EQUAL_OR_LESS_THAN = 'model.variable.operator.equal_or_lesser_than',
    EQUALS_TO = 'model.variable.operator.equals_to',
    NOT_EQUALS_TO = 'model.variable.operator.not_equals_to',

    // Filter for Arrays or Strings
    STARTS_WITH = 'model.variable.operator.starts_with',
    ENDS_WITH = 'model.variable.operator.ends_with',
    CONTAINS = 'model.variable.operator.contains',
    NOT_CONTAINS = 'model.variable.operator.not_contain',
    IS_EMPTY = 'model.variable.operator.is_empty',
    IS_NOT_EMPTY = 'model.variable.operator.is_not_empty',

    // Edit Operators, that are used when creating modifiers.
    CHANGE_BY = 'model.variable.operator.change_by',
    CHANGE_TO = 'model.variable.operator.change_to',
    INSERT_INTO_ARRAY = 'model.variable.operator.insert_into_array',
    REMOVE_FROM_ARRAY = 'model.variable.operator.remove_from_array',
}
