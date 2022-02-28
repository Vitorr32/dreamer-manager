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

        if (this.mappedScenes[parentScene.id].sceneResults) {
            this.mappedScenes[parentScene.id].sceneResults.push(sceneResult);
        } else {
            this.mappedScenes[parentScene.id].sceneResults = [sceneResult];
        }
    }

    removeScene(parentScene: Scene, deletedScene: Scene) {
        //If there's nothing in the tree, there's nothing to remove
        if (!this.rootScene || !this.allScenes || !this.mappedScenes) {
            console.error('removeScene() - Tried to remove node from a empty VN tree');
            return;
        }

        //Modify the parent by removing the children from the scene results
        const newParent = Object.assign({}, parentScene);
        newParent.sceneResults = newParent.sceneResults.filter((result) => result.resultingScene !== deletedScene.id);

        const parentIndex = this.getSceneIndex(newParent.id);
        if (parentIndex === -1) {
            console.error('removeScene() - The parent scene is not on the VN scene list!');
            return;
        }

        const deletedIndex = this.getSceneIndex(deletedScene.id);
        if (deletedIndex === -1) {
            console.error('removeScene() - The delete scene is not on the VN scene list!');
            return;
        }

        this.mappedScenes[newParent.id] = newParent;
        this.allScenes[parentIndex] = newParent;

        this.allScenes.splice(deletedIndex, 1);
        this.mappedScenes[deletedScene.id] = null;
    }

    getRoot(): Scene | null {
        return this.mappedScenes ? this.mappedScenes[this.rootScene] : null;
    }

    getSceneIndex(id: string): number {
        return this.allScenes?.findIndex((scene) => scene.id === id);
    }

    getScene(id: string): Scene | null {
        return this.mappedScenes?.[id] || null;
    }

    getParentScene(id: string): { scene: Scene; index: number } | null {
        if (id === this.rootScene) {
            return null;
        }

        const parentIndex = this.allScenes.findIndex((scene) => scene.sceneResults.find((sceneResult) => sceneResult.resultingScene === id));

        if (parentIndex === -1) {
            console.error(`getParentScene(${id}) - No parent for the child ID, maybe broken scene search in action`);
            return null;
        } else {
            return { scene: this.allScenes[parentIndex], index: parentIndex };
        }
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

    updateScene(scene: Scene): Scene | null {
        const sceneIndex = this.allScenes.findIndex((searchScene) => searchScene.id === scene.id);

        if (!this.mappedScenes[scene.id] || sceneIndex === -1) {
            console.error('updateScene() - The scene to update is not currently mapped or in the array of the VisualNovel object!');
            return null;
        }

        const updatedScene = Object.assign(new Scene(), scene);

        this.mappedScenes[updatedScene.id] = updatedScene;
        this.allScenes.splice(sceneIndex, 1, updatedScene);

        return updatedScene;
    }

    renderCurrentScene() {}
}
