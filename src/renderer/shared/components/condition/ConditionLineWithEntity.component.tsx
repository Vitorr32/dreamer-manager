import React from 'react';
import { Condition, EntitySelector, TimeSelector } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { ConditionInitiatorSelect } from './ConditionInitiatorSelect.component';
import { ConditionSelectorSelect } from './ConditionSelectorSelect.component';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRightSharp';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { ConditionLineSummary } from '../summary/ConditionLineSummary.component';
import { TimeSelect } from './TimeSelect.component';
import { ConditionEntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ConditionEntityFilterEditor } from '../entity/ConditionEntityFilterEditor.component';
import { DEFAULT_ENTITY_FILTER } from 'renderer/shared/Constants';

interface IProps {
    conditionLine: Condition;
    index: number;
    onChange: (index: number, condition: Condition) => void;
    onRemove: (index: number) => void;
    options?: EffectEditorOptions;
}

export function ConditionLineWithEntity({ conditionLine, index, onChange, onRemove, options }: IProps) {
    const { t } = useTranslation();

    const onSubComponentChangeOfCondition = (condition: Condition): void => {
        onChange(index, condition);
    };

    const onConditionInitiatorChange = (initiator: ConditionInitiator): void => {
        const newCondition = CopyClassInstance(conditionLine);

        newCondition.initiator = initiator;
        if (newCondition.initiator === ConditionInitiator.ENTITY_FILTERING) {
            newCondition.entityFilter = {
                ...DEFAULT_ENTITY_FILTER,
                hasTarget: false,
                targetFilter: [],
            };
        } else {
            newCondition.entityFilter = null;
        }

        onChange(index, newCondition);
    };

    const onEntityFilterChange = (filter: ConditionEntityFilter, index: number): void => {
        const newCondition = CopyClassInstance(conditionLine);

        newCondition.entityFilter = filter;
        onChange(index, newCondition);
    };

    const onParameterChange = (value: number | string, returnData: { index: number } = { index: 0 }): void => {
        const newCondition = Object.assign({}, conditionLine);

        newCondition.parameters[returnData.index] = value;

        onChange(index, newCondition);
    };

    const renderInitiatorTool = (condition: Condition): React.ReactElement | null => {
        switch (condition.initiator) {
            case ConditionInitiator.ENTITY_FILTERING:
                return <ConditionEntityFilterEditor entityFilter={condition.entityFilter} onFilterChange={(filter) => onEntityFilterChange(filter, index)} />;
            // Change attribute_range/status_range into entity filter
            // Take into consideration following cases: If any character charisma is at least 50
            // If character X has 50 Charisma
            // If character X has Flag Y
            // If character X has more Charisma than Character Y

            case ConditionInitiator.RELATIONSHIP:
            // TODO: Think of a way to use the entity pattern to create relationship conditions.
            // return <RelationshipSelect condition={condition} onChange={onTargetChange} />;
            //Following initiators does not need selection tools, or they are specific to one selector
            default:
                return null;
        }
    };

    const renderSelectorTools = (condition: Condition): React.ReactElement | null => {
        switch (condition.selector) {
            case TimeSelector.IS_AFTER_DATE:
            case TimeSelector.IS_AT_DATE:
            case TimeSelector.IS_BEFORE_DATE:
                return <TimeSelect condition={condition} onChange={onParameterChange} />;
            default:
                return null;
        }
    };

    return (
        <Box className="condition-line">
            <SubdirectoryArrowRightIcon fontSize="large" className="condition-line__icon" />

            <Box className="condition-line__wrapper">
                <Box className="condition-line__input-wrapper">
                    <ConditionInitiatorSelect condition={conditionLine} onChange={onConditionInitiatorChange} />

                    <ConditionSelectorSelect condition={conditionLine} onChange={onSubComponentChangeOfCondition} />

                    {renderInitiatorTool(conditionLine)}

                    {renderSelectorTools(conditionLine)}
                </Box>

                <ConditionLineSummary condition={conditionLine} />
            </Box>

            {index !== 0 ? <CloseIcon className="condition-line__remove" fontSize="large" onClick={() => onRemove(index)} /> : null}
        </Box>
    );
}
