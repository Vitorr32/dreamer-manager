export class Trait {
    public traitType?: TraitType
    public id?: string
    public name?: string
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

