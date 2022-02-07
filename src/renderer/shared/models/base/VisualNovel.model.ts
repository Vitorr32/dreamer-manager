import { hierarchy } from '@visx/hierarchy';
import { HierarchyNode } from '@visx/hierarchy/lib/types';
import { Scene, SceneResult } from './Scene.model';

export class VisualNovel {
    rootScene: string;
    currentScene: string;

    private allScenes: Scene[] | null = null;
    private mappedScenes: { [key: string]: Scene } | null = null;

    constructor(root: Scene | null = null) {
        this.rootScene = '';
        this.currentScene = '';

        if (root) {
            this.allScenes = [root];
            this.mappedScenes = { [root.id]: root };
        }
    }

    addScene(parentScene: Scene | null, newScene: Scene) {
        //If theres no current root, or the added scene is orphan, add it as the root scene
        if (!this.rootScene || !parentScene) {
            this.rootScene = newScene.id;
            this.allScenes = [newScene];
            this.mappedScenes = { [newScene.id]: newScene };
            return;
        }

        if (!this.mappedScenes || !this.allScenes) {
            console.error('Visual Novel object has no scenes even though the root scene is not empty.');
            return;
        }

        this.allScenes.push(newScene);
        this.mappedScenes[newScene.id] = newScene;

        const sceneResult: SceneResult = {
            applyFlagToActor: null,
            choiceCondition: null,
            choiceLabel: null,
            resultingScene: newScene.id,
        };

        console.log(parentScene);
        console.log(this.mappedScenes);

        if (this.mappedScenes[parentScene.id].sceneResults) {
            this.mappedScenes[parentScene.id].sceneResults.push(sceneResult);
        } else {
            this.mappedScenes[parentScene.id].sceneResults = [sceneResult];
        }
    }

    getRoot(): Scene | null {
        return this.mappedScenes ? this.mappedScenes[this.rootScene] : null;
    }

    getScene(id: string): Scene | null {
        return this.mappedScenes?.[id] || null;
    }

    getChildrenScenes(parentID: string): Scene[] {
        return this.getScene(parentID).sceneResults?.map((result) => this.getScene(result.resultingScene)) || [];
    }

    getVISXHierarchyOfVN(): HierarchyNode<Scene> | null {
        if (!this.getRoot()) {
            console.error('(getVISXHierarchyOfVN) - Called with empty root of VN');
            return null;
        }

        return hierarchy<Scene>(this.getRoot(), (scene: Scene) => this.getChildrenScenes(scene.id));
    }

    renderCurrentScene() {}
}
