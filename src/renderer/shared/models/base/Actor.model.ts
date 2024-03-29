import { v4 as uuidv4 } from 'uuid';
import { EntityType } from '../enums/Entities.enum';
import { VariableType } from '../enums/VariableType';
import { EntityBase } from './Entity.model';
import { EntityFilterTree } from './EntityFilterTree.model';
import { Variables } from './Variable.model';

export enum ActorType {
    PLAYER_CHARACTER = 'interface.editor.event.casting_player',
    GENERIC_TYPE = 'interface.editor.event.casting_is_generic',
    DYNAMIC_TYPE = 'interface.editor.event.casting_is_dynamic',
    SPECIFIC_TYPE = 'interface.editor.event.casting_is_specific',
}

export enum ActorVariablesKey {
    ID = 'id',
    ALIAS = 'alias',
    ACTOR_TYPE = 'actorType',
    CHARACTER_ID = 'characterID',
    SPRITE_PATH = 'spriteFilePath',
}

export const ActorEntityVariables: Variables = {
    [ActorVariablesKey.ID]: { key: ActorVariablesKey.ID, displayName: 'model.actor.variables.id', type: VariableType.TEXT, read: true, edit: false },
    [ActorVariablesKey.ALIAS]: { key: ActorVariablesKey.ALIAS, displayName: 'model.actor.variables.alias', type: VariableType.TEXT, read: true, edit: true },
    [ActorVariablesKey.CHARACTER_ID]: {
        key: 'characterID',
        displayName: 'model.actor.variables.characterID',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.CHARACTERS,
        read: true,
        edit: false,
    },
    [ActorVariablesKey.SPRITE_PATH]: {
        key: ActorVariablesKey.SPRITE_PATH,
        displayName: 'model.actor.variables.spritePath',
        type: VariableType.FILE_PATH,
        read: true,
        edit: true,
    },
    [ActorVariablesKey.ACTOR_TYPE]: {
        key: ActorVariablesKey.ACTOR_TYPE,
        displayName: 'model.actor.variables.type',
        type: VariableType.ENUMERATOR,
        options: Object.values(ActorType).map((value) => value),
        read: true,
        edit: true,
    },
};

export class Actor extends EntityBase {
    static get variables() {
        return ActorEntityVariables;
    }

    // If this event actors are pooled on the moment that the event happens.
    actorType: ActorType;

    // Generic sprite path
    spriteFilePath?: string[];

    // If the actor is a specific character, just put the id here.
    characterID?: string;

    // Condition to be checked to select the actor in case of dynamic casting
    actorCastingFilter?: EntityFilterTree;

    // Actor alias that the user may change to better edit the event, or if the actor is generic, the name that will appear on the dialogue screen.
    alias?: string;

    constructor() {
        super();

        this.id = `actor_${uuidv4()}`;
    }
}
