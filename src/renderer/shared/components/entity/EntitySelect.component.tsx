import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    entity: Entity;
    onEntityChange: (entity: Entity) => void;
    disabled?: boolean;
}

export function EntitySelect({ entity, onEntityChange, disabled }: IProps) {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth>
            <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
            <Select
                value={entity || Entity.NONE}
                disabled={disabled}
                label={t('interface.editor.modifier.input_label_entity')}
                onChange={(e) => onEntityChange(e.target.value as Entity)}
            >
                {Object.values(Entity).map((entity) => (
                    <MenuItem key={entity} value={entity}>
                        {t(entity)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
