import { ConditionTree } from './ConditionTree';
import { EntityBase } from './Entity.model';
import { Variables, VariableType } from './Variable.model';
import { v4 as uuidv4 } from 'uuid';
import { Entity } from '../enums/Entities.enum';

export enum ActorType {
    PLAYER_CHARACTER = 'interface.editor.event.casting_player',
    GENERIC_TYPE = 'interface.editor.event.casting_is_generic',
    DYNAMIC_TYPE = 'interface.editor.event.casting_is_dynamic',
    SPECIFIC_TYPE = 'interface.editor.event.casting_is_specific',
}

export const ActorEntityVariables: Variables = {
    id: { key: 'id', displayName: 'model.actor.variables.id', type: VariableType.TEXT, read: true, edit: false },
    alias: { key: 'alias', displayName: 'model.actor.variables.alias', type: VariableType.TEXT, read: true, edit: true },
    characterID: {
        key: 'characterID',
        displayName: 'model.actor.variables.characterID',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: Entity.CHARACTERS,
        read: true,
        edit: false,
    },
    spriteFilePath: { key: 'spriteFilePath', displayName: 'model.actor.variables.spritePath', type: VariableType.FILE_PATH, read: true, edit: true },
    actorType: {
        key: 'actorType',
        displayName: 'model.actor.variables.type',
        type: VariableType.ENUMERATOR,
        options: Object.values(ActorType).map((value) => value),
        read: false,
        edit: false,
    },
};

export class Actor extends EntityBase {
    static get _variables() {
        return ActorEntityVariables;
    }
    //If this event actors are pooled on the moment that the event happens.
    actorType: ActorType;
    // Generic sprite path
    spriteFilePath?: string[];
    //If the actor is a specific character, just put the id here.
    characterID?: string;
    //Condition to be checked to select the actor in case of dynamic casting
    actorCastingCondition?: ConditionTree;
    // Actor object ID
    id: string;
    // Actor alias that the user may change to better edit the event, or if the actor is generic, the name that will appear on the dialogue screen.
    alias?: string;

    constructor() {
        super();

        this.id = `actor_${uuidv4()}`;
    }
}
