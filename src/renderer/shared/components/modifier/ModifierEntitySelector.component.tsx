import { Button, Dialog, DialogContent, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';

interface IProps {
    modifier: Modifier;
    onChange: (modifier: Modifier) => void;
    options?: EffectEditorOptions;
}

export function ModifierEntitySelector({ modifier, onChange, options }: IProps) {
    const { t } = useTranslation();

    const onEntityChange = (entity: Entity) => {
        console.log(entity);
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
                <Select value={modifier.targetEntity} label={t('interface.editor.modifier.input_label_entity')} onChange={(e) => onEntityChange(e.target.value as Entity)}>
                    {Object.values(Entity).map((entity) => (
                        <MenuItem value={entity}>{t(entity)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
