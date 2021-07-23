import { Button, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React from "react";
import { Effect } from "../../../../../../shared/models/base/Effect.model";
import './EffectsAndConditions.style.scss'

interface IProps {
    previousStep: () => void,
    nextStep: () => void
}

interface IState {
    effects: Effect[],
    selectedEffectIndex: number
}

export class EffectsAndConditions extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        this.state = {
            effects: [],
            selectedEffectIndex: -1
        }
    }

    onNewEffectAddedToList(): void {
        this.setState({ effects: [...this.state.effects, new Effect()], selectedEffectIndex: this.state.effects.length })
    }

    render() {
        const { effects } = this.state
        const { nextStep, previousStep } = this.props

        return (
            <main id="effect-and-condition-wrapper">
                <List className="effects-list">
                    {
                        effects.map(effect => (
                            <ListItem>
                                <ListItemIcon>
                                    <RemoveIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={'Secondary text'}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }

                    {
                        effects.length < 10
                            ?
                            <ListItem>
                                <ListItemText
                                    primary="Add New Effect"
                                    secondary={'A Trait can have up to 10 effects'}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={this.onNewEffectAddedToList.bind(this)}>
                                        <AddIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            :
                            null
                    }
                </List>

                <div className="buttons-wrapper">
                    <Button color="primary" onClick={previousStep}> PREVIOUS </Button>
                    <Button color="primary" onClick={nextStep}> NEXT </Button>
                </div>
            </main>
        );
    }

}