import { Character } from './Character.model';
import { ConditionTree } from './ConditionTree';
import { v4 as uuidv4 } from 'uuid';

export enum Sprite {
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

export interface Sound {
    soundSource: string;
    soundTimeTrigger: number;
}

export interface Animation {
    //Which actor in the array
    actorIndex: number;
    type: BasicAnimations;
    //Options to configure the animation, like rotation degrees, offset to move, etc.
    options: {
        offset?: {
            x: number;
            y: number;
        };
        facing: 'Left' | 'Right';
        degrees?: number;
    };
}

export interface SceneResult {
    choiceLabel: string;
    choiceCondition: ConditionTree | undefined;
    resultingScene: Scene;
}

//TODO: Think of best method to create a scene that actors move around independetly

export class Scene {
    public id: string;

    public sceneResults: SceneResult[] | undefined;

    //The string that will appear as the content of the dialog box
    public dialog?: string;
    //The string that will appear as the "Speaker" of the scene, above the dialog box, may be empty
    public speakerString?: string;

    //The source path of the background image
    public backgroundSource: string | undefined;
    //Which animations will be applied in the actors of the scene?
    public animations: Animation[] | undefined;

    constructor(id?: string) {
        this.id = id || 'scene_' + uuidv4();
    }

    public runScene(actors: Character[]) {}
}
