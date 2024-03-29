import { v4 as uuidv4 } from 'uuid';
import { EntityBase } from './Entity.model';
import { EntityFilterTree } from './EntityFilterTree.model';
import { RelationshipParameter } from './Relationship.model';

export class RelationshipModifier extends EntityBase {
    static get variables() {
        return {};
    }

    id: string;

    originCharacter: string;

    receptorCharacters: EntityFilterTree;

    // bothWays: If the value of the modifier should be applied on both relationship parameters of the origin and receptors
    bothWays: boolean;

    // inverse: If the value of the modifier should be applied inverted on the receptor character, so if the modifier is positive for the origin character, it's negative on the receptor
    inverse: boolean;

    displayName: string;

    // If no inverse display name, use the normal display name
    inverseDisplayName: string;

    // If this value will never decay with time
    permanent: boolean;

    // How much this modifier decays every month, once it hits 0 it will be removed from the game state
    monthlyDecay: number;

    // Which relationship parameter is being modified
    type: RelationshipParameter;

    // The actual value that this modified will apply to the parameter
    value: number;

    constructor(originActorID: string) {
        super();

        this.id = `rm_${uuidv4()}`;
        this.originCharacter = originActorID || '';
    }
}
