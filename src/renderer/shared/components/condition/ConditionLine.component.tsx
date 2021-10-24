import React from 'react';
import { Condition, NumericSelector, TraitSelector } from '../../../shared/models/base/Condition.model';
import { ConditionInitiator } from '../../../shared/models/enums/ConditionInitiator.enum';
import { AttributeSelectionButton } from '../buttons/AttributeSelectionButton.component';
import { ConditionInitiatorSelect } from './ConditionInitiatorSelect.component';
import { ConditionSelectorSelect } from './ConditionSelectorSelect.component';
import { NumericSelectorParameterInput } from './NumericSelector.component';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRightSharp';
import CloseIcon from '@mui/icons-material/Close';
import { TraitSelectionButton } from '../buttons/TraitSelectionButton';

interface IProps {
    conditionLine: Condition;
    index: number;
    onChange: (index: number, condition: Condition) => void;
    onRemove: (index: number) => void;
}
interface IState {
    conditionInitiatorAnchorEl: null | HTMLElement;
}

export class ConditionLine extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            conditionInitiatorAnchorEl: null,
        };
    }

    public componentDidMount(): void {}

    private onSubComponentChangeOfCondition(condition: Condition): void {
        this.props.onChange(this.props.index, condition);
    }

    private onParameterChange(value: string | number, returnData: { index: number }) {
        const newCondition = Object.assign({}, this.props.conditionLine);

        newCondition.parameters[returnData.index] = value;

        this.props.onChange(this.props.index, newCondition);
    }

    private renderAppropriateSelectorTool(condition: Condition): React.ReactElement | null {
        switch (condition.initiator) {
            case ConditionInitiator.TRAIT:
                return <TraitSelectionButton displayID={condition?.parameters[0]} onChange={this.onParameterChange.bind(this)} returnData={{ index: 0 }} />;
            case ConditionInitiator.ATTRIBUTE_RANGE:
                return <AttributeSelectionButton displayID={condition?.parameters[0]} onChange={this.onParameterChange.bind(this)} returnData={{ index: 0 }} />;
        }

        return null;
    }

    private renderSelectorParameters(condition: Condition): React.ReactElement | null {
        switch (condition.selector) {
            case NumericSelector.BIGGER_THAN:
            case NumericSelector.BIGGER_THAN_SELF:
            case NumericSelector.BIGGER_THAN_TARGET:
            case NumericSelector.SMALLER_THAN:
            case NumericSelector.EXACTLY:
                return <NumericSelectorParameterInput range={false} condition={condition} onChange={this.onParameterChange.bind(this)} />;
            case NumericSelector.BETWEEN:
                return <NumericSelectorParameterInput range={true} condition={condition} onChange={this.onParameterChange.bind(this)} />;
            case TraitSelector.HAS:
                return <NumericSelectorParameterInput range={true} condition={condition} onChange={this.onParameterChange.bind(this)} />;
            case NumericSelector.UNDEFINED:
                return null;
            default:
                console.error('Unknown selector for the parameter rendering: ' + condition.selector);
                return null;
        }
    }

    render() {
        const { conditionLine, index, onRemove } = this.props;

        return (
            <section className="condition-line">
                <SubdirectoryArrowRightIcon fontSize="large" className="condition-line__icon" />

                <ConditionInitiatorSelect condition={conditionLine} onChange={this.onSubComponentChangeOfCondition.bind(this)} />

                {this.renderAppropriateSelectorTool(conditionLine)}

                <ConditionSelectorSelect condition={conditionLine} onChange={this.onSubComponentChangeOfCondition.bind(this)} />

                {this.renderSelectorParameters(conditionLine)}

                {this.props.index !== 0 ? <CloseIcon className="condition-line__remove" fontSize="large" onClick={() => onRemove(index)} /> : null}
            </section>
        );
    }
}
