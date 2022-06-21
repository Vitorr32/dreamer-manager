import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modifier } from 'renderer/shared/models/base/Modifier';
import { EffectEditorOptions, EffectOriginType } from 'renderer/shared/models/options/EffectEditorOptions.model';
import { EntityFilter as EntityFilterComponent } from '../entity/EntityFilter.component';
import { CopyClassInstance, GetVariablesOfEntity } from 'renderer/shared/utils/General';
import { EntityFilter } from 'renderer/shared/models/base/EntityVariableValue.model';
import { AffectedActorsSelect } from '../effects/AffectedActorsSelect.component';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    modifier: Modifier;
    onModifierTargetChange: (filter: EntityFilter) => void;
    onModifierReceptorChange: (filter: EntityFilter) => void;
    options?: EffectEditorOptions;
}

export function ModifierTargetSelection({
    modifier: { targetEntityFilter, receptorEntityFilter },
    onModifierTargetChange,
    onModifierReceptorChange,
    options: { effectOriginType, effectOriginID, specifiedActors },
}: IProps) {
    const { t } = useTranslation();
    const [tabIndex, setTabIndex] = useState<string>('0');

    const onFilterChanged = (key: 'entity' | 'variableKey' | 'value' | 'operator', newValue: any) => {
        const updatedFilter = CopyClassInstance(targetEntityFilter);

        updatedFilter[key] = newValue;
        onModifierTargetChange(updatedFilter);
    };

    return (
        <Box className="">
            <TabContext value={tabIndex}>
                {/* Should only have more than one option if the origin is a event. Since only them the actors are selectable */}
                {effectOriginType === EffectOriginType.EVENT && specifiedActors && specifiedActors.length !== 0 && (
                    <TabList value={tabIndex} onChange={(_, value) => setTabIndex(value)}>
                        <Tab label={t('interface.editor.modifier.target_tab_label_entity')} value="0" />
                        <Tab label={t('interface.editor.modifier.target_tab_label_actors')} value="1" />
                    </TabList>
                )}

                <Box></Box>

                <TabPanel value="0">
                    <EntityFilterComponent
                        entity={targetEntityFilter?.entity || Entity.NONE}
                        onEntityChange={(entity) => onFilterChanged('entity', entity)}
                        variable={targetEntityFilter?.entity ? GetVariablesOfEntity(targetEntityFilter.entity)[targetEntityFilter.variableKey] : null}
                        onVariableChange={(variable) => onFilterChanged('variableKey', variable.key)}
                        operator={targetEntityFilter?.operator}
                        onOperatorChange={(operator) => onFilterChanged('operator', operator)}
                        value={targetEntityFilter?.value}
                        onValueChange={(value) => onFilterChanged('value', value)}
                    />
                </TabPanel>
                <TabPanel value="1">
                    <AffectedActorsSelect
                        actors={specifiedActors}
                        onTargetFilterChange={onModifierTargetChange}
                        onReceptorFilterChange={onModifierReceptorChange}
                        hasOriginActor={true}
                    />
                    {/*
                    // TODO: Create the logic for the selection of Actors and Active/Passive agents of the modifier.
                    {effectOriginType === EffectOriginType.EVENT && specifiedActors && specifiedActors.length !== 0 && (
                        <FormControl variant="filled">
                            <InputLabel htmlFor="origin_actors">{t('interface.editor.event.scene_actor_animation_type_label')}</InputLabel>
                            <Select id="origin_actors" value={specifiedActors} onChange={(event) => onActorChanged(event.target.value, true)} multiple>
                                {actors.map((actor) => (
                                    <MenuItem key={`origin_actor_option_${actor.id}`} value={actor.id}>
                                        {actor.alias}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )} */}
                </TabPanel>
            </TabContext>
        </Box>
    );
}
