export enum Kinship {
    UNDEFINED,

    PARENT,
    SIBLING,
    CHILD,

    MAX_KINSHIP
}

export enum Gender {
    UNDEFINED,

    MALE,
    FEMALE,

    MAX_GENDERS
}

export enum Ethnicity {
    UNDEFINED,

    CAUCASSIAN,
    INDO,
    ASIAN,
    AFRICAN,

    MAX_ETHINICITIES
}

export enum Status {
    UNDEFINED,

    MOOD,
    STRESS,
    ENERGY,

    MAX_STATUS
}

export interface KinshipObject {
    character_id: string;
    kinship: Kinship;
}

export class Character {

    //Absolute Basic values of the character, these will never change
    public id: string;
    public spritePaths: string[];
    public name: string;
    public surname: string;
    public age: number;
    public birthday: Date;

    //Current state of the character attributes that should be serialized in case of save
    public baseMood: number = 50;
    public baseStress: number = 0;
    public baseEnergy: number = 100;

    public Race race;
    public Gender gender;
    public KinshipStruct[] family;
    public Trait[] traits;
    public EventBase.Flag[] flags;
    public Attribute[] skills;
    public List<string> spriteNames = new List<string>() { "default_child", "default_teen", "default_adult" };

    public void BuildBasicSkillTree() {

}
}