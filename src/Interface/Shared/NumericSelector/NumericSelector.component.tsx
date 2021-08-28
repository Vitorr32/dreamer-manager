import { Button, List, ListItem, ListItemText, Menu, TextField } from "@material-ui/core";
import React from "react";
import { Condition } from "../../../shared/models/base/Condition.model";
import { ConditionInitiator } from "../../../shared/models/enums/ConditionInitiator.enum";
import { ArrowDropDown } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';

interface IProps {
    range: boolean,
    condition: Condition
    onChange: (index: number, value: any) => void,
}

export function NumericSelectorParameterInput(props: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    return (
        <React.Fragment>
            {/* TODO: SKILL SELECTOR */}
            <TextField id="filled-basic" label="Filled" type="number" variant="filled" onChange={event => props.onChange(1, event.target.value)} value={props.condition.parameters[1] ? props.condition.parameters[1] : 0} />
            {
                props.range
                    ?
                    <React.Fragment>
                        <span>AND</span>
                        <TextField id="filled-basic" label="Filled" type="number" variant="filled" onChange={event => props.onChange(2, event.target.value)} value={props.condition.parameters[2] ? props.condition.parameters[2] : 0} />
                    </React.Fragment>
                    :
                    null
            }
        </React.Fragment>
    )
}