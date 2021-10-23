import React from 'react';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
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

    const onConditionChanged = (conditionTree: ConditionTree) => {
        const newEffect = Object.assign({}, props.effect);

        newEffect.conditionTree = conditionTree;

        props.onChange(props.index, newEffect);
    };

    return (
        <React.Fragment>
            <ModifierEditor modifier={props.effect.modifier} onChange={onEffectChanged} />
            <ConditionTreeEditor conditionTree={props.effect.conditionTree} onChange={onConditionChanged} />
        </React.Fragment>
    );
}
