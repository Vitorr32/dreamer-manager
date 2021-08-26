import React from "react";
import { Condition, NumericSelector } from "../../../shared/models/base/Condition.model";
import './ConditionLine.style.scss';
import { ConditionInitiatorSelect } from "../ConditionInitiatorSelect/ConditionInitiatorSelect.component";
import { ConditionSelectorSelect } from "../ConditionSelectorSelect/ConditionSelectorSelect.component";
import { TextField } from "@material-ui/core";
import { NumericSelectorParameterInput } from "../NumericSelector/NumericSelector.component";

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

    }

    private renderSelectorParameters(condition: Condition): React.ReactElement | null {
        switch (condition.selector) {
            case NumericSelector.BETWEEN:
            case NumericSelector.BIGGER_THAN:
            case NumericSelector.BIGGER_THAN_SELF:
            case NumericSelector.BIGGER_THAN_TARGET:
            case NumericSelector.SMALLER_THAN:
            case NumericSelector.EXACTLY:
                return <NumericSelectorParameterInput condition={condition} onChange={this.onParameterChange.bind(this)} />
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