import { BodyType, Character, CharacterEntityVariables } from './Character.model';
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

export enum CareerPath {
    DREAMER = 'model.dreamer.career_path.dreamer',
    MODEL = 'model.dreamer.career_path.model',
    ACTRESS = 'model.dreamer.career_path.actress',
    MUSICAL_BAND = 'model.dreamer.career_path.band',
    MUSICAL_SOLO = 'model.dreamer.career_path.solo',
    ENTERTAINER = 'model.dreamer.career_path.entertainer',
}

export enum CareerObjective {
    SEARCHING = 'model.dreamer.objective.searching',
    PERFECT_DREAMER = 'model.dreamer.objective.perfect_dreamer',
    SUCCESSFUL_DREAMER = 'model.dreamer.objective.successful_dreamer',
    SUCCESSFUL_ACTRESS = 'model.dreamer.objective.successful_actress',
    SUCCESSFUL_SINGER = 'model.dreamer.objective.successful_singer',
    SUCCESSFUL_BAND = 'model.dreamer.objective.successful_band',
    SUCCESSFUL_ENTERTAINER = 'model.dreamer.objective.successful_entertainer',
    RAG_TO_RICHES = 'model.dreamer.objective.rag_to_riches',
    WORLDWIDE_REPUTATION = 'model.dreamer.objective.worldwide_reputation',
}

