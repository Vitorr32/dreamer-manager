// public enum Trigger {
//     UNDEFINED,

//     ALWAYS_ACTIVE,
//     ON_INTERACTION_START,
//     INTERACTION_END,
//     DURING_INTERACTION,

//     MAX_TRIGGERS
// }

// [Serializable]
//     public struct Duration
// {
//     public enum Type {
//         UNDEFINED,

//         PERMANENT,
//         SPECIFIC_DURATION,
//         SPECIFIC_DATE,

//         MAX_DURATIONS
//     }

//         public Type type;
//         public int[] arguments;
// }

// public enum Source {
//     UNDEFINED,

//     TRAIT,
//     RACE,
//     ITEM,

//     MAX_SOURCES
// }

// export interface Effect {
//     //ID of the effect on the list of ids
//     public id: string;
//     //Whetever this effect affect the holder of the effect or the target, if applicable, of the trigger
//     public bool targetSelf = true;
//     //Source is with item/trait/race is the source of the effect, used to associate the effect to parent
//     public Source sourceType;
//     //Source ID, used to get the source of the effect
//     public string sourceID;
//     //What trigger the check for this effect
//     public Trigger trigger = Trigger.UNDEFINED;
//     //What is the condition for the activation of this effect when the trigger is triggered.
//     public ConditionTree conditionTree;
//     //After the effect was activatd, for how much time does it take effect?
//     public Duration duration;
//     //What is the modifier that this effect cause
//     // public Modifier modifier = new Modifier();
// }

export {}