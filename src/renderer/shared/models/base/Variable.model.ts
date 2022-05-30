export enum VariableType {
    TEXT,
    NUMBER,
    PERCENTAGE_OR_MULTIPLIER,
    ENUMERATOR,
    DATE,
}

export interface Variable {
    [key: string]: { type: VariableType; options?: string[]; read: boolean; edit: boolean };
}
