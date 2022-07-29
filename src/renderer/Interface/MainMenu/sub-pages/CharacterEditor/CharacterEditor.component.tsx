import { Box, Button, Step, StepButton, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LanguageToggle } from 'renderer/shared/components/util/LanguageToggle.component';

const CharacterSteps = [
    { label: 'Select campaign settings', completed: false },
    { label: 'Select campaign settings', completed: false },
    { label: 'Select campaign settings', completed: false },
];

interface IProps {}

export function CharacterEditor({}: IProps) {
    const params = useParams();
    const { t, i18n } = useTranslation();

    const [stepperIndex, setStepperIndex] = useState<number>(0);

    useEffect(() => {
        const IDParameter = params?.id;

        if (IDParameter) {
        }
    }, []);

    const getStepperContent = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return null;

            default:
                return null;
        }
    };

    return (
        <Box className="new-event">
            <Box component="header" className="new-event__header">
                <Link to="/menu/edit">
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                </Link>

                <Typography variant="h5">{t('interface.editor.character.title')}</Typography>

                <LanguageToggle />
            </Box>

            <Box className="new-event__content-header">
                <Stepper nonLinear activeStep={stepperIndex}>
                    {CharacterSteps.map((characterStep, index) => {
                        return (
                            <Step completed={characterStep.completed} key={`character_editor_step_${index}`}>
                                <StepButton onClick={(_) => setStepperIndex(index)}>{characterStep.label}</StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <Typography variant="subtitle2">{t('interface.editor.character.subtitle')}</Typography>
            </Box>

            <Box component="main" className="new-event__content">
                {getStepperContent(stepperIndex)}
            </Box>
        </Box>
    );
}
