import { useState } from 'react';
import { ModifierEditor } from 'renderer/shared/components/modifier/ModifierEditor.component';
import { Effect, Period, Trigger } from 'renderer/shared/models/base/Effect.model';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { Box, Button, Chip, Divider, FormHelperText, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { CopyClassInstance, FilterPossibleDynamicEntitiesForTriggerType } from 'renderer/shared/utils/General';
import { useTranslation } from 'react-i18next';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { EffectPeriodSelection } from './EffectPeriodSelection.component';
import { EffectTriggerSelection } from './EffectTriggerSelection.component';
import { CompositeEntityFilter } from '../entity/CompositeEntityFilter.component';

interface IProps {
    effect: Effect;
    index: number;
    onChange: (index: number, effect: Effect) => void;
    options?: EntityFilterOptions;
}

export function EffectEditor({ effect, index, onChange, options }: IProps) {
    const { t, i18n } = useTranslation();

    const [expandedOptions, setExpandedOptions] = useState<EntityFilterOptions>(options);

    const onEffectChanged = (key: 'trigger' | 'conditionTree' | 'periodValue' | 'periodType', value: any) => {
        const newEffect = CopyClassInstance(effect);
        newEffect[key] = value;
        if (key === 'trigger') {
            onTriggerTypeChanged(value as Trigger);
        }

        if (key === 'periodType') {
            newEffect.periodValue = newEffect.periodType === Period.SPECIFIC_DATE_FROM_TO ? ['', ''] : '';
        }
        onChange(index, newEffect);
    };

    const onModifierChanged = (modifierIndex: number, modifier: Modifier) => {
        const updatedEffect = CopyClassInstance(effect);
        updatedEffect.modifiers[modifierIndex] = modifier;
        onChange(index, updatedEffect);
    };

    const onTriggerTypeChanged = (triggerType: Trigger) => {
        setExpandedOptions({
            ...(options || {}),
            ...(expandedOptions || {}),
            filteredDynamicEntities: FilterPossibleDynamicEntitiesForTriggerType(triggerType, effect.source?.type),
        });
    };

    const onAddConditionTree = () => {
        if (effect.conditionTree) {
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

    const onModifierListAddition = (): void => {
        const updatedEffect = CopyClassInstance(effect);
        updatedEffect.modifiers.push(new Modifier());
        onChange(index, updatedEffect);
    };

    const onModifierListRemoval = (toRemoveIndex: number) => {
        const updatedEffect = CopyClassInstance(effect);
        updatedEffect.modifiers.splice(toRemoveIndex, 1);
        onChange(index, updatedEffect);
    };

    return (
        <>
            <Paper sx={{ bgcolor: 'background.default', padding: '10px 20px' }} elevation={1}>
                <Box sx={{ borderColor: 'text.primary', position: 'relative' }}>
                    <Typography sx={{ color: 'text.primary' }} variant="h6">
                        {t('interface.editor.modifier.title')}
                    </Typography>
                    <FormHelperText>{t('interface.editor.modifier.subtitle')}</FormHelperText>

                    <Button sx={{ position: 'absolute', right: '0', top: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={onModifierListAddition}>
                        {t('interface.editor.modifier.button_add_modifier')}
                    </Button>
                </Box>

                {effect.modifiers.map((modifier, modifierIndex) => (
                    <Box sx={{ borderColor: 'text.primary' }} key={`effect_${index}_modifier_$${modifierIndex}`}>
                        <Divider sx={{ margin: '10px 0', borderColor: 'text.primary' }}>
                            <Chip label={t('interface.editor.modifier.divider_modifier_label', { index: modifierIndex + 1 })} />
                            {modifierIndex !== 0 && (
                                <Tooltip title={t('interface.editor.modifier.button_remove_modifier')}>
                                    <IconButton sx={{ marginLeft: '5px' }} onClick={() => onModifierListRemoval(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Divider>

                        <ModifierEditor modifier={modifier} onChange={(modifier) => onModifierChanged(modifierIndex, modifier)} options={options} />
                    </Box>
                ))}
            </Paper>

            <Paper sx={{ bgcolor: 'background.default', padding: '10px 20px' }} elevation={1}>
                <Typography sx={{ color: 'text.primary' }} variant="h6">
                    {t('interface.editor.condition.title')}
                </Typography>
                <FormHelperText>{t('interface.editor.condition.helper_text')}</FormHelperText>

                <Box sx={{ display: 'flex', columnGap: '20px', alignItems: 'center', marginTop: '10px' }}>
                    {effect.conditionTree ? (
                        <>
                            <Button variant="contained" onClick={onRemoveConditionTree}>
                                {t('interface.editor.condition.remove_condition_label')}
                            </Button>

                            <FormHelperText>{t('interface.editor.condition.remove_condition_helper')}</FormHelperText>
                        </>
                    ) : (
                        <>
                            <Button variant="contained" onClick={onAddConditionTree}>
                                {t('interface.editor.condition.add_condition_label')}
                            </Button>

                            <FormHelperText>{t('interface.editor.condition.add_condition_helper')}</FormHelperText>
                        </>
                    )}
                </Box>

                {effect.conditionTree && (
                    <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                        <EffectTriggerSelection
                            effectTrigger={effect.trigger}
                            effectSource={effect.source}
                            onTriggerChange={(trigger) => onEffectChanged('trigger', trigger)}
                        />

                        {effect.trigger && (
                            <CompositeEntityFilter
                                filterTree={effect.conditionTree}
                                onFilterTreeChange={(conditionTree) => onEffectChanged('conditionTree', conditionTree)}
                                entityFilterOptions={expandedOptions}
                            />
                        )}

                        <EffectPeriodSelection
                            effectPeriod={effect.periodType}
                            effectPeriodValue={effect.periodValue}
                            effectSource={effect.source}
                            onPeriodChange={(periodType) => onEffectChanged('periodType', periodType)}
                            onPeriodValueChange={(value) => onEffectChanged('periodValue', value)}
                        />
                    </Box>
                )}
            </Paper>
        </>
    );
}
