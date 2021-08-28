import React from "react";
import { Condition, NumericSelector } from "../../../shared/models/base/Condition.model";
import './ConditionLine.style.scss';
import { ConditionInitiatorSelect } from "../ConditionInitiatorSelect/ConditionInitiatorSelect.component";
import { ConditionSelectorSelect } from "../ConditionSelectorSelect/ConditionSelectorSelect.component";
import { NumericSelectorParameterInput } from "../NumericSelector/NumericSelector.component";
import { ConditionInitiator } from "../../../shared/models/enums/ConditionInitiator.enum";

interface IProps {
    conditionLine: Condition,
    index: number,
    onChange: (index: number, condition: Condition) => void,
}
interface IState {
    conditionInitiatorAnchorEl: null | HTMLElement;
}

export class ConditionLine extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            conditionInitiatorAnchorEl: null
        }
    }

    public componentDidMount(): void {

    }

    private onSubComponentChangeOfCondition(condition: Condition): void {
        this.props.onChange(this.props.index, condition)
    }

    private onParameterChange(index: number, value: number) {
        const newCondition = Object.assign({}, this.props.conditionLine)

        newCondition.parameters[index] = value;

        this.props.onChange(this.props.index, newCondition)
    }

    private renderAppropriateSelectorTool(condition: Condition): React.ReactElement | null {
        switch (condition.initiator) {
            case ConditionInitiator.SKILL_RANGE:
                return null
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
                return <NumericSelectorParameterInput range={false} condition={condition} onChange={this.onParameterChange.bind(this)} />
            case NumericSelector.BETWEEN:
                return <NumericSelectorParameterInput range={true} condition={condition} onChange={this.onParameterChange.bind(this)} />

            case NumericSelector.UNDEFINED:
                return null
            default:
                console.error('Unknown selector for the parameter rendering: ' + condition.selector)
                return null
        }
    }

    render() {
        const { conditionLine } = this.props

        return (
            <section className="condition-line-wrapper">
                <ConditionInitiatorSelect condition={conditionLine} onChange={this.onSubComponentChangeOfCondition.bind(this)} />
                <ConditionSelectorSelect condition={conditionLine} onChange={this.onSubComponentChangeOfCondition.bind(this)} />


                {
                    this.renderSelectorParameters(conditionLine)
                }
            </section>
        )
    }
}