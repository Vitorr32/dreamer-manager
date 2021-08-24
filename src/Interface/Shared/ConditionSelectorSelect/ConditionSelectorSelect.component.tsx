import { Button, List, ListItem, ListItemText, Menu } from "@material-ui/core";
import React from "react";
import { Condition } from "../../../shared/models/base/Condition.model";
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

    const onItemSelected = (initiator: ConditionInitiator) => {
        setAnchorEl(null)

        const newCondition = Object.assign({}, props.condition)

        newCondition.initiator = initiator

        props.onChange(newCondition)
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                endIcon={<ArrowDropDown />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
            >
                {props.condition.initiator === ConditionInitiator.UNDEFINED ? 'Condition Initiator' : t(props.condition.initiator)}
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
                    {
                        Object.values(ConditionInitiator).slice(1).map(initiator => {
                            return (
                                <ListItem button onClick={_ => onItemSelected(initiator)}>
                                    <ListItemText primary={t(initiator)} secondary="Character static stats" />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Menu>
        </React.Fragment>
    )
}