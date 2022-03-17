import { Character } from './Character.model';
import { ConditionTree } from './ConditionTree';
import { v4 as uuidv4 } from 'uuid';
import { CopyClassInstance } from 'renderer/shared/utils/General';

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
    IDLE,
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
    type: BasicAnimations;
    //Options to configure the animation, like rotation degrees, offset to move, etc.
    options: {
        offset?: {
            x: number;
            y: number;
        };
        facing: 'Left' | 'Right';
        rotation: number;
    };
}

export interface SceneResult {
    choiceLabel: string | null;
    choiceCondition: ConditionTree | null;
    //ID of the resulting scene
    resultingScene: string;
    applyFlagToActor: { flagID: string; actor: number }[] | null;
}

export class Scene {
    public id: string;

    public sceneResults: SceneResult[] | null = null;

    //The string that will appear as the content of the dialog box
    public dialog?: string;
    //The string that will appear as the "Speaker" of the scene, above the dialog box, may be empty
    public speakerString?: string;

    //Which actors will appear on the scene
    public actorsState: {
        [key: string]: {
            //Is the actor currently talking?
            isHighlighted: boolean;
            //The positioning and animation that this actors will go trough on this scene.
            animations: Animation[];
        };
    } = {};
    //The source path of the background image
    public backgroundImageName: string | null = null;

    constructor(id?: string) {
        this.id = id || 'scene_' + uuidv4();
    }

    public runScene(actors: Character[], event: Event) {}

    public addActorToScene(actorID: string): boolean {
        if (this.actorsState[actorID]) {
            console.error('Scene Model - Actor already is added to the scene');
            return false;
        }

        this.actorsState[actorID] = {
            isHighlighted: false,
            animations: [
                {
                    type: BasicAnimations.IDLE,
                    options: {
                        facing: 'Right',
                        rotation: 0,
                        offset: {
                            x: 50,
                            y: 50,
                        },
                    },
                },
            ],
        };

        return true;
    }

    public removeActorFromScene(actorID: string): boolean {
        if (!this.actorsState[actorID]) {
            console.error('Scene Model - The specified actor is not in the scene');
            return false;
        }

        this.actorsState[actorID] = null;
        return true;
    }

    public toggleActorHighlight(actorID: string, toggleState?: boolean): boolean {
        if (!this.actorsState[actorID]) {
            console.error('Scene Model (toggleActorHighlight) - The actor to be highlighted does not exist in this scene');
            return false;
        }

        this.actorsState[actorID].isHighlighted = toggleState === undefined ? !this.actorsState[actorID].isHighlighted : toggleState;

        return true;
    }
}
