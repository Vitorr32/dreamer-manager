import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions, EffectOriginType } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { EntityFilter as EntityFilterComponent } from '../entity/EntityFilter.component';
import { CopyClassInstance, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { EntityFilterEditor } from '../entity/EntityFilterEditor.component';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

interface IProps {
    modifier: Modifier;
    onModifierTargetChange: (filter: EntityFilter) => void;
    onModifierReceptorChange: (filter: EntityFilter) => void;
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

    const onFilterChanged = (updatedEntity: EntityFilter, isTarget: boolean = true) => {
        const updatedFilter = CopyClassInstance(targetEntityFilter);

        updatedFilter[key] = newValue;
        onModifierTargetChange(updatedFilter);
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

    const onShortcutFilterSelected = (shortcut: ShortcutFilter) => {
        switch (shortcut) {
            case ShortcutFilter.EVERYONE:
            // TODO: Make 'everyone' be a filter with just character age > 0
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
