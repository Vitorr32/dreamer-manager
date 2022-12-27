import React from 'react';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Modifier, ModifierTypeSection } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { Box, Button, FormHelperText, Paper, Typography } from '@mui/material';
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

    const onRemoveConditionTree = () => {
        if (!effect.conditionTree) {
            console.error('The tree is not there!');
            return;
        }

        const updatedEffect = CopyClassInstance(effect);

        updatedEffect.conditionTree = null;
        onChange(index, updatedEffect);
    };

    return (
        <>
            <ModifierEditor modifier={effect.modifier} onChange={onEffectChanged} options={options} />

            <Paper sx={{ bgcolor: 'background.default', padding: '10px 20px' }} elevation={1}>
                <Typography sx={{ color: 'text.primary' }} variant="h6">
                    {t('interface.editor.condition.title')}
                </Typography>
                <FormHelperText>{t('interface.editor.condition.helper_text')}</FormHelperText>

                <Box sx={{ display: 'flex', columnGap: '20px', alignItems: 'center', marginTop: '10px' }}>
                    {!effect.conditionTree && (
                        <>
                            <Button variant="contained" onClick={onAddConditionTree}>
                                {t('interface.editor.condition.add_condition_label')}
                            </Button>

                            <FormHelperText>{t('interface.editor.condition.add_condition_helper')}</FormHelperText>
                        </>
                    )}

                    {effect.conditionTree && (
                        <>
                            <Button variant="contained" onClick={onRemoveConditionTree}>
                                {t('interface.editor.condition.remove_condition_label')}
                            </Button>

                            <FormHelperText>{t('interface.editor.condition.remove_condition_helper')}</FormHelperText>
                        </>
                    )}
                </Box>

                <ConditionTreeEditor conditionTree={effect.conditionTree} onChange={onConditionChanged} />
            </Paper>
        </>
    );
}
