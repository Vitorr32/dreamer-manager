import { Button, List, ListItem, ListItemText, Menu, TextField } from "@material-ui/core";
import React from "react";
import { Condition } from "../../../shared/models/base/Condition.model";
import { ConditionInitiator } from "../../../shared/models/enums/ConditionInitiator.enum";
import { ArrowDropDown } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';

interface IProps {
    condition: Condition
    onChange: (index: number, value: number) => void,
}

export function NumericSelectorParameterInput(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const onParameterChange = (index: number, value: number) => {

    }

    return (
        <React.Fragment>
            {/* TODO: SKILL SELECTOR */}
            <TextField id="filled-basic" label="Filled" type="number" variant="filled" value={props.condition.parameters[1] ? props.condition.parameters[1] : 0} />
            <span>AND</span>
            <TextField id="filled-basic" label="Filled" type="number" variant="filled" value={props.condition.parameters[2] ? props.condition.parameters[2] : 0} />
        </React.Fragment>
    )
}