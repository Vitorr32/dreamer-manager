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
    public actors: string[] | null = null;
    //Which actors of the scene are actively talking
    public highlighted: string[] | null = null;

    //The source path of the background image
    public backgroundImageName: string | null = null;
    //Which animations will be applied in the actors of the scene?
    public animations: Animation[] | null = null;

    constructor(id?: string) {
        this.id = id || 'scene_' + uuidv4();
    }

    public runScene(actors: Character[], event: Event) {}

    public addActorToScene(actorID: string): boolean {
        if (!this.actors) {
            this.actors = [actorID];
            return true;
        }

        if (this.actors.includes(actorID)) {
            console.error('Scene Model - Actor already is added to the scene');
            return false;
        }

        this.actors.push(actorID);

        return true;
    }

    public removeActorFromScene(actorID: string): boolean {
        const actorIndex = this.actors?.findIndex((actor) => actor === actorID);

        if (!this.actors || this.actors.length === 0 || actorIndex === -1) {
            console.error('Scene Model - No actors are in the scene, or the specified actor is not in the scene');
            return false;
        }

        this.actors.splice(actorIndex);
        this.removeActorHighlight(actorID);

        return true;
    }

    public toggleActorHighlight(actorID: string, toggleState?: boolean): boolean {
        if (!this.actors.includes(actorID)) {
            console.error('Scene Model (toggleActorHighlight) - The actor to be highlighted does not exist in this scene');
            return false;
        }

        const simpleToggle = toggleState === undefined;
        const currentState = this.highlighted?.includes(actorID) || false;

        if (!this.highlighted) {
            this.highlighted = [];
        }

        if (simpleToggle) {
            if (currentState) {
                this.removeActorHighlight(actorID);
            } else {
                this.highlightActor(actorID);
            }
        } else {
            if (toggleState) {
                this.highlightActor(actorID);
            } else {
                this.removeActorHighlight(actorID);
            }
        }

        return true;
    }

    public highlightActor(actorID: string): boolean {
        if (!this.actors.includes(actorID)) {
            console.error('Scene Model - The actor to be highlighted does not exist in this scene');
            return false;
        }

        if (!this.highlighted) {
            this.highlighted = [actorID];
        } else {
            this.highlighted.push(actorID);
        }

        return true;
    }

    private removeActorHighlight(actorID: string): void {
        const highlightedActorIndex = this.highlighted?.findIndex((actor) => actor === actorID);
        if (this.highlighted && this.highlighted.length !== 0 && highlightedActorIndex !== -1) {
            this.highlighted.splice(highlightedActorIndex);
        }
    }
}
