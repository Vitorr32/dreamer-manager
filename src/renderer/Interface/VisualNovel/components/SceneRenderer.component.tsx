import { Scene } from 'renderer/shared/models/base/Scene.model';

interface IProps {
    scene: Scene;
}

export function VisualNovel({ scene }: IProps) {
    return <div className="visual-novel-wrapper">{scene.id}</div>;
}
