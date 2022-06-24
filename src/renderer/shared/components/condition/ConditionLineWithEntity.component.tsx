import React from 'react';
import { Condition, TimeSelector, LocationSelector } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { FlagSelectionButton } from '../buttons/FlagSelectionButton';
import { ConditionInitiatorSelect } from './ConditionInitiatorSelect.component';
import { ConditionSelectorSelect } from './ConditionSelectorSelect.component';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRightSharp';
import CloseIcon from '@mui/icons-material/Close';
import { TraitSelectionButton } from '../buttons/TraitSelectionButton';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { ConditionAgentSelect } from './ConditionAgentSelect.component';
import { ConditionLineSummary } from '../summary/ConditionLineSummary.component';
import { RelationshipSelect } from './RelationshipSelect';
import { TimeSelect } from './TimeSelect.component';
import { LocationTypeSelect } from './LocationTypeSelect';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';

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

    const onTargetChange = (values: string[]): void => {
        const newCondition = Object.assign({}, conditionLine);

        newCondition.targets = values;

        onChange(index, newCondition);
    };

    const onParameterChange = (value: number | string, returnData: { index: number } = { index: 0 }): void => {
        const newCondition = Object.assign({}, conditionLine);

        newCondition.parameters[returnData.index] = value;

        onChange(index, newCondition);
    };

    const renderInitiatorTool = (condition: Condition): React.ReactElement | null => {
        switch (condition.initiator) {
            case ConditionInitiator.TRAIT:
                return <TraitSelectionButton displayIDs={condition.targets} onChange={onTargetChange} />;
            case ConditionInitiator.ENTITY_FILTERING:
            // return <EntityFilterEditor entityFilter={condition.entityFilter} onFilterChange={} />;
            // Change attribute_range/status_range into entity filter
            // Take into consideration following cases: If any character charisma is at least 50
            // If character X has 50 Charisma
            // If character X has Flag Y
            // If character X has more Charisma than Character Y

            case ConditionInitiator.RELATIONSHIP:
                return <RelationshipSelect condition={condition} onChange={onTargetChange} />;
            //Following initiators does not need selection tools, or they are specific to one selector
            case ConditionInitiator.TIME:
            case ConditionInitiator.LOCATION:
            default:
                return null;
        }
    };

    const renderActiveAgent = (condition: Condition): React.ReactElement | null => {
        //Not nescessary to set the actor in case of time initiator since it's the world date
        if (condition.initiator === ConditionInitiator.TIME || condition.initiator === ConditionInitiator.EVENT_FLAGGED || condition.initiator === ConditionInitiator.TRAIT) {
            return null;
        }

        return <ConditionAgentSelect condition={condition} activeAgent onChange={onSubComponentChangeOfCondition} />;
    };

    const renderSelectorTools = (condition: Condition): React.ReactElement | null => {
        switch (condition.selector) {
            case TimeSelector.IS_AFTER_DATE:
            case TimeSelector.IS_AT_DATE:
            case TimeSelector.IS_BEFORE_DATE:
                return <TimeSelect condition={condition} onChange={onParameterChange} />;
            case LocationSelector.IS_AT_LOCATION_OF_TYPE:
            case LocationSelector.IS_MOVING_TO_LOCATION_OF_TYPE:
                return <LocationTypeSelect condition={condition} onChange={onParameterChange} />;
            case LocationSelector.IS_AT_LOCATION_OF_TYPE_WITH_TARGET:
                return (
                    <>
                        <LocationTypeSelect condition={condition} onChange={onParameterChange} />;
                        <ConditionAgentSelect condition={condition} onChange={onSubComponentChangeOfCondition} />;
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box className="condition-line">
            <SubdirectoryArrowRightIcon fontSize="large" className="condition-line__icon" />

            <Box className="condition-line__wrapper">
                <Box className="condition-line__input-wrapper">
                    <ConditionInitiatorSelect condition={conditionLine} onChange={onSubComponentChangeOfCondition} />

                    <ConditionSelectorSelect condition={conditionLine} onChange={onSubComponentChangeOfCondition} />

                    {renderActiveAgent(conditionLine)}

                    {renderInitiatorTool(conditionLine)}

                    {renderSelectorTools(conditionLine)}
                </Box>

                <ConditionLineSummary condition={conditionLine} />
            </Box>

            {index !== 0 ? <CloseIcon className="condition-line__remove" fontSize="large" onClick={() => onRemove(index)} /> : null}
        </Box>
    );
}
