import { Condition, EntitySelector } from '../../models/base/Condition.model';
import { ConditionSelectorSelect } from './ConditionSelectorSelect.component';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRightSharp';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { ConditionLineSummary } from '../summary/ConditionLineSummary.component';
import { ConditionEntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ConditionEntityFilterEditor } from '../entity/ConditionEntityFilterEditor.component';

interface IProps {
    conditionLine: Condition;
    index: number;
    onChange: (index: number, condition: Condition) => void;
    onRemove: (index: number) => void;
    options?: EffectEditorOptions;
}

export function ConditionLine({ conditionLine, index, onChange, onRemove, options }: IProps) {
    const { t } = useTranslation();

    const onSubComponentChangeOfCondition = (condition: Condition): void => {
        onChange(index, condition);
    };

    const onEntityFilterChange = (filter: ConditionEntityFilter, index: number): void => {
        const newCondition = CopyClassInstance(conditionLine);

        newCondition.entityFilter = filter;
        onChange(index, newCondition);
    };

    return (
        <Box className="condition-line">
            <SubdirectoryArrowRightIcon fontSize="large" className="condition-line__icon" />

            <Box className="condition-line__wrapper">
                <Box className="condition-line__input-wrapper">
                    <ConditionSelectorSelect condition={conditionLine} onChange={onSubComponentChangeOfCondition} />

                    {conditionLine.selector && conditionLine.selector !== EntitySelector.UNDEFINED && (
                        <ConditionEntityFilterEditor
                            entityFilter={conditionLine.entityFilter}
                            onFilterChange={(filter) => onEntityFilterChange(filter, index)}
                            options={options}
                        />
                    )}
                </Box>

                <ConditionLineSummary condition={conditionLine} />
            </Box>

            {index !== 0 ? <CloseIcon className="condition-line__remove" fontSize="large" onClick={() => onRemove(index)} /> : null}
        </Box>
    );
}
