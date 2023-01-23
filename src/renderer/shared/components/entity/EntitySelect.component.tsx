import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariableValue, DynamicEntity } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';
import { GetEntityTypeOfDynamicEntity } from 'renderer/shared/utils/General';

interface IProps {
    entity: EntityVariableValue;
    onEntityChange: (entity: EntityVariableValue) => void;
    disabled?: boolean;
    entityFilterOptions: EntityFilterOptions;
}

export function EntitySelect({ entity, onEntityChange, disabled = false, entityFilterOptions }: IProps) {
    const { t } = useTranslation();

    const onSelectChange = (selectedValue: string): void => {
        if (Object.values(EntityType).includes(selectedValue as EntityType)) {
            onEntityChange({
                entityType: selectedValue as EntityType,
                specifiedDynamicEntities: null,
                specifiedDynamicEntity: null,
                value: null,
                variableKey: null,
            });
            return;
        }

        onEntityChange({
            entityType: GetEntityTypeOfDynamicEntity(selectedValue as DynamicEntity),
            specifiedDynamicEntity: selectedValue as DynamicEntity,
            specifiedDynamicEntities: null,
            value: null,
            variableKey: null,
        });
    };

    const getEntitiesOptions = (): React.ReactNode => {
        if (entityFilterOptions?.filteredEntities) {
            return (
                <>
                    <ListSubheader>{t('interface.editor.modifier.input_group_entities')}</ListSubheader>
                    {Object.values(EntityType)
                        .filter((obj: any) => entityFilterOptions.filteredEntities.indexOf(obj) !== -1)
                        .map((entity) => (
                            <MenuItem key={entity} value={entity}>
                                {t(entity)}
                            </MenuItem>
                        ))}

                    <ListSubheader>{t('interface.editor.modifier.input_group_dynamic_entities')}</ListSubheader>
                    {Object.values(DynamicEntity)
                        .filter((obj: any) => entityFilterOptions.filteredEntities.indexOf(obj) !== -1)
                        .map((entity) => (
                            <MenuItem key={entity} value={entity}>
                                {t(entity)}
                            </MenuItem>
                        ))}
                </>
            );
        }

        return (
            <>
                <ListSubheader>{t('interface.editor.modifier.input_group_entities')}</ListSubheader>
                {Object.values(EntityType).map((entity) => (
                    <MenuItem key={entity} value={entity}>
                        {t(entity)}
                    </MenuItem>
                ))}

                <ListSubheader>{t('interface.editor.modifier.input_group_dynamic_entities')}</ListSubheader>
                {Object.values(DynamicEntity).map((entity) => (
                    <MenuItem key={entity} value={entity}>
                        {t(entity)}
                    </MenuItem>
                ))}
            </>
        );
    };

    return (
        <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
            <Select
                value={t(entity?.specifiedDynamicEntity || entity?.entityType || '')}
                disabled={disabled}
                label={t('interface.editor.modifier.input_label_entity')}
                onChange={(e) => onSelectChange(e.target.value as string)}
            >
                <MenuItem value="" disabled>
                    {t('interface.editor.modifier.input_placeholder_entity')}
                </MenuItem>
            </Select>
        </FormControl>
    );
}
