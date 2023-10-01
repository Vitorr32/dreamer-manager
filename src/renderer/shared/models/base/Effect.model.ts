import { EntityType } from '../enums/Entities.enum';
import { EntityFilterTree } from './EntityFilterTree.model';
import { Modifier } from './Modifier.model';
import { Period } from '../enums/Period.enum';
import { Trigger } from '../enums/Trigger.enum';

export class Effect {
    // Source is with item/trait/race is the source of the effect, used to associate the effect to parent
    public source: { id: string; type: EntityType };

    // What trigger the check for this effect
    public trigger: Trigger;

    // What is the condition for the activation of this effect when the trigger is triggered, it also may always happen.
    public conditionTree: EntityFilterTree;

    // After the effect was activated, for how much time does it take effect?
    public periodType: Period;

    // Depending on the effect period type, the value of the periodValue may be a specific date(01/01/2023 on UTC time), a duration string (2w 3d 4h)
    // or a from/to string array ['01/01/2023', '30/01/2023']
    public periodValue: any;

    // What is the modifiers that this effect cause on entities of the game
    public modifiers: Modifier[];

    constructor(sourceID: string, sourceType: EntityType) {
        this.source = {
            id: sourceID,
            type: sourceType,
        };
        this.modifiers = [new Modifier()];
    }
}
