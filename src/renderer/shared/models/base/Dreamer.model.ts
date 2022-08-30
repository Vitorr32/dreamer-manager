import { Character, CharacterEntityVariables } from './Character.model';
import { Variables, VariableType } from './Variable.model';

export enum FamilySituation {
    SUPPORTIVE = 'model.dreamer.family.supportive',
    STABLE = 'model.dreamer.family.stable',
    UNSTABLE = 'model.dreamer.family.unstable',
    ORPHAN = 'model.dreamer.family.orphan',
    WAR_ORPHAN = 'model.dreamer.family.war_orphan',
    WIDOWER = 'model.dreamer.family.widower',
    WIDOW = 'model.dreamer.family.widow',
    WAR_WIDOW = 'model.dreamer.family.war_widow',
    DIVORCED = 'model.dreamer.family.divorced',
}

export enum DreamerVariablesKey {
    FAMILY_SITUATION = 'familySituation',
    ABILITY_POTENTIAL = 'abilityPotential',
    //Keys for dynamic attributes should be the same as their ID on the Database.
    INTELLIGENCE = 'intelligence',
    PHYSICAL_CONDITION = 'physicalCondition',
    ATTRACTIVENESS = 'attractiveness',
    CHARISMA = 'charisma',
    WILLPOWER = 'willpower',
    SINGING = 'singing',
    DANCING = 'dancing',
    STAMINA = 'stamina',
    FITNESS = 'fitness',
    LEADERSHIP = 'leadership',
    TEAMWORK = 'teamwork',
    COORDINATION = 'coordination',
    IMPROVISATION = 'improvisation',
    COMPOSURE = 'composure',
    MEMORIZATION = 'memorization',
    BRAVERY = 'bravery',
    CREATIVITY = 'creativity',
    EXPRESSIVITY = 'expressivity',
    ACTING = 'acting',
    LYRICISM = 'lyricism',
    SEDUCTION = 'seduction',
    ENTERTAINMENT = 'entertainment',
    PERSUASION = 'persuasion',
    ELEGANCY = 'elegancy',
    EMPATHY = 'empathy',
    WEIGHT = 'weight',
    FAT_PERCENTAGE = 'fatPercentage',
}

