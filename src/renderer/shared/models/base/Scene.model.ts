import { Character } from "./Character.model";

export enum Emotion {
    NEUTRAL,
    HAPPY,
    SAD,
    ANGRY,
    FURIOUS,
    SUSPICIOUS,
    SCARED
}

export interface Sound {
    soundSource: string;
    soundTimeTrigger: number;
}

export interface Animation {

}

export class Scene {
    public id?: string;
    public backgroundSource?: string;
    //Automatic populated when the scene is loaded
    public actors: Character[] = [];

    public dialog?: string;
}