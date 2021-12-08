import { v4 as uuidv4 } from 'uuid';
import { Effect } from './Effect.model';

export enum RelationshipAttribute {
    UNDEFINED = 'model.undefined',

    FAVOR = 'model.relationship.variable.favor',
    LOVE = 'model.relationship.variable.love',
    POWER = 'model.relationship.variable.power',
    ATTRACTION = 'model.relationship.variable.attraction',
    RESPECT = 'model.relationship.variable.respect',
}

export class Relationship {
    //Identifier that both characters will have to reference this Relationship
    public id: string;
    //Character IDs
    public firstCharacter: string;
    public secondCharacter: string;

    /**DYNAMIC VALUES ARE VOLATILE AND NEED TO BE STORE TO KEEP TRACK OF THEM.
     * THEY SHOULD INCREASE OVER TIME SO THAT IT MAKES SENSE TO STORE THEM.
     * VALUES THAT ONLY CHANGE THROUGH STATIC MEANS (Traits, Events, Effects) should be FIXED
     **/

    //Familiarity indicates how much the characters know each other
    public familiarity: number[];
    public love: number;

    /**FIXED VALUES ARE STATIC, BUT ARE STILL PRESENT ON THE OBJECT FOR
     * EASY EXTRACTION. THEY ARE ONLY CHANGE TRHOUGH EVENTS, TRAITS AND EFFECTS
     * SO THAT IT MAKES SENSE TO STORE THEM. VALUES THAT ONLY CHANGE THROUGH STATIC MEANS (Traits, Events, Effects) should be DYNAMIC
     **/
    //If positive, first character has more power, if positive the second has more power (Fixed because it depends on position of the character in hierarchy)
    public power: number;
    //Store the attraction that the characters have for each other (Fixed because it depends on traits and events)
    public attractiviness: number[];
    //If positive, first character respects suggestions of the second, opposite if negative (Fixed because it depends on events and hierarchy)
    public respect: number;

    //ATTRACTIVINESS is a attribute that should be set on real time, the effects may change the value

    public activeEffects: Effect[];

    constructor(firstCharacter: string, secondCharacter: string) {
        this.id = 'relationship_' + uuidv4();

        this.firstCharacter = firstCharacter;
        this.secondCharacter = secondCharacter;

        this.familiarity = [0, 0];
        this.love = 0;

        this.power = 0;
        this.attractiviness = [0, 0];
        this.respect = 0;

        this.activeEffects = [];
    }
}
