import { Character } from './Character.model';
import { ConditionTree } from './ConditionTree';

export enum Emotion {
    NEUTRAL,
    HAPPY,
    SAD,
    ANGRY,
    FURIOUS,
    SUSPICIOUS,
    SCARED,
}

export enum BasicAnimations {
    FADE_IN,
    FADE_OUT,
    MOVE_LEFT,
    MOVE_RIGHT,
    GET_CLOSER,
    GET_FARTHER,
}

export interface NextScene {
    scene: Scene;
    condition: ConditionTree;
}

export interface Sound {
    soundSource: string;
    soundTimeTrigger: number;
}

export interface Animation {
    type: BasicAnimations;
    // actors
}

//TODO: Think of best method to create a scene that actors move around independetly

export class Scene {
    public nextScenes: NextScene[];
    public backgroundSource: string | undefined;
    public dialog?: string;

    constructor() {
        this.nextScenes = [];
    }

    public runScene(actors: Character[]) {}
}
