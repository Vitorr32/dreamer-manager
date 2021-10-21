import { ConditionTree } from './ConditionTree';
import { Modifier } from './Modifier';

export enum Trigger {
    UNDEFINED,

    ALWAYS_ACTIVE,
    ON_INTERACTION_START,
    INTERACTION_END,
    DURING_INTERACTION,

    MAX_TRIGGERS,
}

export enum Duration {
    UNDEFINED,

    PERMANENT,
    SPECIFIC_DURATION,
    SPECIFIC_DATE,

    MAX_DURATIONS,
}

export enum Source {
    UNDEFINED,

    TRAIT,
    RACE,
    ITEM,

    MAX_SOURCES,
}

export class Effect {
    //Whetever this effect affect the holder of the effect or the target, if applicable, of the trigger
    public targetSelf: boolean;
    //Source is with item/trait/race is the source of the effect, used to associate the effect to parent
    public sourceType: Source;
    //Source ID, used to get the source of the effect
    public sourceID: string;
    //What trigger the check for this effect
    public trigger: Trigger;
    //What is the condition for the activation of this effect when the trigger is triggered, it also may always happen.
    public conditionTree: ConditionTree | undefined;
    //After the effect was activated, for how much time does it take effect?
    public durationType: Duration;
    public durationArgs: number[] | undefined;
    //What is the modifier that this effect cause
    public modifier: Modifier = new Modifier();

    constructor() {
        this.targetSelf = true;
        this.sourceType = Source.UNDEFINED;
        this.sourceID = '';
        this.trigger = Trigger.UNDEFINED;
        this.conditionTree = undefined;
        this.durationType = Duration.UNDEFINED;
        this.durationArgs = undefined;
        this.modifier = new Modifier();
    }
}
