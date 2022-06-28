import { Button, List, ListItem, ListItemText, Menu } from '@mui/material';
import React from 'react';
import { Condition, EntitySelector, TimeSelector } from '../../../shared/models/base/Condition.model';
import { ConditionInitiator } from '../../../shared/models/enums/ConditionInitiator.enum';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Base } from 'renderer/shared/models/enums/Base.enum';

interface IProps {
    condition: Condition;
    onChange: (condition: Condition) => void;
}

export function ConditionSelectorSelect(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const onItemSelected = (selector: string) => {
        setAnchorEl(null);

        const newCondition = Object.assign({}, props.condition);

        newCondition.selector = selector;

        props.onChange(newCondition);
    };

    const renderAppropriateSelector = (condition: Condition): React.ReactElement[] => {
        let enumType: any;
        switch (condition.initiator) {
            case ConditionInitiator.ENTITY_FILTERING:
                enumType = EntitySelector;
                break;
            case ConditionInitiator.TIME:
                enumType = TimeSelector;
                break;
            default:
                console.error('Unknown initiator set ' + condition.initiator);
                return [];
        }

        return Object.values(enumType)
            .slice(1)
            .map((selector) => {
                return (
                    <ListItem key={'condition_selector_' + selector} button onClick={(_) => onItemSelected(selector as string)}>
                        <ListItemText primary={t(selector as string)} secondary="Character static stats" />
                    </ListItem>
                );
            });
    };

    return props.condition.initiator !== ConditionInitiator.UNDEFINED ? (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                {props.condition.selector !== Base.UNDEFINED ? t(props.condition.selector as string) : t('interface.editor.condition.selector')}
            </Button>
            <Menu id="condition-initiator-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {renderAppropriateSelector(props.condition)}
                </List>
            </Menu>
        </React.Fragment>
    ) : null;
}
