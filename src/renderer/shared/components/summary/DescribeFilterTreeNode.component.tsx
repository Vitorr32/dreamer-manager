import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { FilterNode } from 'renderer/shared/models/base/FilterNode.model';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';

interface IProps {
    filterNode: FilterNode;
    isRoot?: boolean;
    depth?: number;
}

export function DescribeFilterTreeNode({ filterNode, isRoot = false, depth = 0 }: IProps) {
    const { t } = useTranslation();

    const database = useSelector((state: RootState) => state.database);

    const renderModifierLine = (modifier: Modifier[]) => {};

    const getEntityString = ({ modifiedEntityVariables }: Modifier) => {
        // Check to see if the value of the modifier is a dynamic entity that needs to be mapped using the database of the game.
        if (Object.values(DynamicEntity).includes(modifiedEntityVariables.value)) {
            switch (modifiedEntityVariables.value) {
                case DynamicEntity.SELF:
                    // return
                    break;
                default:
                    return 'Yolo';
            }
        }
        return '';
    };

    return <></>;
}
