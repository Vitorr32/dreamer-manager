import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions, EffectOriginType } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { ExternalExpandedEntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { DEFAULT_EXTERNAL_ENTITY_FILTER, PLAYER_AGENCY } from 'renderer/shared/Constants';
import { VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { Agency } from 'renderer/shared/models/base/Agency.model';
import { CompositeEntityFilter } from '../entity/CompositeEntityFilter.component';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';

interface IProps {
    modifier: Modifier;
    onModifierTargetChange: (filterTree: EntityFilterTree) => void;
    onModifierReceptorChange?: (filterTree: EntityFilterTree) => void;
    impliedReceptor?: boolean;
    options?: EffectEditorOptions;
}

enum ShortcutFilter {
    UNDEFINED = 'model.undefined',
    //Allow user to insert use a composite filter
    SPECIFIC_FILTER = 'model.modifier.targeting.specific_filter',
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

export function ModifierTargetSelection({ modifier, onModifierTargetChange, onModifierReceptorChange, impliedReceptor = true, options }: IProps) {
    const { t } = useTranslation();
    const { targetEntityFilter, originEntityFilter } = modifier;

    const [quickTarget, setQuickTarget] = useState<ShortcutFilter>(ShortcutFilter.UNDEFINED);

    const onFilterChanged = (updatedFilters: EntityFilterTree, isTarget: boolean = true) => {
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
                break;
            default:
                break;
        }

        return shortcuts;
    };

    const onShortcutFilterSelected = (shortcut: ShortcutFilter, isTargetFilter: boolean = true) => {
        const shortcutFilterTree: EntityFilterTree = new EntityFilterTree();
        switch (shortcut) {
            case ShortcutFilter.EVERYONE:
                // To set the Everyone filter, just get all character of age bigger than 0, which means everyone currently instantiated in game.
                shortcutFilterTree.root.entityFilters[0].entity = Entity.CHARACTERS;
                shortcutFilterTree.root.entityFilters[0].operator = VariableOperator.BIGGER_THAN;
                shortcutFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()['age'].key;
                shortcutFilterTree.root.entityFilters[0].value = 0;
                break;
            case ShortcutFilter.ALL_DREAMERS_OF_STUDIO:
                shortcutFilterTree.root.entityFilters[0].entity = Entity.CHARACTERS;
                shortcutFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()['agency'].key;
                shortcutFilterTree.root.entityFilters[0].isFilteringExternalKey = true;
                shortcutFilterTree.root.entityFilters[0].externalEntityFilter = [
                    {
                        entity: Entity.AGENCY,
                        variableKey: Agency.getEntityVariables()['id'].key,
                        operator: VariableOperator.EQUALS_TO,
                        value: PLAYER_AGENCY,
                    },
                ];

                shortcutFilterTree.root.entityFilters.push(DEFAULT_EXTERNAL_ENTITY_FILTER);
                shortcutFilterTree.root.entityFilters[1].entity = Entity.CHARACTERS;
                shortcutFilterTree.root.entityFilters[1].variableKey = Character.getEntityVariables()['isStaff'].key;
                shortcutFilterTree.root.entityFilters[1].operator = VariableOperator.EQUALS_TO;
                shortcutFilterTree.root.entityFilters[1].value = false;
                break;
            case ShortcutFilter.ALL_STAFF_OF_STUDIO: {
                shortcutFilterTree.root.entityFilters[0].entity = Entity.CHARACTERS;
                shortcutFilterTree.root.entityFilters[0].variableKey = Character.getEntityVariables()['agency'].key;
                shortcutFilterTree.root.entityFilters[0].isFilteringExternalKey = true;
                shortcutFilterTree.root.entityFilters[0].externalEntityFilter = [
                    {
                        entity: Entity.AGENCY,
                        variableKey: Agency.getEntityVariables()['id'].key,
                        operator: VariableOperator.EQUALS_TO,
                        value: PLAYER_AGENCY,
                    },
                ];

                shortcutFilterTree.root.entityFilters.push(DEFAULT_EXTERNAL_ENTITY_FILTER);
                shortcutFilterTree.root.entityFilters[1].entity = Entity.CHARACTERS;
                shortcutFilterTree.root.entityFilters[1].variableKey = Character.getEntityVariables()['isStaff'].key;
                shortcutFilterTree.root.entityFilters[1].operator = VariableOperator.EQUALS_TO;
                shortcutFilterTree.root.entityFilters[1].value = false;
                break;
            }
            default:
                console.error('No entity selected, or uknown entity' + modifier.modifiedEntityVariable.entity);
                break;
        }

        onFilterChanged(shortcutFilterTree, isTargetFilter);
    };

    return (
        <Box className="">
            TARGETTING
            <FormControl fullWidth>
                <InputLabel>{t('interface.editor.modifier.targeting.input_label_target_select')}</InputLabel>
                <Select value={quickTarget === ShortcutFilter.UNDEFINED ? '' : quickTarget} onChange={(e) => setQuickTarget(e.target.value as ShortcutFilter)}>
                    {getShortcutTargets().map((option, index) => (
                        <MenuItem key={`shortcut_${index}`} value={option}>
                            {t(option)}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{t('interface.editor.event.flag_permanent_helper')}</FormHelperText>
            </FormControl>
            <CompositeEntityFilter filterTree={targetEntityFilter} onFilterTreeChange={(filterTree) => onFilterChanged(filterTree)} />
        </Box>
    );
}
