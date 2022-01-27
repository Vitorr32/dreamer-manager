import { Button, Stepper, Step, StepButton, TextField, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { BasicInfoForm } from './BasicInfoForm.component';
import { Trait } from '../../../../shared/models/base/Trait.model';
import { EffectsAndConditions } from './EffectsAndConditions.component';
import { NewTraitReview } from './NewTraitReview.component';
import { useTranslation } from 'react-i18next';
import { getLocaleLabel } from 'renderer/shared/utils/Localization';
import { LANGUAGE_CODES } from 'renderer/shared/Constants';

interface IProps {}

export function NewTrait(props: IProps) {
    const { t, i18n } = useTranslation();

    const [stepperIndex, setStepperIndex] = useState(2);
    const [stepsCompleted, setStepsCompleted] = useState([false, false, false]);
    const [newTrait, setNewTrait] = useState(new Trait());

    const nextStep = (): void => {
        if (stepperIndex === 3) {
            return;
        }

        setStepperIndex(stepperIndex + 1);
    };

    const previousStep = (): void => {
        if (stepperIndex === 0) {
            return;
        }

        setStepperIndex(stepperIndex - 1);
    };

    const onTraitChange = (trait: Trait): void => {
        setNewTrait(trait);
    };

    const getStepperContent = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <BasicInfoForm trait={newTrait} onChange={onTraitChange} nextStep={nextStep} />;
            case 1:
                return <EffectsAndConditions trait={newTrait} onChange={onTraitChange} previousStep={previousStep} nextStep={nextStep} />;
            case 2:
                return <NewTraitReview trait={newTrait} />;
            default:
                return null;
        }
    };

    return (
        <div className="newtrait">
            <header className="newtrait__header">
                <Button color="primary">
                    <ArrowBackIcon />
                </Button>
                <h2>Trait Creation</h2>

                <TextField required label={t('interface.commons.language')} value={i18n.language} variant="outlined" select onChange={(event) => i18n.changeLanguage(event.target.value)}>
                    {LANGUAGE_CODES.map((value) => {
                        return (
                            <MenuItem key={`language_${value}`} value={value}>
                                {getLocaleLabel(value)}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </header>
            <main className="newtrait__form">
                <Stepper nonLinear activeStep={stepperIndex}>
                    <Step completed={stepsCompleted[0]}>
                        <StepButton onClick={(_) => setStepperIndex(0)}>Basic Information</StepButton>
                    </Step>
                    <Step completed={stepsCompleted[1]}>
                        <StepButton onClick={(_) => setStepperIndex(1)}>Effects and Conditions</StepButton>
                    </Step>
                    <Step completed={stepsCompleted[2]}>
                        <StepButton onClick={(_) => setStepperIndex(2)}>Review</StepButton>
                    </Step>
                </Stepper>

                {getStepperContent(stepperIndex)}
            </main>
        </div>
    );
}
