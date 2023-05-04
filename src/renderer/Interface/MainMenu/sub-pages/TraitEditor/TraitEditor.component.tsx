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
import { BASE_GAME_FOLDER, DATABASE_FOLDER, ICONS_FOLDER, LANGUAGE_CODE_DEFAULT, TRAIT_DATABASE_FOLDER } from 'renderer/shared/Constants';
import { GetFileFromResources, GetFileNameFromPath } from 'renderer/shared/utils/StringOperations';
import { CopyFileToAssetsFolder, IsAbsolutePathTheSameAsRelativePath } from 'renderer/shared/utils/FileOperation';
import { CreateOrUpdateDatabaseJSONFile } from 'renderer/shared/scripts/DatabaseCreate.script';
import { CopyClassInstance } from 'renderer/shared/utils/General';

interface IProps {}

export function TraitEditor(props: IProps) {
    const { t, i18n } = useTranslation();
    const params = useParams();

    const [stepperIndex, setStepperIndex] = useState(0);
    const [stepsCompleted, setStepsCompleted] = useState([false, false, false]);
    const [inputValidation, setInputValidation] = useState({});
    const [currentTrait, setCurrentTrait] = useState(new Trait());
    const [packageFolder, setPackageFolder] = useState<string>();
    const database = useSelector((state: RootState) => state.database);
    const mappedEntities = useSelector((state: RootState) => state.database.mappedDatabase.traits);

    useEffect(() => {
        const IDParameter = params?.id;
        const targetPackageParameter = params?.package;

        if (targetPackageParameter) {
            setPackageFolder(targetPackageParameter);
        } else {
            setPackageFolder(BASE_GAME_FOLDER);
        }

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

    const onSubmitTrait = async (): Promise<void> => {
        if (!validateTrait(currentTrait)) {
            return;
        }

        const finalTrait = CopyClassInstance(currentTrait);

        //Check to see if the user changed the image of this trait, if it is, change the relative file path to the new one.
        const isSameFile = await IsAbsolutePathTheSameAsRelativePath(finalTrait.absoluteIconPath, finalTrait.iconPath);
        if (!isSameFile) {
            try {
                //Now check if the file is already present as a game file in the trait icons folder, or is a new one that need to be copied into the game folder
                const fileName = GetFileNameFromPath(finalTrait.absoluteIconPath);
                const newRelativePath = [ICONS_FOLDER, TRAIT_DATABASE_FOLDER, fileName];
                const existingFile = GetFileFromResources(newRelativePath);

                //If the file does not exist in the games folder, we copy it into the game folder
                if (!existingFile) {
                    const newAbsolutePath = await CopyFileToAssetsFolder(finalTrait.absoluteIconPath, newRelativePath, packageFolder);
                    finalTrait.iconPath = newRelativePath;
                    finalTrait.absoluteIconPath = newAbsolutePath;
                }
                //Then update the icon path to the new relative path
                finalTrait.iconPath = newRelativePath;
            } catch (error) {
                console.log(error);
                return;
            }
        }

        //Cleanup finalTrait from the metadata propertie and the absolute icon path
        const finalPath = currentTrait.metadata.file.path;
        delete finalTrait.metadata;
        delete finalTrait.absoluteIconPath;

        console.log('finalPath', finalPath);

        //Update or create the new trait in the json file of the target folder
        await CreateOrUpdateDatabaseJSONFile(finalPath, finalTrait, packageFolder, true);
        //Reload the database for trait
    };

    const validateTrait = (trait: Trait): boolean => {
        const validation: any = {};

        validation.id = database.mappedDatabase.traits[trait.id] ? t('interface.editor..duplicated_id') : undefined;
        validation.name = !trait.localization[LANGUAGE_CODE_DEFAULT].name ? t('interface.editor.validation.missing_name') : undefined;
        validation.description = !trait.localization[LANGUAGE_CODE_DEFAULT].description ? t('interface.editor.validation.missing_description') : undefined;

        setInputValidation(validation);

        return Object.keys(validation).some((inputValidated) => !validation[inputValidated]);
    };

    const getStepperContent = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <BasicInfoForm trait={currentTrait} onChange={onTraitChange} nextStep={nextStep} />;
            case 1:
                return <EffectsAndConditions trait={currentTrait} onChange={onTraitChange} previousStep={previousStep} nextStep={nextStep} />;
            case 2:
                return <NewTraitReview trait={currentTrait} previousStep={previousStep} onSubmit={onSubmitTrait} fieldsValidation={inputValidation} />;
            default:
                return null;
        }
    };

    console.log('currentTrait', currentTrait);

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