export enum DreamerVariablesKey {
    FAMILY_SITUATION = 'familySituation',
    ABILITY_POTENTIAL = 'abilityPotential',
    DREAMER_OBJECTIVE = 'dreamerObjective',
    PREFERRED_PATH = 'preferredCareerPath',
    DISLIKED_PATH = 'dislikedCareerPath',
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
    CONCENTRATION = 'concentration',
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
    [DreamerVariablesKey.DREAMER_OBJECTIVE]: {
        key: DreamerVariablesKey.DREAMER_OBJECTIVE,
        displayName: 'model.dreamer.variables.objective',
        type: VariableType.ENUMERATOR,
        options: Object.values(CareerObjective).map((value) => value),
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.PREFERRED_PATH]: {
        key: DreamerVariablesKey.PREFERRED_PATH,
        displayName: 'model.dreamer.variables.preferred_paths',
        type: VariableType.ENUMERATOR_LIST,
        options: Object.values(CareerPath).map((value) => value),
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.DISLIKED_PATH]: {
        key: DreamerVariablesKey.DREAMER_OBJECTIVE,
        displayName: 'model.dreamer.variables.disliked_paths',
        type: VariableType.ENUMERATOR_LIST,
        options: Object.values(CareerPath).map((value) => value),
        read: true,
        edit: true,
    },
    [DreamerVariablesKey.ABILITY_POTENTIAL]: {
        key: DreamerVariablesKey.ABILITY_POTENTIAL,
        displayName: 'model.dreamer.variables.potential',
        type: VariableType.NUMBER,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.INTELLIGENCE]: {
        key: DreamerVariablesKey.INTELLIGENCE,
        displayName: 'model.dreamer.variables.intelligence',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.PHYSICAL_CONDITION]: {
        key: DreamerVariablesKey.PHYSICAL_CONDITION,
        displayName: 'model.dreamer.variables.physical_condition',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.ATTRACTIVENESS]: {
        key: DreamerVariablesKey.ATTRACTIVENESS,
        displayName: 'model.dreamer.variables.attractiveness',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.CONCENTRATION]: {
        key: DreamerVariablesKey.CONCENTRATION,
        displayName: 'model.dreamer.variables.concentration',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.CHARISMA]: {
        key: DreamerVariablesKey.CHARISMA,
        displayName: 'model.dreamer.variables.charisma',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.WILLPOWER]: {
        key: DreamerVariablesKey.WILLPOWER,
        displayName: 'model.dreamer.variables.willpower',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.SINGING]: {
        key: DreamerVariablesKey.SINGING,
        displayName: 'model.dreamer.variables.singing',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.DANCING]: {
        key: DreamerVariablesKey.DANCING,
        displayName: 'model.dreamer.variables.dancing',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.COORDINATION]: {
        key: DreamerVariablesKey.COORDINATION,
        displayName: 'model.dreamer.variables.coordination',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.IMPROVISATION]: {
        key: DreamerVariablesKey.IMPROVISATION,
        displayName: 'model.dreamer.variables.improvisation',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.COMPOSURE]: {
        key: DreamerVariablesKey.COMPOSURE,
        displayName: 'model.dreamer.variables.composure',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.MEMORIZATION]: {
        key: DreamerVariablesKey.MEMORIZATION,
        displayName: 'model.dreamer.variables.memorization',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.BRAVERY]: {
        key: DreamerVariablesKey.BRAVERY,
        displayName: 'model.dreamer.variables.bravery',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.CREATIVITY]: {
        key: DreamerVariablesKey.CREATIVITY,
        displayName: 'model.dreamer.variables.creativity',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.EXPRESSIVITY]: {
        key: DreamerVariablesKey.EXPRESSIVITY,
        displayName: 'model.dreamer.variables.expressivity',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.ACTING]: {
        key: DreamerVariablesKey.ACTING,
        displayName: 'model.dreamer.variables.acting',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.LYRICISM]: {
        key: DreamerVariablesKey.LYRICISM,
        displayName: 'model.dreamer.variables.lyricism',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.SEDUCTION]: {
        key: DreamerVariablesKey.SEDUCTION,
        displayName: 'model.dreamer.variables.seduction',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.ENTERTAINMENT]: {
        key: DreamerVariablesKey.ENTERTAINMENT,
        displayName: 'model.dreamer.variables.entertainment',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.PERSUASION]: {
        key: DreamerVariablesKey.PERSUASION,
        displayName: 'model.dreamer.variables.persuasion',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.ELEGANCY]: {
        key: DreamerVariablesKey.ELEGANCY,
        displayName: 'model.dreamer.variables.elegancy',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.EMPATHY]: {
        key: DreamerVariablesKey.EMPATHY,
        displayName: 'model.dreamer.variables.empathy',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.STAMINA]: {
        key: DreamerVariablesKey.STAMINA,
        displayName: 'model.dreamer.variables.stamina',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.TEAMWORK]: {
        key: DreamerVariablesKey.TEAMWORK,
        displayName: 'model.dreamer.variables.teamwork',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.LEADERSHIP]: {
        key: DreamerVariablesKey.LEADERSHIP,
        displayName: 'model.dreamer.variables.leadership',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.FITNESS]: {
        key: DreamerVariablesKey.FITNESS,
        displayName: 'model.dreamer.variables.fitness',
        type: VariableType.DYNAMIC_ATTRIBUTE,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.WEIGHT]: {
        key: DreamerVariablesKey.WEIGHT,
        displayName: 'model.character.variables.weight',
        type: VariableType.NUMBER,
        max: 20,
        min: 1,
        read: true,
        edit: false,
    },
    [DreamerVariablesKey.FAT_PERCENTAGE]: {
        key: DreamerVariablesKey.FAT_PERCENTAGE,
        displayName: 'model.character.dreamer.weight',
        type: VariableType.NUMBER,
        max: 50,
        min: 1,
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
    public abilityPotential: number = 50;
    public dreamerObjective: CareerObjective;
    public preferredCareerPath: CareerPath[] = [];
    public dislikedCareerPath: CareerPath[] = [];
    //Dynamic Attributes of a Dreamer, they can grow and decrease over time and with events.
    public intelligence: number = 1;
    public physicalCondition: number = 1;
    public attractiveness: number = 1;
    public charisma: number = 1;
    public willpower: number = 1;
    public singing: number = 1;
    public dancing: number = 1;
    public coordination: number = 1;
    public concentration: number = 1;
    public improvisation: number = 1;
    public composure: number = 1;
    public memorization: number = 1;
    public bravery: number = 1;
    public creativity: number = 1;
    public expressivity: number = 1;
    public acting: number = 1;
    public lyricism: number = 1;
    public seduction: number = 1;
    public entertainment: number = 1;
    public persuasion: number = 1;
    public elegancy: number = 1;
    public empathy: number = 1;
    public leadership: number = 1;
    public fitness: number = 1;
    public teamwork: number = 1;
    public stamina: number = 1;

    public getCurrentAbility(): number {
        return (
            (this.intelligence || 0) +
            (this.physicalCondition || 0) +
            (this.attractiveness || 0) +
            (this.charisma || 0) +
            (this.willpower || 0) +
            (this.singing || 0) +
            (this.dancing || 0) +
            (this.coordination || 0) +
            (this.concentration || 0) +
            (this.improvisation || 0) +
            (this.composure || 0) +
            (this.memorization || 0) +
            (this.bravery || 0) +
            (this.creativity || 0) +
            (this.expressivity || 0) +
            (this.acting || 0) +
            (this.lyricism || 0) +
            (this.seduction || 0) +
            (this.entertainment || 0) +
            (this.persuasion || 0) +
            (this.elegancy || 0) +
            (this.empathy || 0) +
            (this.leadership || 0) +
            (this.fitness || 0) +
            (this.teamwork || 0) +
            (this.stamina || 0)
        );
    }

    public calculateBodyType = (): BodyType => {
        const bmi = this.weight / ((this.height / 100) ^ 2);

        if (bmi < 19 && this.fatPercentage < 5) {
            return BodyType.ANOREXIC;
        } else if (bmi < 19 && this.fatPercentage < 10) {
            return BodyType.SKINNY;
        } else if (bmi < 19) {
            return BodyType.UNDERWEIGHT;
        } else if (bmi < 25 && this.fatPercentage < 20) {
            return BodyType.FIT;
        } else if (bmi < 25) {
            return BodyType.AVERAGE;
        } else if (this.fatPercentage < 20) {
            return BodyType.MUSCULAR;
        } else if (this.fatPercentage < 30) {
            return BodyType.OVERWEIGHT;
        } else {
            return BodyType.OBESE;
        }
    };
}
