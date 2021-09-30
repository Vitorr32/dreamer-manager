import { Button, Stepper, Step, StepButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { BasicInfoForm } from './BasicInfoForm.component';
import { Trait, TraitType } from '../../../../shared/models/base/Trait.model';
import { EffectsAndConditions } from './EffectsAndConditions.component';

interface IProps {}

interface IState {
    stepperIndex: number;
    completed: { [k: number]: boolean };
    currentTrait?: Trait;
}

export class NewTrait extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            stepperIndex: 1,
            completed: {
                0: false,
                1: false,
            },
            currentTrait: new Trait(),
        };
    }

    onBasicInfoSubmit(name: string, description: string, traitType: TraitType): void {
        const trait = {
            ...this.state.currentTrait,
            name,
            description,
            traitType,
        };

        this.setState({ currentTrait: trait });
    }

    nextStep(): void {
        if (this.state.stepperIndex === 3) {
            return;
        }

        this.setState({ stepperIndex: this.state.stepperIndex + 1 });
    }

    previousStep(): void {
        if (this.state.stepperIndex === 0) {
            return;
        }

        this.setState({ stepperIndex: this.state.stepperIndex - 1 });
    }

    getStepperContent(index: number) {
        switch (index) {
            case 0:
                return <BasicInfoForm onBasicInfoSubmit={this.onBasicInfoSubmit.bind(this)} nextStep={this.nextStep.bind(this)} />;
            case 1:
                return <EffectsAndConditions previousStep={this.previousStep.bind(this)} nextStep={this.nextStep.bind(this)} />;
            default:
                return null;
        }
    }

    render() {
        const { stepperIndex, completed } = this.state;

        return (
            <div className="newtrait">
                <header className="newtrait__header">
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                    <h2>Trait Creation</h2>
                </header>
                <main className="newtrait__form">
                    <Stepper nonLinear activeStep={this.state.stepperIndex} style={{ background: 'whitesmoke' }}>
                        <Step completed={completed[0]}>
                            <StepButton onClick={(_) => this.setState({ stepperIndex: 0 })}>Basic Information</StepButton>
                        </Step>
                        <Step completed={completed[1]}>
                            <StepButton onClick={(_) => this.setState({ stepperIndex: 1 })}>Effects and Conditions</StepButton>
                        </Step>
                        <Step completed={completed[2]}>
                            <StepButton onClick={(_) => this.setState({ stepperIndex: 2 })}>Icon and Visual Properties</StepButton>
                        </Step>
                        <Step completed={completed[3]}>
                            <StepButton onClick={(_) => this.setState({ stepperIndex: 3 })}>Review</StepButton>
                        </Step>
                    </Stepper>

                    {this.getStepperContent(stepperIndex)}
                </main>
            </div>
        );
    }
}
