import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Affluence, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { Dreamer, FamilySituation } from 'renderer/shared/models/base/Dreamer.model';

interface IProps {
    dreamer: Dreamer;
    onChange: (key: CharacterVariablesKey, value: any) => void;
    onNextStep: () => void;
    onPreviousStep: () => void;
}

export function DreamerInfoEditor({ dreamer, onChange }: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();

    console.log(Dreamer._variables);

    return (
        <Box className="dreamer-editor" sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl>
                <InputLabel>{t('interface.editor.character.input_label_family')}</InputLabel>
                <Select
                    value={dreamer.familySituation || ''}
                    label={t('interface.editor.character.input_label_family')}
                    onChange={(ev) => onChange(CharacterVariablesKey.FAMILY_SITUATION, ev.target.value)}
                >
                    <MenuItem disabled value="">
                        {t('interface.editor.character.input_placeholder_family')}
                    </MenuItem>
                    {Object.values(FamilySituation).map((enumValue) => (
                        <MenuItem key={enumValue} value={enumValue}>
                            {t(enumValue)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.character.input_helper_family')}</FormHelperText>
            </FormControl>
        </Box>
    );
}
