import { FormControl, Select, MenuItem, InputLabel, List, ListSubheader, ListItem, ListItemIcon, Button, Menu, ListItemText } from "@material-ui/core";
import React from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SendIcon from '@material-ui/icons/SendOutlined';
import { Condition } from "../../../shared/models/base/Condition.model";
import './ConditionLine.style.scss';
import { ConditionInitiator } from "../../../shared/models/enums/ConditionInitiator.enum";
import { ConditionInitiatorSelect } from "../ConditionInitiatorSelect/ConditionInitiatorSelect.component";

interface IProps {
    conditionLine: Condition,
    index: number,
    onChange: (index: number, condition: Condition) => void,
}
interface IState {
    conditionInitiatorAnchorEl: null | HTMLElement;
}

export class ConditionLine extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            conditionInitiatorAnchorEl: null
        }
    }

    public componentDidMount(): void {

    }

    private onInitiatorChange(conditionInitiator: ConditionInitiator, selector: number): void {

    }

    render() {
        const { conditionLine } = this.props

        return (
            <section className="condition-line-wrapper">
                <ConditionInitiatorSelect condition={conditionLine} onChange={this.onInitiatorChange.bind(this)} />
            </section>
        )
    }
}