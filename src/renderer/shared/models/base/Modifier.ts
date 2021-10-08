export enum ModifierType {
    UNDEFINED,

    MODIFY_ATTRIBUTE_VALUE,
    MODIFY_POTENTIAL_VALUE,
    MODIFY_RELATIONSHIP_VALUE,
    MODIFY_PASSIVE_ABSOLUTE_VALUE,
    MODIFY_PASSIVE_RELATIVE_VALUE,

    MAX_MODIFIERS,
}
export class Modifier {
    public type: ModifierType = ModifierType.UNDEFINED;

    public modifierTargets: number[] = [];
    public effectiveChange: number = 0;
    public targetSelf: boolean = true;

    constructor() {}
}
