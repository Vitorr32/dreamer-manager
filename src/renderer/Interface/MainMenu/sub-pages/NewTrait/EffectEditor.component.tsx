import React from 'react';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Modifier, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
interface IProps {
    effect: Effect;
    index: number;
    onChange: (index: number, effect: Effect) => void;
    options?: EffectEditorOptions;
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
            <ModifierEditor modifier={props.effect.modifier} onChange={onEffectChanged} filteredTypes={[ModifierTypeSection.EVENT_SECTION, ModifierTypeSection.TRAIT_SECTION]} />
            <ConditionTreeEditor conditionTree={props.effect.conditionTree} onChange={onConditionChanged} options={props.options} />
        </React.Fragment>
    );
}
