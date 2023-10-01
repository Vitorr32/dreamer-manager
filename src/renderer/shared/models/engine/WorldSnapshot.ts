import { Character } from '../base/Character.model';
import { World } from '../base/World.model';

/**
 * The World Snapshot is a class used to get contextual information for conditions checking and
 * effect applicability.
 */
export class WorldSnapshot {
    activeCharacter: Character[];

    passiveCharacter: Character[];

    worldState: World;

    constructor(activeCharacter: Character[], passiveCharacter: Character[], world: World) {
        this.activeCharacter = activeCharacter;
        this.passiveCharacter = passiveCharacter;

        this.worldState = world;
    }
}
