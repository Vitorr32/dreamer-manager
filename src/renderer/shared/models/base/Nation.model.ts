import { Culture } from '../enums/Culture.enum';
import { VariableType } from '../enums/VariableType';
import { Effect } from './Effect.model';
import { EntityBase } from './Entity.model';
import { Variables } from './Variable.model';

export enum LevelOfDevelopment {
    PRIMITIVE,
    PRE_INDUSTRIAL_REVOLUTION,
    EARLY_INDUSTRIALIZATION,
    INDUSTRIAL_SOCIETY,
    PRE_LA_GRANDE_GUERRE_SOCIETY,
    POST_INDUSTRIAL_SOCIETY,
}

export enum NationVariablesKey {
    ID = 'id',
    NAME = 'name',
    PRIMARY_CULTURE = 'primaryCulture',
    SECONDARY_CULTURE = 'secondaryCultures',
    POPULATION_DISTRIBUTION = 'populationDistribution',
    POPULATION = 'population',
    EFFECTS = 'effects',
}

export const NationEntityVariables: Variables = {
    id: { key: NationVariablesKey.ID, displayName: 'model.character.variables.id', type: VariableType.TEXT, read: true, edit: false },
    name: { key: NationVariablesKey.NAME, displayName: 'model.character.variables.name', type: VariableType.TEXT, read: true, edit: true },
    primaryCulture: {
        key: NationVariablesKey.PRIMARY_CULTURE,
        displayName: 'model.character.variables.surname',
        type: VariableType.ENUMERATOR,
        options: Object.values(Culture).map((value) => value),
        read: true,
        edit: true,
    },
    secondaryCultures: {
        key: NationVariablesKey.SECONDARY_CULTURE,
        displayName: 'model.character.variables.nickname',
        type: VariableType.ENUMERATOR_LIST,
        options: Object.values(Culture).map((value) => value),
        read: true,
        edit: true,
    },
};

export class Nation extends EntityBase {
    static get variables() {
        return NationEntityVariables;
    }

    id: string;

    name: string;

    primaryCulture: Culture;

    secondaryCultures: Culture[];

    // Distribution of the population between the primary and secondary cultures
    populationDistribution: number[];

    population: number;

    effects: Effect[] = [];

    levelOfDevelopment: LevelOfDevelopment;
}
