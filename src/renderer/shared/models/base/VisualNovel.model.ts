import { Scene } from './Scene.model';
import { SceneTree } from './SceneTree.model';

export class VisualNovel {
    sceneTree: SceneTree;

    constructor(sceneTree: undefined | SceneTree) {
        this.sceneTree = sceneTree || new SceneTree(new Scene());
    }
}
