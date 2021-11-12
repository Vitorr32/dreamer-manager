import { Button, List, ListItem, ListItemText, Menu } from '@mui/material';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { EffectEditorOptions } from 'renderer/shared/models/options/EffectEditorOptions.model';

interface IProps {
    condition: Condition;
    onChange: (condition: Condition) => void;
    options?: EffectEditorOptions;
}

export function ConditionInitiatorSelect(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const onItemSelected = (initiator: ConditionInitiator) => {
        setAnchorEl(null);

        const newCondition = new Condition(props.options?.impliedActingAgent);
        newCondition.initiator = initiator;

        props.onChange(newCondition);
    };

    console.log("YOLO")

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                {props.condition.initiator === ConditionInitiator.UNDEFINED ? t('interface.editor.condition.initiator') : t(props.condition.initiator)}
            </Button>
            <Menu id="condition-initiator-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {Object.values(ConditionInitiator)
                        .slice(1)
                        .map((initiator) => {
                            return (
                                <ListItem key={'condition_initiator_' + initiator} button onClick={(_) => onItemSelected(initiator)}>
                                    <ListItemText primary={t(initiator)} secondary="Character static stats" />
                                </ListItem>
                            );
                        })}
                </List>
            </Menu>
        </React.Fragment>
    );
}
