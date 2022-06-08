export enum RelationshipAttribute {
    UNDEFINED = 'model.undefined',

    FAVOR = 'model.relationship.variable.favor',
    LOVE = 'model.relationship.variable.love',
    POWER = 'model.relationship.variable.power',
    ATTRACTION = 'model.relationship.variable.attraction',
    RESPECT = 'model.relationship.variable.respect',
}

// Relationship should not have a model, it's better to have each character have a relationshipModifier array and calculate it dynamically.
