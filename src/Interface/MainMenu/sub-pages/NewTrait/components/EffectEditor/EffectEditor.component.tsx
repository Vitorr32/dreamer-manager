import React from "react";
import { Effect } from "../../../../../../shared/models/base/Effect.model";
import { ConditionTreeEditor } from "../../../../../Shared/ConditionTreeEditor/ConditionTreeEditor.component";

interface IProps {
    effect: Effect
}
interface IState {

}

export class EffectEditor extends React.Component<IProps, IState> {

    render() {
        return (
            <React.Fragment>
                <ConditionTreeEditor />
                <div>
                    Yolo
                </div>
            </React.Fragment>
        )
    }
}