import { ConditionSelector } from "../models/enums/ConditionSelector.enum";

export function StringfySelectorOptions(): string[] {
    return Object.keys(ConditionSelector).map(key => {
        return key;
    })
}