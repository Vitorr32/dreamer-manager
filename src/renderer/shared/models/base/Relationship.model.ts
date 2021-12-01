import { v4 as uuidv4 } from 'uuid';

export class Relationship {
    //Identifier that both characters will have to reference this Relationship
    public id: string;
    //Character IDs
    public activeCharacter: string = '';
    public passiveCharacter: string = '';

    //If positive, first character has more power, if positive the second has more power
    public power: number = 0;
    //If positive, first character respects suggestions of the second, opposite if negative
    public respect: number = 0;
    public favor: number = 0;
    public love: number = 0;
    public familiarity: number = 0;
    public attractiviness: number = 0;

    constructor(activeCharacter: string, passiveCharacter: string) {
        this.id = 'attr_' + uuidv4();

        this.activeCharacter = activeCharacter;
        this.passiveCharacter = passiveCharacter;
    }
}
