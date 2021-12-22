import { Scene } from './Scene.model';

export class SceneTree {
    rootScene: Scene;
    currentScene: Scene | undefined;

    constructor(root: Scene) {
        this.rootScene = root;
    }
}
