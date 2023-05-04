import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Effect, Source } from 'renderer/shared/models/base/Effect.model';
import { MAX_NUMBER_OF_EFFECTS } from 'renderer/shared/Constants';
import { EffectEditor } from '../../../../shared/components/effects/EffectEditor.component';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { EffectSummary } from 'renderer/shared/components/summary/EffectSummary.component';
import { EffectList } from 'renderer/shared/components/effects/EffectList.component';
import { CopyClassInstance } from 'renderer/shared/utils/General';

interface IProps {
    previousStep: () => void;
    nextStep: () => void;
    trait: Trait;
    onChange: (trait: Trait) => void;
}

export function EffectsAndConditions({ previousStep, nextStep, onChange, trait }: IProps) {
    const { t } = useTranslation();

    const [editEffectIndex, setEditEffectIndex] = useState<number>(-1);

    const onNewEffectAddedToList = (): void => {
        const newTrait = CopyClassInstance(trait);
        newTrait.effects.push(new Effect(trait.id, Source.TRAIT));

        onChange(newTrait);
    };

    const onEditEffect = (index: number, effect: Effect): void => {
        const newTrait = CopyClassInstance(trait);
        newTrait.effects[index] = effect;

        onChange(newTrait);
    };

    const onDeleteEffectFromList = (index: number): void => {
        const newTrait = CopyClassInstance(trait);
        newTrait.effects.splice(index, 1);

        onChange(newTrait);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}>
            <Typography variant="caption" sx={{ color: 'text.primary', marginTop: '20px', display: 'block' }}>
                {t('interface.editor.effect.effect_instruction', { max: MAX_NUMBER_OF_EFFECTS })}
            </Typography>

            <Box className="effect-editor__list-wrapper">
                <EffectList effects={trait.effects} onEffectSelected={(index) => setEditEffectIndex(index)} onEffectDeleted={(index) => onDeleteEffectFromList(index)} />

                {trait.effects.length < MAX_NUMBER_OF_EFFECTS ? (
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={onNewEffectAddedToList}>
                        {t('interface.editor.effect.add_effect')}
                    </Button>
                ) : null}
            </Box>

            {editEffectIndex !== -1 && (
                <EffectEditor
                    onChange={onEditEffect}
                    index={editEffectIndex}
                    effect={trait.effects[editEffectIndex]}
                    options={{
                        sourceType: Source.TRAIT,
                        sourceID: trait.id,
                    }}
                />
            )}

            {trait.effects.map((effect, index) => (
                <EffectSummary key={'effect_' + index} effect={effect} />
            ))}

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Button color="primary" onClick={previousStep}>
                    {t('interface.commons.previous')}
                </Button>
                <Button color="primary" onClick={nextStep}>
                    {t('interface.commons.next')}
                </Button>
            </Box>
        </Box>
    );
}
