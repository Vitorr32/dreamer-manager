import React from 'react';
import { Agent, Condition, NumericSelector, TraitSelector } from '../../../shared/models/base/Condition.model';
import { ConditionInitiator } from '../../../shared/models/enums/ConditionInitiator.enum';
import { AttributeSelectionButton } from '../buttons/AttributeSelectionButton.component';
import { ConditionInitiatorSelect } from './ConditionInitiatorSelect.component';
import { ConditionSelectorSelect } from './ConditionSelectorSelect.component';
import { NumericSelectorParameterInput } from './NumericSelector.component';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRightSharp';
import CloseIcon from '@mui/icons-material/Close';
import { TraitSelectionButton } from '../buttons/TraitSelectionButton';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { ConditionAgentSelect } from './ConditionAgentSelect.component';
import { ConditionLineSummary } from '../summary/ConditionLineSummary.component';
import { StaticStatusSelectionButton } from './StaticStatusSelect.component';
import { RelationshipSelect } from './RelationshipSelect';

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

    const onTargetChange = (values: string[]): void => {
        const newCondition = Object.assign({}, conditionLine);

        newCondition.targets = values;

        onChange(index, newCondition);
    };

    const onParameterChange = (value: number, returnData: { index: number }): void => {
        const newCondition = Object.assign({}, conditionLine);

        newCondition.parameters[returnData.index] = value;

        onChange(index, newCondition);
    };

    const renderInitiatorTool = (condition: Condition): React.ReactElement | null => {
        switch (condition.initiator) {
            case ConditionInitiator.TRAIT:
                return <TraitSelectionButton displayIDs={condition.targets} onChange={onTargetChange} />;
            case ConditionInitiator.ATTRIBUTE_RANGE:
                return <AttributeSelectionButton displayIDs={condition.targets} onChange={onTargetChange} />;
            case ConditionInitiator.STATUS_RANGE:
                return <StaticStatusSelectionButton condition={condition} onChange={onTargetChange} />;
            case ConditionInitiator.RELATIONSHIP:
                return <RelationshipSelect condition={condition} onChange={onTargetChange} />;
        }

        return null;
    };

    const renderActiveAgent = (condition: Condition): React.ReactElement | null => {
        return <ConditionAgentSelect condition={condition} activeAgent onChange={onSubComponentChangeOfCondition} />;
    };

    const renderSelectorTools = (condition: Condition): React.ReactElement | null => {
        switch (condition.selector) {
            case NumericSelector.BIGGER_THAN:
            case NumericSelector.SMALLER_THAN:
            case NumericSelector.EXACTLY:
                return <NumericSelectorParameterInput range={false} condition={condition} onChange={onParameterChange} />;
            case NumericSelector.BETWEEN:
                return <NumericSelectorParameterInput range={true} condition={condition} onChange={onParameterChange} />;

            case NumericSelector.BIGGER_THAN_TARGET:
            case NumericSelector.SMALLER_THAN_TARGET:
                return (
                    <>
                        <NumericSelectorParameterInput range={true} condition={condition} onChange={onParameterChange} />
                        <ConditionAgentSelect condition={condition} onChange={onSubComponentChangeOfCondition} />
                    </>
                );
            case TraitSelector.HAS:
                return <NumericSelectorParameterInput range={true} condition={condition} onChange={onParameterChange} />;
            case NumericSelector.UNDEFINED:
                return null;
            default:
                console.error('Unknown selector for the parameter rendering: ' + condition.selector);
                return null;
        }
    };

    return (
        <Box className="condition-line">
            <SubdirectoryArrowRightIcon fontSize="large" className="condition-line__icon" />

            <Box className="condition-line__wrapper">
                <Box className="condition-line__input-wrapper">
                    <ConditionInitiatorSelect condition={conditionLine} onChange={onSubComponentChangeOfCondition} />

                    {renderInitiatorTool(conditionLine)}

                    {renderActiveAgent(conditionLine)}

                    <ConditionSelectorSelect condition={conditionLine} onChange={onSubComponentChangeOfCondition} />

                    {renderSelectorTools(conditionLine)}
                </Box>

                <ConditionLineSummary condition={conditionLine} />
            </Box>

            {index !== 0 ? <CloseIcon className="condition-line__remove" fontSize="large" onClick={() => onRemove(index)} /> : null}
        </Box>
    );
}
