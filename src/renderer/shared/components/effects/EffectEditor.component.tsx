import { useState } from 'react';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect, Trigger } from 'renderer/shared/models/base/Effect.model';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { Box, Button, FormHelperText, Paper, Typography } from '@mui/material';
import { CopyClassInstance, FilterPossibleDynamicEntitiesForTriggerType } from 'renderer/shared/utils/General';
import { useTranslation } from 'react-i18next';
import { CompositeEntityFilter } from '../entity/CompositeEntityFilter.component';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { EffectTriggerSelection } from './EffectTriggerSelection.component';
import { EffectPeriodSelection } from './EffectPeriodSelection.component';
interface IProps {
    effect: Effect;
    index: number;
    onChange: (index: number, effect: Effect) => void;
    options?: EntityFilterOptions;
}

export function EffectEditor({ effect, index, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const [expandedOptions, setExpandedOptions] = useState<EntityFilterOptions>(options);

    const onEffectChanged = (key: 'modifier' | 'trigger' | 'conditionTree' | 'periodValue' | 'periodType', value: any) => {
        const newEffect = CopyClassInstance(effect);
        // @ts-ignore
        newEffect[key] = value;
        if (key === 'trigger') {
            onTriggerTypeChanged(value as Trigger);
        }
        onChange(index, newEffect);
    };

    const onTriggerTypeChanged = (triggerType: Trigger) => {
        console.log('triggerType',  triggerType)
        console.log('FilterPossibleDynamicEntitiesForTriggerType',  FilterPossibleDynamicEntitiesForTriggerType(triggerType, effect.sourceType))
        setExpandedOptions({
            ...(expandedOptions || {}),
            filteredEntities: FilterPossibleDynamicEntitiesForTriggerType(triggerType, effect.sourceType)
        })
    };

    const onAddConditionTree = () => {
        if (!!effect.conditionTree) {
            console.error('Tree already is there');
            return;
        }

        const updatedEffect = CopyClassInstance(effect);
        const newConditionTree = new EntityFilterTree();
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
            <ModifierEditor modifier={effect.modifier} onChange={(modifier) => onEffectChanged('modifier', modifier)} options={options} />

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

                {effect.conditionTree && (
                    <Box sx={{ marginTop: '20px' }}>
                        <EffectTriggerSelection
                            effectTrigger={effect.trigger}
                            effectSource={effect.sourceType}
                            onTriggerChange={(trigger) => onEffectChanged('trigger', trigger)}
                        />

                        <CompositeEntityFilter
                            filterTree={effect.conditionTree}
                            onFilterTreeChange={(conditionTree) => onEffectChanged('conditionTree', conditionTree)}
                            entityFilterOptions={options}
                        />

                        <EffectPeriodSelection
                            effectPeriod={effect.periodType}
                            effectPeriodValue={effect.periodValue}
                            effectSource={effect.sourceType}
                            onPeriodChange={(periodType) => onEffectChanged('periodType', periodType)}
                            onPeriodValueChange={(value) => onEffectChanged('periodValue', value)}
                        />
                    </Box>
                )}
            </Paper>
        </>
    );
}
