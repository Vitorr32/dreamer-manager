import React from "react";
import { Condition } from "../../../shared/models/base/Condition.model";
import './ConditionLine.style.scss';
import { ConditionInitiatorSelect } from "../ConditionInitiatorSelect/ConditionInitiatorSelect.component";
import { ConditionSelectorSelect } from "../ConditionSelectorSelect/ConditionSelectorSelect.component";

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

    public componentDidUpdate() {
        this.updateRenderedElements(this.props.conditionLine)
    }

    public componentDidMount(): void {

    }

    private onSubComponentChangeOfCondition(condition: Condition): void {
        this.props.onChange(this.props.index, condition)
    }

    private updateRenderedElements(condition: Condition): void {

    }

    render() {
        const { conditionLine } = this.props

        return (
            <section className="condition-line-wrapper">
                <ConditionInitiatorSelect condition={conditionLine} onChange={this.onSubComponentChangeOfCondition.bind(this)} />
                <ConditionSelectorSelect condition={conditionLine} onChange={this.onSubComponentChangeOfCondition.bind(this)} />

            </section>
        )
    }
}