import React from "react";
import { ConditionTreeEditor } from "renderer/shared/components/condition/ConditionTreeEditor.component";
import { Effect } from "renderer/shared/models/base/Effect.model";

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
