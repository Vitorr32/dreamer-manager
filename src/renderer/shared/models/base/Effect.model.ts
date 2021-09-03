import { ConditionTree } from "./ConditionTree";
import { Modifier } from "./Modifier";

export enum Trigger {
    UNDEFINED,

    ALWAYS_ACTIVE,
    ON_INTERACTION_START,
    INTERACTION_END,
    DURING_INTERACTION,

    MAX_TRIGGERS
}

export enum Duration {
    UNDEFINED,

    PERMANENT,
    SPECIFIC_DURATION,
    SPECIFIC_DATE,

    MAX_DURATIONS
}

export enum Source {
    UNDEFINED,

    TRAIT,
    RACE,
    ITEM,

    MAX_SOURCES
}

export class Effect {
    //ID of the effect on the list of ids
    public id?: string
    //Whetever this effect affect the holder of the effect or the target, if applicable, of the trigger
    public targetSelf?: boolean = true
    //Source is with item/trait/race is the source of the effect, used to associate the effect to parent
    public sourceType?: Source
    //Source ID, used to get the source of the effect
    public sourceID?: string
    //What trigger the check for this effect
    public trigger?: Trigger
    //What is the condition for the activation of this effect when the trigger is triggered.
    public conditionTree?: ConditionTree
    //After the effect was activatd, for how much time does it take effect?
    public durationType?: Duration
    public durationArgs?: number[]
    //What is the modifier that this effect cause
    public modifier?: Modifier = new Modifier();
}