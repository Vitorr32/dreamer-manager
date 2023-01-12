import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariableValue, ShortcutFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    entity: EntityVariableValue;
    onEntityChange: (entity: EntityVariableValue) => void;
    disabled?: boolean;
}

export function EntitySelect({ entity, onEntityChange, disabled = false }: IProps) {
    const { t } = useTranslation();

    const onSelectChange = (selectedValue: string): void => {
        if (Object.values(EntityType).includes(selectedValue as EntityType)) {
            onEntityChange({
                entityType: selectedValue as EntityType,
                specifiedEntitiesFromShortcut: null,
                specifiedShortcut: null,
                value: null,
                variableKey: null,
            });
            return;
        }

        // onEntityChange({
        //     entityType: selectedValue as EntityType,
        //     specifiedEntitiesFromShortcut: null,
        //     specifiedShortcut: null,
        //     value: null,
        //     variableKey: null,
        // });
    };

    return (
        <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
            <Select
                value={entity || ''}
                disabled={disabled}
                label={t('interface.editor.modifier.input_label_entity')}
                onChange={(e) => onSelectChange(e.target.value as string)}
            >
                <ListSubheader>{t('interface.editor.modifier.input_group_entities')}</ListSubheader>
                {Object.values(EntityType).map((entity) => (
                    <MenuItem key={entity} value={entity}>
                        {t(entity)}
                    </MenuItem>
                ))}

                <ListSubheader>{t('interface.editor.modifier.input_group_shortcuts')}</ListSubheader>
                {Object.values(ShortcutFilter).map((entity) => (
                    <MenuItem key={entity} value={entity}>
                        {t(entity)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
