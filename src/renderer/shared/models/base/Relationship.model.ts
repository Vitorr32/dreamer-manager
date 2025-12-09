import { id } from 'date-fns/locale';
import { EntityType } from '../enums/Entities.enum';
import { VariableType } from '../enums/VariableType';
import { EntityBase } from './Entity.model';
import { Variables } from './Variable.model';

export enum RelationshipParameter {
    UNDEFINED = 'model.undefined',

    FAVOR = 'model.relationship.variable.favor',
    LOVE = 'model.relationship.variable.love',
    POWER = 'model.relationship.variable.power',
    ATTRACTION = 'model.relationship.variable.attraction',
    RESPECT = 'model.relationship.variable.respect',
}

export enum RelationshipVariablesKey {
    ID = 'id',
    FAVOR = 'favor',
    LOVE = 'love',
    POWER = 'power',
    ATTRACTION = 'attraction',
    RESPECT = 'respect',
    ORIGIN_CHARACTER = 'originCharacter',
    TARGET_CHARACTER = 'targetCharacter',
}

export const RelationshipEntityVariables: Variables = {
    id: { key: RelationshipVariablesKey.ID, displayName: 'model.id', type: VariableType.TEXT, read: true, edit: false },
    favor: { key: RelationshipVariablesKey.FAVOR, displayName: 'model.relationship.variable.favor', type: VariableType.NUMBER, read: true, edit: true },
    love: { key: RelationshipVariablesKey.LOVE, displayName: 'model.relationship.variable.love', type: VariableType.NUMBER, read: true, edit: true },
    power: { key: RelationshipVariablesKey.POWER, displayName: 'model.relationship.variable.power', type: VariableType.NUMBER, read: true, edit: true },
    attraction: { key: RelationshipVariablesKey.ATTRACTION, displayName: 'model.relationship.variable.attraction', type: VariableType.NUMBER, read: true, edit: true },
    respect: { key: RelationshipVariablesKey.RESPECT, displayName: 'model.relationship.variable.respect', type: VariableType.NUMBER, read: true, edit: true },
    originCharacter: {
        key: RelationshipVariablesKey.ORIGIN_CHARACTER,
        displayName: 'model.relationship.variables.originChar',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.CHARACTERS,
        read: true,
        edit: false,
    },
    targetCharacter: {
        key: RelationshipVariablesKey.TARGET_CHARACTER,
        displayName: 'model.relationship.variables.targetChar',
        type: VariableType.EXTERNAL_KEY,
        externalEntity: EntityType.CHARACTERS,
        read: true,
        edit: false,
    },
};

// Relationship would be a read-only Entity that is not actually instantiated in game, since the Relationship Modifiers would be calculated in real time.
export class Relationship extends EntityBase {
    static get variables() {
        return RelationshipEntityVariables;
    }

    /**
     *  These five relationship variable are to be used on Entity filtering, so for example,
     *  Any character that has Favor bigger than 50 with characters that are Caucasian would be:
     *  originCharacter: Self
     *  favor: 50
     *  receptorCharacter: External Key, Ethnicity equals to Caucasian
     * */
    favor: number;

    love: number;

    power: number;

    attraction: number;

    respect: number;

    // As in, the character that holds the opinion (X respect for Y is 50, X would be the origin character)
    originCharacter: string;

    // And this would be the character that "receives" the opinion (X respect for Y is 50, Y would be the target character).
    targetCharacter: string;
}
