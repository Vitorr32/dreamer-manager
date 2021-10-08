import React from 'react';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import { Effect } from 'renderer/shared/models/base/Effect.model';
import { MAX_NUMBER_OF_TRAITS } from 'renderer/shared/Constants';
import { EffectEditor } from './EffectEditor.component';

interface IProps {
  previousStep: () => void;
  nextStep: () => void;
}

interface IState {
  effects: Effect[];
  selectedEffectIndex: number;
  confirmDeleteOpen: boolean;
  confirmDialogIndex: number;
  editEffectIndex: number;
}

export class EffectsAndConditions extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      effects: [],
      selectedEffectIndex: -1,
      confirmDeleteOpen: false,
      confirmDialogIndex: -1,
      editEffectIndex: -1,
    };
  }

  componentDidMount() {
    if (this.state.effects.length === 0) {
      this.onNewEffectAddedToList();
    }
  }

  onNewEffectAddedToList(): void {
    this.setState({
      effects: [...this.state.effects, new Effect()],
      selectedEffectIndex: this.state.effects.length,
    });
  }

  onDeleteEffectFromList(): void {
    const modifiedEffects = this.state.effects.slice();
    modifiedEffects.splice(this.state.confirmDialogIndex, 1);

    this.setState({
      effects: modifiedEffects,
      confirmDialogIndex: -1,
      confirmDeleteOpen: false,
    });
  }

  render() {
    const { effects, confirmDeleteOpen, editEffectIndex } = this.state;
    const { nextStep, previousStep } = this.props;

    return (
      <div id="effect-and-condition-wrapper">
        <span className="instruction">
          * Here you can create/edit the effects that the new trait will have,
          each effect can have it's own conditions and modifiers, a single trait
          can have up to 5 effects.
        </span>

        <section className="effect-list-wrapper">
          <List className="effect-list">
            {effects.map((_, index) => (
              <ListItem key={`effect_${index}`}>
                <ListItemIcon>
                  <RemoveIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Single-line item"
                  secondary={'Secondary text'}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() =>
                      this.setState({
                        confirmDeleteOpen: true,
                        confirmDialogIndex: index,
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => this.setState({ editEffectIndex: index })}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {effects.length < MAX_NUMBER_OF_TRAITS ? (
            <Button onClick={this.onNewEffectAddedToList.bind(this)}>
              <div>Add new Effect</div>
              <AddIcon />
            </Button>
          ) : null}
        </section>

        <EffectEditor effect={effects[editEffectIndex]} />

        <div className="buttons-wrapper">
          <Button color="primary" onClick={previousStep}>
            PREVIOUS
          </Button>
          <Button color="primary" onClick={nextStep}>
            NEXT
          </Button>
        </div>

        <Dialog
          open={confirmDeleteOpen}
          onClose={() => this.setState({ confirmDeleteOpen: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete effect confirmation
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this effect? This operation cannot
              be reverted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ confirmDeleteOpen: false })}
              color="primary"
            >
              CANCEL
            </Button>
            <Button
              onClick={this.onDeleteEffectFromList.bind(this)}
              color="primary"
              variant="contained"
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
