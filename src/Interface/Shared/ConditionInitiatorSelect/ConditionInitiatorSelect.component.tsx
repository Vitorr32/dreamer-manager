import { Button, Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Menu } from "@material-ui/core";
import React from "react";
import { Condition } from "../../../shared/models/base/Condition.model";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ConditionInitiator } from "../../../shared/models/enums/ConditionInitiator.enum";
import { ArrowDropDown, ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";

interface IProps {
    condition: Condition
    onChange: (conditionInitiator: ConditionInitiator, selector: number) => void,
}

export function ConditionInitiatorSelect(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [subMenuInitiator, setSubMenuInitiator] = React.useState<ConditionInitiator>(ConditionInitiator.UNDEFINED)

    return (
        <React.Fragment>
            <Button
                variant="contained"
                endIcon={<ArrowDropDown />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
            >
                {props.condition.initiator === ConditionInitiator.UNDEFINED ? 'Condition Initiator' : props.condition.initiator}
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
                    <ListItem button onClick={(event: React.MouseEvent<HTMLDivElement>) => setSubMenuAnchorEl(event.currentTarget)}>
                        <ListItemText primary="Status Range" secondary="Character static stats" />
                        <ArrowRightIcon />
                    </ListItem>
                    <ListItem button className="nested">
                        <ListItemText primary="Drafts" />
                        <ArrowRightIcon />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Inbox" />
                        <ArrowRightIcon />
                    </ListItem>
                </List>
            </Menu>

            <Menu
                id="condition-initiator-menu"
                anchorEl={subMenuAnchorEl}
                keepMounted
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={Boolean(subMenuAnchorEl)}
                onClose={() => setSubMenuAnchorEl(null)}
            >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItem button >
                        <ListItemText primary="Status Range" secondary="Character static stats" />
                        <ArrowRightIcon />
                    </ListItem>
                </List>
            </Menu>
        </React.Fragment>

    )
}