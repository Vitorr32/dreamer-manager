import { Button, List, ListItem, ListItemText, Menu } from '@mui/material';
import React from 'react';
import { Condition, EntitySelector } from '../../../shared/models/base/Condition.model';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface IProps {
    condition: Condition;
    onChange: (condition: Condition) => void;
}

export function ConditionSelectorSelect(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const onItemSelected = (selector: EntitySelector) => {
        setAnchorEl(null);

        const newCondition = Object.assign({}, props.condition);

        newCondition.selector = selector;

        props.onChange(newCondition);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                {props.condition.selector !== EntitySelector.UNDEFINED ? t(props.condition.selector) : t('interface.editor.condition.selector')}
            </Button>
            <Menu id="condition-initiator-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {Object.values(EntitySelector)
                        .slice(1)
                        .map((selector) => {
                            return (
                                <ListItem key={'condition_selector_' + selector} button onClick={(_) => onItemSelected(selector)}>
                                    <ListItemText primary={t(selector)} secondary="Character static stats" />
                                </ListItem>
                            );
                        })}
                </List>
            </Menu>
        </React.Fragment>
    );
}
