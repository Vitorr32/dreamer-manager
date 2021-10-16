import React from 'react';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';

interface IProps {
    effect: Effect;
    index: number;
    onChange: (index: number, effect: Effect) => void;
}
interface IState {}

export class EffectEditor extends React.Component<IProps, IState> {
    render() {
        console.log(this.props.effect);

        return (
            <React.Fragment>
                <ConditionTreeEditor />
                <ModifierEditor modifier={this.props.effect.modifier} />
            </React.Fragment>
        );
    }
}
