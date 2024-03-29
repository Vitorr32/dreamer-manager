import { v4 as uuidv4 } from 'uuid';
import { Character } from './Character.model';
import { ConditionTree } from './ConditionTree';
import { Effect } from './Effect.model';

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
    IDLE = 'model.event.animation.type.idle',
    FADE_IN = 'model.event.animation.type.fadeIn',
    FADE_OUT = 'model.event.animation.type.fadeOut',
    MOVE_LEFT = 'model.event.animation.type.moveLeft',
    MOVE_RIGHT = 'model.event.animation.type.moveRight',
    GET_CLOSER = 'model.event.animation.type.getCloser',
    GET_FARTHER = 'model.event.animation.type.getFarther',
}

export enum ConnectionType {
    NORMAL = 'model.event.connection.type.normal',
    CHOICE = 'model.event.connection.type.choice',
    HIDDEN_CHECK = 'model.event.connection.type.hidden',
}

export interface Sound {
    soundSource: string;
    soundTimeTrigger: number;
}

export interface Animation {
    type: BasicAnimations;
    xAxisOffset: number;
    yAxisOffset: number;
    scale: number;
    facing: 'Left' | 'Right';
    rotation: number;
    delay: number;
    duration: number;
}

export interface SceneConnection {
    type: ConnectionType;
    choiceCondition?: ConditionTree | null;
    // ID of the resulting scene
    resultingScene: string;
    localization?: {
        [key: string]: {
            choiceLabel: string;
        };
    };
}

export enum SceneResultType {
    MODIFY_FLAG_TO_ACTOR,
    MODIFY_FLAG_TO_WORLD,
    APPLY_EFFECT_TO_WORLD,
}

// The resulting changes on the game actors/data from the respective scene end. these effects will be applied on the end of every scene with contains a result.
export interface SceneResult {
    type: SceneResultType;
    flagID?: string;
    conditionTree?: ConditionTree;
    actorID?: string;
    effect?: Effect;
}

export const BASE_ANIMATION_OBJECT: Animation = {
    type: BasicAnimations.IDLE,
    facing: 'Right',
    rotation: 0,
    scale: 0,
    xAxisOffset: 50,
    yAxisOffset: 50,
    delay: 0,
    duration: 0,
};

export class Scene {
    public id: string;

    public sceneConnections: SceneConnection[] | null = null;

    public sceneResults: SceneResult[] | null = null;

    // The string that will appear as the content of the dialog box
    public dialog: string | null = null;

    // The string that will appear as the "Speaker" of the scene, above the dialog box, may be empty
    public speakerString: string | null = null;

    // Which actors will appear on the scene
    public actorsState: {
        [key: string]: {
            // Is the actor currently talking?
            isHighlighted: boolean;
            // The positioning and animation that this actors will go trough on this scene.
            animations: Animation[];
        };
    } = {};

    // The source path of the background image
    public backgroundImagePath: string[] | null = null;

    constructor(id?: string) {
        this.id = id || `scene_${  uuidv4()}`;
    }

    public runScene(actors: Character[], event: Event) {}

    public addActorToScene(actorID: string): boolean {
        if (this.actorsState[actorID]) {
            console.error('Scene Model - Actor already is added to the scene');
            return false;
        }

        this.actorsState[actorID] = {
            isHighlighted: false,
            animations: [BASE_ANIMATION_OBJECT],
        };

        return true;
    }

    public removeActorFromScene(actorID: string): boolean {
        if (!this.actorsState[actorID]) {
            console.error('Scene Model - The specified actor is not in the scene');
            return false;
        }

        delete this.actorsState[actorID];

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
