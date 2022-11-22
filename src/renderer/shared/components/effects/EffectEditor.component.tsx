import React from 'react';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Modifier, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { Button } from '@mui/material';
import { Condition } from 'renderer/shared/models/base/Condition.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { useTranslation } from 'react-i18next';
interface IProps {
    effect: Effect;
    index: number;
    onChange: (index: number, effect: Effect) => void;
    options?: EffectEditorOptions;
}

export function EffectEditor({ effect, index, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const onEffectChanged = (modifier: Modifier) => {
        const newEffect = CopyClassInstance(effect);

        newEffect.modifier = modifier;

        onChange(index, newEffect);
    };

    const onConditionChanged = (conditionTree: ConditionTree) => {
        const newEffect = CopyClassInstance(effect);

        newEffect.conditionTree = conditionTree;

        onChange(index, newEffect);
    };

    const onAddConditionTree = () => {
        if (!!effect.conditionTree) {
            console.error('Tree already is there');
            return;
        }

        const updatedEffect = CopyClassInstance(effect);
        const newConditionTree = new ConditionTree();
        newConditionTree.root.conditions = [new Condition()];

        updatedEffect.conditionTree = newConditionTree;

        onChange(index, updatedEffect);
    };

    return (
        <React.Fragment>
            <ModifierEditor modifier={effect.modifier} onChange={onEffectChanged} options={options} />

            {(!options || options.allowConditionTree) && (
                <>
                    <Button variant="contained" onClick={onAddConditionTree}>
                        {t('interface.editor.condition.add_condition_label')}
                    </Button>
                    <ConditionTreeEditor conditionTree={effect.conditionTree} onChange={onConditionChanged} />
                </>
            )}
        </React.Fragment>
    );
}
