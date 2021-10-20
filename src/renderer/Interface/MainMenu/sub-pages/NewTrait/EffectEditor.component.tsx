import React from 'react';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';

interface IProps {
    effect: Effect;
    index: number;
    onChange: (index: number, effect: Effect) => void;
}

export function EffectEditor(props: IProps) {
    const onEffectChanged = (modifier: Modifier) => {
        const newEffect = Object.assign({}, props.effect);

        newEffect.modifier = modifier;

        props.onChange(props.index, newEffect);
    };

    return (
        <React.Fragment>
            <ConditionTreeEditor />
            <ModifierEditor modifier={props.effect.modifier} onChange={onEffectChanged} />
        </React.Fragment>
    );
}
