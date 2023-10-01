import { FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DynamicEntity } from 'renderer/shared/models/enums/DynamicEntity.enum';
import { EntityVariableValue } from 'renderer/shared/models/interfaces/EntityVariableValue.interface';
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
        return [
            <ListSubheader key="dynamic-subheader">{t('interface.editor.modifier.input_group_dynamic_entities')}</ListSubheader>,
            ...Object.values(DynamicEntity)
                .filter((obj: any) => (entityFilterOptions?.filteredDynamicEntities ? entityFilterOptions?.filteredDynamicEntities.indexOf(obj) !== -1 : true))
                .map((dynamicEntity) => (
                    <MenuItem key={dynamicEntity} value={dynamicEntity}>
                        {t(dynamicEntity)}
                    </MenuItem>
                )),
            <ListSubheader key="entities-subheader">{t('interface.editor.modifier.input_group_entities')}</ListSubheader>,
            ...Object.values(EntityType).map((entityTypes) => (
                <MenuItem key={entityTypes} value={entityTypes}>
                    {t(entityTypes)}
                </MenuItem>
            )),
        ];
    };

    return (
        <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel>{t('interface.editor.modifier.input_label_entity')}</InputLabel>
            <Select
                value={entityFilterOptions?.isLookingForSpecificEntity || entity?.specifiedDynamicEntity || entity?.entityType || ''}
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