export const DreamerEntityVariables: Variables = {
    [DreamerVariablesKey.FAMILY_SITUATION]: {
        key: DreamerVariablesKey.FAMILY_SITUATION,
        displayName: 'model.dreamer.variables.family',
        type: VariableType.ENUMERATOR,
        options: Object.values(FamilySituation).map((value) => value),
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.ABILITY_POTENTIAL]: {
        key: DreamerVariablesKey.ABILITY_POTENTIAL,
        displayName: 'model.dreamer.variables.potential',
        type: VariableType.NUMBER,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.INTELLIGENCE]: {
        key: DreamerVariablesKey.INTELLIGENCE,
        displayName: 'model.dreamer.variables.intelligence',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.PHYSICAL_CONDITION]: {
        key: DreamerVariablesKey.PHYSICAL_CONDITION,
        displayName: 'model.dreamer.variables.physical_condition',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.ATTRACTIVENESS]: {
        key: DreamerVariablesKey.ATTRACTIVENESS,
        displayName: 'model.dreamer.variables.attractiveness',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.CHARISMA]: {
        key: DreamerVariablesKey.CHARISMA,
        displayName: 'model.dreamer.variables.charisma',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.WILLPOWER]: {
        key: DreamerVariablesKey.WILLPOWER,
        displayName: 'model.dreamer.variables.willpower',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.SINGING]: {
        key: DreamerVariablesKey.SINGING,
        displayName: 'model.dreamer.variables.singing',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.DANCING]: {
        key: DreamerVariablesKey.DANCING,
        displayName: 'model.dreamer.variables.dancing',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.COORDINATION]: {
        key: DreamerVariablesKey.COORDINATION,
        displayName: 'model.dreamer.variables.coordination',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.IMPROVISATION]: {
        key: DreamerVariablesKey.IMPROVISATION,
        displayName: 'model.dreamer.variables.improvisation',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.COMPOSURE]: {
        key: DreamerVariablesKey.COMPOSURE,
        displayName: 'model.dreamer.variables.composure',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.MEMORIZATION]: {
        key: DreamerVariablesKey.MEMORIZATION,
        displayName: 'model.dreamer.variables.memorization',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.BRAVERY]: {
        key: DreamerVariablesKey.BRAVERY,
        displayName: 'model.dreamer.variables.bravery',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.CREATIVITY]: {
        key: DreamerVariablesKey.CREATIVITY,
        displayName: 'model.dreamer.variables.creativity',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.EXPRESSIVITY]: {
        key: DreamerVariablesKey.EXPRESSIVITY,
        displayName: 'model.dreamer.variables.expressivity',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.ACTING]: {
        key: DreamerVariablesKey.ACTING,
        displayName: 'model.dreamer.variables.acting',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.LYRICISM]: {
        key: DreamerVariablesKey.LYRICISM,
        displayName: 'model.dreamer.variables.lyricism',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.SEDUCTION]: {
        key: DreamerVariablesKey.SEDUCTION,
        displayName: 'model.dreamer.variables.seduction',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.ENTERTAINMENT]: {
        key: DreamerVariablesKey.ENTERTAINMENT,
        displayName: 'model.dreamer.variables.entertainment',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.PERSUASION]: {
        key: DreamerVariablesKey.PERSUASION,
        displayName: 'model.dreamer.variables.persuasion',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.ELEGANCY]: {
        key: DreamerVariablesKey.ELEGANCY,
        displayName: 'model.dreamer.variables.elegancy',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.EMPATHY]: {
        key: DreamerVariablesKey.EMPATHY,
        displayName: 'model.dreamer.variables.empathy',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.STAMINA]: {
        key: DreamerVariablesKey.STAMINA,
        displayName: 'model.dreamer.variables.stamina',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.TEAMWORK]: {
        key: DreamerVariablesKey.TEAMWORK,
        displayName: 'model.dreamer.variables.teamwork',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.LEADERSHIP]: {
        key: DreamerVariablesKey.LEADERSHIP,
        displayName: 'model.dreamer.variables.leadership',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.FITNESS]: {
        key: DreamerVariablesKey.FITNESS,
        displayName: 'model.dreamer.variables.fitness',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.WEIGHT]: {
        key: DreamerVariablesKey.WEIGHT,
        displayName: 'model.character.variables.weight',
        type: VariableType.NUMBER,
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.FAT_PERCENTAGE]: {
        key: DreamerVariablesKey.FAT_PERCENTAGE,
        displayName: 'model.character.dreamer.weight',
        type: VariableType.NUMBER,
        read: true,
        edit: true,
    },
};

export class Dreamer extends Character {
    static get _variables(): Variables {
        return { ...CharacterEntityVariables, ...DreamerEntityVariables };
    }
    // Family situation that can influence traits and traumas
    public familySituation: FamilySituation;

    public weight: number;
    public fatPercentage: number;
    // A number, from 50 (Very Bad) to 200 (Perfect) that is distributed between all the dreamers skills trough training and growing up.
    public abilityPotential: number;
    //Dynamic Attributes of a Dreamer, they can grow and decrease over time and with events.
    public intelligence: number;
    public physicalCondition: number;
    public attractiveness: number;
    public charisma: number;
    public willpower: number;
    public singing: number;
    public dancing: number;
    public coordination: number;
    public improvisation: number;
    public composure: number;
    public memorization: number;
    public bravery: number;
    public creativity: number;
    public expressivity: number;
    public acting: number;
    public lyricism: number;
    public seduction: number;
    public entertainment: number;
    public persuasion: number;
    public elegancy: number;
    public empathy: number;
    public leadership: number;
    public fitness: number;
    public teamwork: number;
    public stamina: number;
}
