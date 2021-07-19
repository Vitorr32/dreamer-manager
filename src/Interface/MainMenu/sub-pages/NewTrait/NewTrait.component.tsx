import { Button, Stepper, Step, StepButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import './NewTrait.style.scss';
import { BasicInfoForm } from './components/BasicInfoForm/BasicInfoForm.component';
import { Trait, TraitType } from '../../../../models/base/Trait.model';

interface IProps {
}

interface IState {
    stepperIndex: number,
    completed: { [k: number]: boolean },
    currentTrait?: Trait
}

export class NewTrait extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            stepperIndex: 0,
            completed: {
                0: false,
                1: false
            },
            currentTrait: new Trait()
        }
    }

    onBasicInfoSubmit(name: string, description: string, traitType: TraitType): void {
        const trait = {
            ...this.state.currentTrait,
            name,
            description,
            traitType
        }

        this.setState({ currentTrait: trait })
    }

    getStepperContent(index: number) {
        switch (index) {
            case 0:
                return <BasicInfoForm onBasicInfoSubmit={this.onBasicInfoSubmit} />
            default:
                return null
        }
    }

    render() {
        const { stepperIndex, completed } = this.state

        return (
            <main id="new-trait-component">
                <section className="new-trait-wrapper">
                    <header>
                        <Button color="primary">
                            <ArrowBackIcon />
                        </Button>
                        <h2>Trait Creation</h2>
                    </header>

                    <Stepper nonLinear activeStep={this.state.stepperIndex}>
                        <Step>
                            <StepButton onClick={_ => this.setState({ stepperIndex: 0 })} completed={completed[0]}>
                                Basic Information
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={_ => this.setState({ stepperIndex: 1 })} completed={completed[1]}>
                                Effects and Conditions
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={_ => this.setState({ stepperIndex: 2 })} completed={completed[2]}>
                                Icon and Visual Properties
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={_ => this.setState({ stepperIndex: 3 })} completed={completed[3]}>
                                Review
                            </StepButton>
                        </Step>
                    </Stepper>

                    {this.getStepperContent(stepperIndex)}
                    <button onClick={() => this.setState({ stepperIndex: this.state.stepperIndex + 1 })}>Next</button>
                </section>
            </main>
        )
    }
}