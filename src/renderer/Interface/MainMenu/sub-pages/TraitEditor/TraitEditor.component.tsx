import { Button, Stepper, Step, StepButton, Box, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { BasicInfoForm } from './BasicInfoForm.component';
import { Trait } from '../../../../shared/models/base/Trait.model';
import { EffectsAndConditions } from './EffectsAndConditions.component';
import { NewTraitReview } from './NewTraitReview.component';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LanguageToggle } from 'renderer/shared/components/util/LanguageToggle.component';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {}

export function TraitEditor(props: IProps) {
    const { t, i18n } = useTranslation();
    const params = useParams();

    const [stepperIndex, setStepperIndex] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState([false, false, false]);
    const [currentTrait, setCurrentTrait] = useState(new Trait());
    const mappedEntities = useSelector((state: RootState) => state.database.mappedDatabase.traits);

    useEffect(() => {
        console.log(params);
        const IDParameter = params?.id;

        if (IDParameter) {
            const toEditEntity = mappedEntities[IDParameter];

            setCurrentTrait(toEditEntity);
        } else {
            setCurrentTrait(new Trait());
        }
    }, []);

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
        setCurrentTrait(trait);
    };

    const getStepperContent = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <BasicInfoForm trait={currentTrait} onChange={onTraitChange} nextStep={nextStep} />;
            case 1:
                return <EffectsAndConditions trait={currentTrait} onChange={onTraitChange} previousStep={previousStep} nextStep={nextStep} />;
            case 2:
                return <NewTraitReview trait={currentTrait} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ backgroundColor: 'background.default', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ display: 'flex', columnGap: '20px', padding: '20px', alignItems: 'center' }} elevation={2}>
                <Link to="/menu/edit/trait">
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                </Link>

                <Typography variant="h5">{t('interface.editor.trait.title') as string}</Typography>

                <Box sx={{ marginLeft: 'auto' }}>
                    <LanguageToggle />
                </Box>
            </Paper>

            <Box component="main" sx={{ overflow: 'visible', marginTop: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
            </Box>
        </Box>
    );
}
