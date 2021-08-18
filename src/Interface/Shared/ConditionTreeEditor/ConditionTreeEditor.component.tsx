import React from "react";
import { Condition } from "../../../shared/models/base/Condition.model";
import { ConditionLine } from "../ConditionLine/ConditionLine.component";
import './ConditionTreeEditor.style.scss'

interface IProps {
}
interface IState {
    condition: Condition
}

export class ConditionTreeEditor extends React.Component<IProps, IState> {

    render() {
        return (
            <section className="condition-tree-editor">
                <ConditionLine />
            </section>
        )
    }
}