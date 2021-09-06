import React from "react";
import { Effect } from "renderer/shared/models/base/Effect.model";
import { ConditionTreeEditor } from "../../components/ConditionTreeEditor.component";

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
            </React.Fragment>
        )
    }
}
