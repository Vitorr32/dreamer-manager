import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {}

export function VisualNovel({}: IProps) {
    const currentNovel = useSelector((state: RootState) => state.database.traits);

    return <div className="visual-novel-wrapper"></div>;
}
