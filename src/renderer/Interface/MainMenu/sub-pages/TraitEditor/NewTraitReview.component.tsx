import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { Alert, Button, Typography } from '@mui/material';
import { EffectSummary } from 'renderer/shared/components/summary/EffectSummary.component';

interface IProps {
    trait: Trait;
    fieldsValidation?: any;
    previousStep: () => void;
    onSubmit: () => void;
}

export function NewTraitReview({ trait, fieldsValidation = {}, previousStep, onSubmit }: IProps) {
    const { t, i18n } = useTranslation();

    return (
        <Box sx={{ color: 'text.primary', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box>
                <img src={trait.absoluteIconPath} alt={`${trait.id}_icon`} />
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.id_label')}</Typography>
                    <Typography>{trait.id}</Typography>
                    <Typography variant="subtitle1">{fieldsValidation.id}</Typography>
                </Box>
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.name_label')}</Typography>
                    <Typography>{trait.getName(i18n.language)}</Typography>
                    <Typography variant="subtitle1">{fieldsValidation.name}</Typography>
                </Box>
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.description_label')}</Typography>
                    <Typography>{trait.getDescription(i18n.language)}</Typography>
                    {fieldsValidation.description && <Alert severity="error">{fieldsValidation.description}</Alert>}
                </Box>
            </Box>
            <Box>
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.type_label')}</Typography>
                    <Typography>{t(trait.type)}</Typography>
                    <Typography variant="subtitle1">{fieldsValidation.type}</Typography>
                </Box>
                <Box>
                    <Typography variant="overline">{t('interface.editor.trait.spawn_label')}</Typography>
                    <Typography>{trait.spawnable ? t('interface.editor.trait.is_spawnable') : t('interface.editor.trait.not_spawnable')}</Typography>
                </Box>
            </Box>

            <Box>
                {trait.effects.map((effect, index) => (
                    <EffectSummary key={'effect_' + index} effect={effect} />
                ))}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Button color="primary" onClick={previousStep}>
                    {t('interface.commons.previous')}
                </Button>
                <Button color="primary" onClick={onSubmit}>
                    {t('interface.commons.submit')}
                </Button>
            </Box>
        </Box>
    );
}
