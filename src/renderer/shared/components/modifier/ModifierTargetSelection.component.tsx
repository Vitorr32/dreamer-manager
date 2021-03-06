import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions, EffectOriginType } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { DynamicValue, ExternalExpandedEntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { DEFAULT_EXTERNAL_ENTITY_FILTER, PLAYER_AGENCY } from 'renderer/shared/Constants';
import { VariableOperator } from 'renderer/shared/models/base/Variable.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { Agency } from 'renderer/shared/models/base/Agency.model';
import { CompositeEntityFilter } from '../entity/CompositeEntityFilter.component';
import { EntityFilterTree } from 'renderer/shared/models/base/EntityFilterTree.model';
import { LogicOperator } from 'renderer/shared/models/enums/LogicOperator.enum';
import { Actor } from 'renderer/shared/models/base/Actor.model';
import { Relationship } from 'renderer/shared/models/base/Relationship.model';

interface IProps {
    modifier: Modifier;
    onModifierTargetChange: (filterTree: EntityFilterTree) => void;
    onModifierReceptorChange?: (filterTree: EntityFilterTree) => void;
    impliedOrigin?: boolean;
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

export function ModifierTargetSelection({ modifier, onModifierTargetChange, onModifierReceptorChange, impliedOrigin = true, options }: IProps) {
    const { t } = useTranslation();
    const { targetEntityFilter, originEntityFilter } = modifier;

    const [quickTarget, setQuickTarget] = useState<ShortcutFilter>(ShortcutFilter.UNDEFINED);
    const [showFilterEditor, setFilterEditorVisibility] = useState<boolean>(false);

    const onFilterChanged = (updatedFilters: EntityFilterTree, isTarget: boolean = true) => {
        if (isTarget) {
            onModifierTargetChange(updatedFilters);
        } else {
            onModifierReceptorChange(updatedFilters);
        }
    };

    const getShortcutTargets = (): ShortcutFilter[] => {
        const shortcuts: ShortcutFilter[] = [ShortcutFilter.SPECIFIC_FILTER];

        switch (modifier.modifiedEntityVariable.entity) {
            case Entity.RELATIONSHIP:
            case Entity.CHARACTERS:
                shortcuts.push(
                    ShortcutFilter.PROTAGONIST,
                    ShortcutFilter.ALL_DREAMERS_OF_STUDIO,
                    ShortcutFilter.ALL_STAFF_OF_STUDIO,
                    ShortcutFilter.EVERYONE_ON_STUDIO,
                    ShortcutFilter.EVERYONE
                );

                if (options.effectOriginType === EffectOriginType.TRAIT) {
                    shortcuts.push(ShortcutFilter.SELF, ShortcutFilter.SELF_PRODUCER, ShortcutFilter.SELF_FRIENDS, ShortcutFilter.SELF_RIVALS);
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

    const populateFilterWithSelectedShortcut = (shortcut: ShortcutFilter, isTargetFilter: boolean = true) => {
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
                shortcutFilterTree.root.logicOperator = LogicOperator.AND;

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
            case ShortcutFilter.ALL_STAFF_OF_STUDIO:
                shortcutFilterTree.root.logicOperator = LogicOperator.AND;

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
            case ShortcutFilter.EVERYONE_ON_STUDIO:
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
                break;
            case ShortcutFilter.ALL_ACTORS:
                shortcutFilterTree.root.logicOperator = LogicOperator.OR;

                if (options.specifiedEntities[Entity.ACTORS]) {
                    shortcutFilterTree.root.entityFilters = options.specifiedEntities[Entity.ACTORS].map((actor: Actor) => {
                        return {
                            ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                            entity: Entity.ACTORS,
                            variableKey: Actor.getEntityVariables()['id'].key,
                            operator: VariableOperator.EQUALS_TO,
                            value: actor.id,
                        };
                    });
                } else {
                    //TODO: Maybe put a feedback message on the front-end?
                    console.error('Tried to select all actors when no such entity exists yet.');
                }
            case ShortcutFilter.PROTAGONIST:
                shortcutFilterTree.root.entityFilters.push({
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entity: Entity.CHARACTERS,
                    variableKey: Character.getEntityVariables()['isPlayer'].key,
                    operator: VariableOperator.EQUALS_TO,
                    value: true,
                });
                break;
            case ShortcutFilter.SELF:
                shortcutFilterTree.root.entityFilters.push({
                    ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                    entity: Entity.CHARACTERS,
                    variableKey: Actor.getEntityVariables()['id'].key,
                    operator: VariableOperator.EQUALS_TO,
                    value: DynamicValue.SELF,
                });
            case ShortcutFilter.SELF_FRIENDS:
                shortcutFilterTree.root.logicOperator = LogicOperator.AND;

                shortcutFilterTree.root.entityFilters.push(
                    {
                        ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                        entity: Entity.RELATIONSHIP,
                        variableKey: Actor.getEntityVariables()['originCharacter'].key,
                        externalEntityFilter: [
                            {
                                entity: Entity.CHARACTERS,
                                operator: VariableOperator.EQUALS_TO,
                                variableKey: Actor.getEntityVariables()['id'].key,
                                value: DynamicValue.SELF,
                            },
                        ],
                    },
                    {
                        ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                        entity: Entity.RELATIONSHIP,
                        variableKey: Relationship.getEntityVariables()['favor'].key,
                        operator: VariableOperator.EQUAL_OR_BIGGER_THAN,
                        value: 50,
                    }
                );
            case ShortcutFilter.SELF_RIVALS:
                shortcutFilterTree.root.logicOperator = LogicOperator.AND;

                shortcutFilterTree.root.entityFilters.push(
                    {
                        ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                        entity: Entity.RELATIONSHIP,
                        variableKey: Actor.getEntityVariables()['originCharacter'].key,
                        externalEntityFilter: [
                            {
                                entity: Entity.CHARACTERS,
                                operator: VariableOperator.EQUALS_TO,
                                variableKey: Actor.getEntityVariables()['id'].key,
                                value: DynamicValue.SELF,
                            },
                        ],
                    },
                    {
                        ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                        entity: Entity.RELATIONSHIP,
                        variableKey: Relationship.getEntityVariables()['favor'].key,
                        operator: VariableOperator.EQUAL_OR_SMALLER_THAN,
                        value: 0,
                    },
                    {
                        ...DEFAULT_EXTERNAL_ENTITY_FILTER,
                        entity: Entity.RELATIONSHIP,
                        variableKey: Relationship.getEntityVariables()['respect'].key,
                        operator: VariableOperator.EQUAL_OR_BIGGER_THAN,
                        value: 50,
                    }
                );
            default:
                console.error('No entity selected, or uknown entity' + modifier.modifiedEntityVariable.entity);
                break;
        }

        onFilterChanged(shortcutFilterTree, isTargetFilter);
    };

    const onShortcutSelectChange = (shortcut: ShortcutFilter, isTargetFilter: boolean = true) => {
        setQuickTarget(shortcut);

        switch (shortcut) {
            case ShortcutFilter.UNDEFINED:
                setFilterEditorVisibility(false);
                return;
            case ShortcutFilter.SPECIFIC_FILTER:
                setFilterEditorVisibility(true);
                break;
            default:
                setFilterEditorVisibility(false);
                populateFilterWithSelectedShortcut(shortcut, isTargetFilter);
                break;
        }
    };

    return (
        <Box className="target-selection">
            {modifier.modifiedEntityVariable.entity !== Entity.NONE && (
                <>
                    <FormHelperText>{t('interface.editor.modifier.targeting.input_label_target_helper')}</FormHelperText>
                    <FormControl fullWidth>
                        <InputLabel>{t('interface.editor.modifier.targeting.input_label_target_select')}</InputLabel>
                        <Select value={quickTarget === ShortcutFilter.UNDEFINED ? '' : quickTarget} onChange={(e) => onShortcutSelectChange(e.target.value as ShortcutFilter)}>
                            {getShortcutTargets().map((option, index) => (
                                <MenuItem key={`shortcut_${index}`} value={option}>
                                    {t(option)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}

            {showFilterEditor && (
                <>
                    {!impliedOrigin && <CompositeEntityFilter filterTree={originEntityFilter} onFilterTreeChange={(filterTree) => onFilterChanged(filterTree, false)} />}

                    <CompositeEntityFilter filterTree={targetEntityFilter} onFilterTreeChange={(filterTree) => onFilterChanged(filterTree)} />
                </>
            )}
        </Box>
    );
}
