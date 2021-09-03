import { Button, Stepper, Step, StepButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { BasicInfoForm } from './components/BasicInfoForm/BasicInfoForm.component';
import { Trait, TraitType } from '../../../../shared/models/base/Trait.model';
import { EffectsAndConditions } from './components/EffectsAndConditions/EffectsAndConditions.component';

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

    nextStep(): void {
        if (this.state.stepperIndex === 3) {
            return;
        }

        this.setState({ stepperIndex: this.state.stepperIndex + 1 })
    }

    previousStep(): void {
        if (this.state.stepperIndex === 0) {
            return;
        }

        this.setState({ stepperIndex: this.state.stepperIndex - 1 })
    }


    getStepperContent(index: number) {
        switch (index) {
            case 0:
                return <BasicInfoForm onBasicInfoSubmit={this.onBasicInfoSubmit.bind(this)} nextStep={this.nextStep.bind(this)} />
            case 1:
                return <EffectsAndConditions previousStep={this.previousStep.bind(this)} nextStep={this.nextStep.bind(this)} />
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

                    <Stepper nonLinear activeStep={this.state.stepperIndex} style={{ background: 'whitesmoke' }}>
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
                </section>
            </main>
        )
    }
}
