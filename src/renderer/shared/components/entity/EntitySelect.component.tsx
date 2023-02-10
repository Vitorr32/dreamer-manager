import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EntityVariableValue, DynamicEntity } from 'renderer/shared/models/base/EntityVariableValue.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterOptions } from 'renderer/shared/models/options/EntityFilterOptions.model';

interface IProps {
    entity: EntityVariableValue;
    onEntityChange: (entityType: string) => void;
    disabled?: boolean;
    entityFilterOptions?: EntityFilterOptions;
}

export function EntitySelect({ entity, onEntityChange, disabled = false, entityFilterOptions }: IProps) {
    const { t } = useTranslation();

    const getEntitiesOptions = (): React.ReactNode[] => {
        console.log('entityFilterOptions', entityFilterOptions)
        if (entityFilterOptions?.filteredEntities) {
            return [
                <ListSubheader key="entities-subheader">{t('interface.editor.modifier.input_group_entities')}</ListSubheader>,
                ...Object.values(EntityType)
                    .filter((obj: any) => entityFilterOptions.filteredEntities.indexOf(obj) !== -1)
                    .map((entity) => (
                        <MenuItem key={entity} value={entity}>
                            {t(entity)}
                        </MenuItem>
                    )),
                <ListSubheader key="dynamic-subheader">{t('interface.editor.modifier.input_group_dynamic_entities')}</ListSubheader>,
                Object.values(DynamicEntity)
                    .filter((obj: any) => entityFilterOptions.filteredEntities.indexOf(obj) !== -1)
                    .map((entity) => (
                        <MenuItem key={entity} value={entity}>
                            {t(entity)}
                        </MenuItem>
                    )),
            ];
        }

        return [
            <ListSubheader key="entities-subheader">{t('interface.editor.modifier.input_group_entities')}</ListSubheader>,
            ...Object.values(EntityType).map((entity) => (
                <MenuItem key={entity} value={entity}>
                    {t(entity)}
                </MenuItem>
            )),
            <ListSubheader key="dynamic-subheader">{t('interface.editor.modifier.input_group_dynamic_entities')}</ListSubheader>,
            ...Object.values(DynamicEntity).map((entity) => (
                <MenuItem key={entity} value={entity}>
                    {t(entity)}
                </MenuItem>
            )),
        ];
    };

    return (
        <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
            <Select
                value={entity?.specifiedDynamicEntity || entity?.entityType || ''}
                disabled={disabled}
                label={t('interface.editor.modifier.input_label_entity')}
                onChange={(e) => onEntityChange(e.target.value as string)}
            >
                <MenuItem value="" disabled>
                    {t('interface.editor.modifier.input_placeholder_entity')}
                </MenuItem>

                {getEntitiesOptions()}
            </Select>
        </FormControl>
    );
}
