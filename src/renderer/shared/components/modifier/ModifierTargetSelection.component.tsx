import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions, EffectOriginType } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ExternalExpandedEntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { DEFAULT_ENTITY_FILTER, DEFAULT_EXTERNAL_ENTITY_FILTER, PLAYER_AGENCY } from 'renderer/shared/Constants';
import { VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { Agency } from 'renderer/shared/models/base/Agency.model';

interface IProps {
    modifier: Modifier;
    onModifierTargetChange: (filter: ExternalExpandedEntityFilter[]) => void;
    onModifierReceptorChange: (filter: ExternalExpandedEntityFilter[]) => void;
    options?: EffectEditorOptions;
}

enum ShortcutFilter {
    //Character Entity Shortcuts
    PROTAGONIST = 'model.modifier.targeting.protagonist',
    ALL_DREAMERS_OF_STUDIO = 'model.modifier.targeting.allStudioDreamers',
    ALL_STAFF_OF_STUDIO = 'model.modifier.targeting.allStudioStaff',
    EVERYONE_ON_STUDIO = 'model.modifier.targeting.allStudioEmployees',
    EVERYONE = 'model.modifier.targeting.everyCharacter',
    SELF = 'model.modifier.targeting.self',
    SELF_PRODUCER = 'model.modifier.targeting.selfProducer',
    SELF_FRIENDS = 'model.modifier.targeting.selfFriends',
    SELF_RIVALS = 'model.modifier.targeting.selfRivals',

    MC_STUDIO = 'model.modifier.targeting.mainStudio',
    ALL_ACTORS = 'model.modifier.targeting.allActors',
}

export function ModifierTargetSelection({ modifier, onModifierTargetChange, onModifierReceptorChange, options }: IProps) {
    const { t } = useTranslation();
    const { targetEntityFilter, originEntityFilter } = modifier;

    const [quickTarget, setQuickTarget] = useState<ShortcutFilter>();

    const onFilterChanged = (updatedFilters: ExternalExpandedEntityFilter[], isTarget: boolean = true) => {
        if (isTarget) {
            onModifierTargetChange(updatedFilters);
        } else {
            onModifierReceptorChange(updatedFilters);
        }
    };

    const getShortcutTargets = (): ShortcutFilter[] => {
        const shortcuts: ShortcutFilter[] = [];
        switch (modifier.modifiedEntityVariable.entity) {
            case Entity.CHARACTERS:
                shortcuts.push(
                    ShortcutFilter.PROTAGONIST,
                    ShortcutFilter.ALL_DREAMERS_OF_STUDIO,
                    ShortcutFilter.ALL_STAFF_OF_STUDIO,
                    ShortcutFilter.EVERYONE_ON_STUDIO,
                    ShortcutFilter.EVERYONE
                );

                if (options.effectOriginType === EffectOriginType.TRAIT) {
                    shortcuts.push(ShortcutFilter.SELF, ShortcutFilter.SELF_PRODUCER);
                }

                break;
            case Entity.ACTORS:
                shortcuts.push(ShortcutFilter.ALL_ACTORS);
            default:
                console.error('No entity selected, or uknown entity' + modifier.modifiedEntityVariable.entity);
                break;
        }

        return shortcuts;
    };

    const onShortcutFilterSelected = (shortcut: ShortcutFilter, isTargetFilter: boolean = true) => {
        let shortcutEntityFilter: ExternalExpandedEntityFilter = DEFAULT_EXTERNAL_ENTITY_FILTER;
        let secondaryFilter: ExternalExpandedEntityFilter = DEFAULT_EXTERNAL_ENTITY_FILTER;
        switch (shortcut) {
            case ShortcutFilter.EVERYONE:
                // To set the Everyone filter, just get all character of age bigger than 0, which means everyone currently instantiated in game.
                shortcutEntityFilter.entity = Entity.CHARACTERS;
                shortcutEntityFilter.operator = VariableOperator.BIGGER_THAN;
                shortcutEntityFilter.variableKey = Character.getEntityVariables()['age'].key;
                shortcutEntityFilter.value = 0;

                onFilterChanged([shortcutEntityFilter], isTargetFilter);
                break;
            case ShortcutFilter.ALL_DREAMERS_OF_STUDIO:
                shortcutEntityFilter.entity = Entity.CHARACTERS;
                shortcutEntityFilter.variableKey = Character.getEntityVariables()['agency'].key;
                shortcutEntityFilter.isFilteringExternalKey = true;
                shortcutEntityFilter.externalEntityFilter = [
                    {
                        entity: Entity.AGENCY,
                        variableKey: Agency.getEntityVariables()['id'].key,
                        operator: VariableOperator.EQUALS_TO,
                        value: PLAYER_AGENCY,
                    },
                ];

                secondaryFilter.entity = Entity.CHARACTERS;
                secondaryFilter.variableKey = Character.getEntityVariables()['isStaff'].key;
                secondaryFilter.operator = VariableOperator.EQUALS_TO;
                secondaryFilter.value = false;

                onFilterChanged([shortcutEntityFilter, secondaryFilter], isTargetFilter);
                break;
            case ShortcutFilter.ALL_STAFF_OF_STUDIO: {
                shortcutEntityFilter.entity = Entity.CHARACTERS;
                shortcutEntityFilter.variableKey = Character.getEntityVariables()['agency'].key;
                shortcutEntityFilter.isFilteringExternalKey = true;
                shortcutEntityFilter.externalEntityFilter = [
                    {
                        entity: Entity.AGENCY,
                        variableKey: Agency.getEntityVariables()['id'].key,
                        operator: VariableOperator.EQUALS_TO,
                        value: PLAYER_AGENCY,
                    },
                ];

                secondaryFilter.entity = Entity.CHARACTERS;
                secondaryFilter.variableKey = Character.getEntityVariables()['isStaff'].key;
                secondaryFilter.operator = VariableOperator.EQUALS_TO;
                secondaryFilter.value = false;

                onFilterChanged([shortcutEntityFilter, secondaryFilter], isTargetFilter);
                break;
            }
            default:
                console.error('No entity selected, or uknown entity' + modifier.modifiedEntityVariable.entity);
                break;
        }
    };

    return (
        <Box className="">
            TARGETTING
            <FormControl fullWidth>
                <InputLabel>{t('interface.editor.modifier.targeting.input_label_target_select')}</InputLabel>
                <Select value={quickTarget} onChange={(e) => setQuickTarget(e.target.value as ShortcutFilter)}>
                    {getShortcutTargets().map((option, index) => (
                        <MenuItem key={`shortcut_${index}`} value={option}>
                            {t(option)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.event.flag_permanent_helper')}</FormHelperText>
            </FormControl>
            <EntityFilterEditor entityFilter={targetEntityFilter} onFilterChange={(entity) => onFilterChanged(entity)} />
        </Box>
    );
}
