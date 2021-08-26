import { Button, List, ListItem, ListItemText, Menu } from "@material-ui/core";
import React from "react";
import { Condition, EventFlagSelector, LocationSelector, NumericSelector, RelationshipSelector, TimeSelector, TraitSelector } from "../../../shared/models/base/Condition.model";
import { ConditionInitiator } from "../../../shared/models/enums/ConditionInitiator.enum";
import { ArrowDropDown } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';

interface IProps {
    condition: Condition
    onChange: (condition: Condition) => void,
}

export function ConditionSelectorSelect(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const onItemSelected = (selector: string) => {
        setAnchorEl(null)

        const newCondition = Object.assign({}, props.condition)

        newCondition.selector = selector

        props.onChange(newCondition)
    }

    const renderAppropriateSelector = (condition: Condition): React.ReactElement[] => {
        let enumType: any;
        switch (condition.initiator) {
            case ConditionInitiator.STATUS_RANGE:
            case ConditionInitiator.SKILL_RANGE:
                enumType = NumericSelector
                break
            case ConditionInitiator.TRAIT:
                enumType = TraitSelector
                break
            case ConditionInitiator.EVENT_FLAGGED:
                enumType = EventFlagSelector
                break
            case ConditionInitiator.LOCATION:
                enumType = LocationSelector
                break
            case ConditionInitiator.RELATIONSHIP:
                enumType = RelationshipSelector
                break
            case ConditionInitiator.TIME:
                enumType = TimeSelector
                break
            default:
                console.error("Unknown initiator set " + condition.initiator)
                return []

        }

        return Object.values(enumType).slice(1).map(selector => {
            return (
                <ListItem key={'condition_selector_' + selector} button onClick={_ => onItemSelected(selector as string)}>
                    <ListItemText primary={t(selector as string)} secondary="Character static stats" />
                </ListItem>
            )
        })
    }

    return props.condition.initiator !== ConditionInitiator.UNDEFINED ? (
        <React.Fragment>
            <Button
                variant="contained"
                endIcon={<ArrowDropDown />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
            >
                {props.condition.selector !== NumericSelector.UNDEFINED ? t(props.condition.selector as string) : t('interface.editor.condition.selector')}
            </Button>
            <Menu
                id="condition-initiator-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {renderAppropriateSelector(props.condition)}
                </List>
            </Menu>
        </React.Fragment>
    ) : null
}