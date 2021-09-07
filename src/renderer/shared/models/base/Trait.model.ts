export class Trait {
    public id?: string
    public name?: string
    public traitType?: TraitType
    public description?: string
    public effects?: string[]
    public spritePath?: string
}

export enum TraitType {
    UNDEFINED = 'Undefined',

    NORMAL = 'Normal',
    PHYSICAL = 'Physical',
    MENTAL = 'Mental',
    PERSONALITY = 'Personality',
    DEVELOPMENT = 'Development',
    NATIONAL = 'National',
    SPECIAL = 'Special'
}

