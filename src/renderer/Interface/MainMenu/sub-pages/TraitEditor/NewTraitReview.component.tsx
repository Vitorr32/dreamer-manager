import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { Alert, Button, Paper, Typography } from '@mui/material';
import { EffectSummary } from 'renderer/shared/components/summary/EffectSummary.component';
import { ResourcesSearch } from 'renderer/shared/components/file/ResourcesSearch';
import { useEffect, useState } from 'react';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { StaticResourceSelection } from 'renderer/shared/components/file/StaticResourceSelection';
import { DATABASE_FOLDER, TRAIT_DATABASE_FOLDER } from 'renderer/shared/Constants';

interface IProps {
    trait: Trait;
    fieldsValidation?: any;
    currentPackage: string;
    previousStep: () => void;
    onChange: (trait: Trait) => void;
    onSubmit: () => void;
}

export function NewTraitReview({ trait, fieldsValidation = {}, currentPackage, previousStep, onChange, onSubmit }: IProps) {
    const { t, i18n } = useTranslation();

    const [selectedPackage, setSelectedPackage] = useState<string>(currentPackage);
    const [isResourceSelectionOpen, setResourceSelectionState] = useState<boolean>(false);
    const [originalTrait, setOriginalTrait] = useState<Trait>();

    const onFileMetadataChange = (fileName: string, absolutePath: string, relativePath: string[]) => {
        const newTrait = CopyClassInstance(trait);
        newTrait.setFileMetadata(relativePath, fileName, selectedPackage);
        onChange(newTrait);
    };

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

            <Paper sx={{ padding: '10px' }}>
                <Typography variant="h5">{t('interface.editor.trait.metadata_title')}</Typography>

                <Box sx={{ display: 'flex' }}>
                    <Button onClick={() => setResourceSelectionState(true)}>{t('interface.editor.trait.metadata_button_file_selection')}</Button>
                    <StaticResourceSelection
                        isOpen={isResourceSelectionOpen}
                        onClose={() => setResourceSelectionState(false)}
                        onResourceSelected={onFileMetadataChange}
                        targetPackage={selectedPackage}
                        rootFolder={[DATABASE_FOLDER, TRAIT_DATABASE_FOLDER]}
                    />
                </Box>
            </Paper>
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
