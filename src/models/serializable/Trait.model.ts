export interface Trait {
    traitType: TraitType
    id: string
    name: string
    description: string
    effects: string[]
    spritePath: string
}

export enum TraitType {
    UNDEFINED,

    NORMAL = 'Normal',
    PHYSICAL = 'Physical',
    MENTAL = 'Mental',
    PERSONALITY = 'Personality',
    SPECIAL = 'Special',

    MAX_TYPES = 999
}

