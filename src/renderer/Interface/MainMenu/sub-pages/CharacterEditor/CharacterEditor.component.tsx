import { Box, Button, Paper, Step, StepButton, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LanguageToggle } from 'renderer/shared/components/util/LanguageToggle.component';
import { Character, CharacterType, CharacterVariablesKey, Gender } from 'renderer/shared/models/base/Character.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { Dreamer, DreamerVariablesKey } from 'renderer/shared/models/base/Dreamer.model';
import { PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { Emotion } from 'renderer/shared/models/enums/sprite/Emotion.enum';
import { ApplyFileProtocol, GetFileNameFromPath, RemoveFileProtocol } from 'renderer/shared/utils/StringOperations';
import { BASE_CHARACTER_FILE, BASE_PAPER_DOLLS_FILE, CHARACTERS_FOLDER, CUSTOM_FOLDER, DATABASE_FOLDER, PAPER_DOLL_FOLDER, SPRITES_FOLDER } from 'renderer/shared/Constants';
import { CreateOrUpdateDatabaseJSONFile } from 'renderer/shared/scripts/DatabaseCreate.script';
import { CharacterPaperDollEditor } from './CharacterPaperDollEditor.component';
import { DreamerInfoEditor } from './DreamerInfoEditor.component';
import { CharacterBasicInfoEditor } from './CharacterBasicInfoEditor.component';

interface IProps {}

export function CharacterEditor({}: IProps) {
    const { t, i18n } = useTranslation();

    const CharacterSteps = [
        { label: t('interface.editor.character.step_basic_info'), completed: false },
        { label: t('interface.editor.character.step_specific_info'), completed: false },
        { label: t('interface.editor.character.step_sprite_info'), completed: false },
    ];
    const params = useParams();
    const mappedEntities = useSelector((state: RootState) => state.database.mappedDatabase);

    const [currentCharacter, setCurrentCharacter] = useState<Dreamer | Character>();
    const [currentPaperDoll, setCurrentPaperDoll] = useState<PaperDoll>();
    const [stepperIndex, setStepperIndex] = useState<number>(0);
    const [isSubmitFeedbackOpen, setSubmitFeedbackState] = useState(false);
    const [feedbackState, setFeedbackState] = useState<{ key: CharacterVariablesKey; text: string }[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const IDParameter = params?.id;

        if (IDParameter) {
            const toEditCharacter = mappedEntities.characters[IDParameter];
            const toEditPaperDoll = mappedEntities.paperDolls[toEditCharacter.paperDoll];

            setCurrentCharacter(toEditCharacter);
            setCurrentPaperDoll(toEditPaperDoll);
        } else {
            setCurrentCharacter(new Character());
            setCurrentPaperDoll(new PaperDoll(Gender.FEMALE));
        }
    }, []);

    const onCharacterVariableUpdated = (key: CharacterVariablesKey | DreamerVariablesKey, value: any, isNumberInput = false) => {
        if (key === CharacterVariablesKey.TYPE && value === CharacterType.ACTIVE_DREAMER) {
            const convertedToDreamer = Object.assign(new Dreamer(), currentCharacter);

            convertedToDreamer[key] = value;
            setCurrentCharacter(convertedToDreamer);
            return;
        }

        if (key === CharacterVariablesKey.PAPER_DOLL) {
            setCurrentPaperDoll(value);
            return;
        }

        if (isNumberInput) {
            try {
                const parsedValue = parseFloat(value);
                value = isNaN(parsedValue) ? '' : parsedValue;
            } catch (e) {
                value = 0;
            }
        }

        const updatedCharacter: any = CopyClassInstance(currentCharacter);

        updatedCharacter[key] = value;
        setCurrentCharacter(updatedCharacter);
    };

    const getStepperContent = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <CharacterBasicInfoEditor onChange={onCharacterVariableUpdated} character={currentCharacter} onNextStep={onNextStep} />;
            case 1:
                switch (currentCharacter.type) {
                    case CharacterType.ACTIVE_DREAMER:
                        return (
                            <DreamerInfoEditor
                                onChange={onCharacterVariableUpdated}
                                dreamer={currentCharacter as Dreamer}
                                onNextStep={onNextStep}
                                onPreviousStep={onPreviousStep}
                            />
                        );
                    default:
                        return null;
                }
            case 2:
                return (
                    <CharacterPaperDollEditor
                        character={currentCharacter}
                        paperDoll={currentPaperDoll}
                        onChange={onCharacterVariableUpdated}
                        onPreviousStep={onPreviousStep}
                        onNextStep={onCharacterSubmit}
                    />
                );
            default:
                return null;
        }
    };

    const onNextStep = (): void => {
        setStepperIndex(stepperIndex + 1);
    };

    const onPreviousStep = (): void => {
        setStepperIndex(stepperIndex - 1);
    };

    const onCharacterSubmit = async (): Promise<void> => {
        setLoading(true);
        const updatedCharacter = CopyClassInstance(currentCharacter);
        const updatedPaperDoll = CopyClassInstance(currentPaperDoll);

        if (updatedPaperDoll.isCustom) {
            for (const emotion in Emotion) {
                const currentEmotion: Emotion = Emotion[emotion as keyof typeof Emotion];
                const currentEmotionPaperDoll = updatedPaperDoll.emotions[currentEmotion];
                // Check if the current emotion has any configuration set
                if (!currentEmotionPaperDoll) {
                    continue;
                }

                const currentCustomFileName = currentEmotionPaperDoll.customFilePath?.pop() || '';
                const newCustomFileName = GetFileNameFromPath(currentEmotionPaperDoll.customFileAbsolutePath);

                // Check if the custom character sprite has changed;
                if ((!currentCustomFileName && newCustomFileName) || currentCustomFileName !== newCustomFileName) {
                    const newCustomPath = [SPRITES_FOLDER, CUSTOM_FOLDER, generateGenericNameForCustomSprite(currentEmotion, newCustomFileName)];

                    const fileOperationResult = await window.electron.fileSystem.copyFileToResources(
                        RemoveFileProtocol(currentEmotionPaperDoll.customFileAbsolutePath),
                        newCustomPath
                    );

                    // Update the current character paper doll for the respective emotion and with the new paths
                    updatedPaperDoll.emotions[currentEmotion] = {
                        ...updatedPaperDoll.emotions[currentEmotion],
                        customFilePath: newCustomPath,
                        customFileAbsolutePath: ApplyFileProtocol(fileOperationResult),
                    };
                }
            }
        }

        if (!validateCharacterVariables(updatedCharacter)) {
            // TODO: Show error on submit
            return;
        }

        await CreateOrUpdateDatabaseJSONFile([DATABASE_FOLDER, CHARACTERS_FOLDER], BASE_CHARACTER_FILE, updatedCharacter);
        await CreateOrUpdateDatabaseJSONFile([DATABASE_FOLDER, PAPER_DOLL_FOLDER], BASE_PAPER_DOLLS_FILE, updatedPaperDoll);
    };

    const generateGenericNameForCustomSprite = (emotion: Emotion, fileName: string) => {
        // Regex to get the extension of the filename
        const regex = /(?:\.([^.]+))?$/;
        // Get the emotion as a index
        const indexOfEmotion = Object.values(Emotion).indexOf(emotion);
        return `${currentCharacter.name}_${currentCharacter.id}_${indexOfEmotion}.${regex.exec(fileName)[1]}`;
    };

    const generateNameOfCharacterFile = (character: Dreamer | Character): string => {
        return `${currentCharacter.name}_${currentCharacter.id}`;
    };

    const validateCharacterVariables = (character: Dreamer | Character): boolean => {
        return true;
    };

    if (!currentCharacter) {
        return null;
    }

    return (
        <Box sx={{ backgroundColor: 'background.default', padding: '20px' }}>
            <Paper sx={{ display: 'flex', columnGap: '20px', padding: '20px', alignItems: 'center' }} elevation={2}>
                <Link to="/menu/edit/character">
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                </Link>

                <Typography variant="h5">{t('interface.editor.character.title') as string}</Typography>

                <LanguageToggle />
            </Paper>

            <Box sx={{ padding: '20px' }}>
                <Stepper nonLinear activeStep={stepperIndex}>
                    {CharacterSteps.map((characterStep, index) => {
                        return (
                            <Step completed={characterStep.completed} key={`character_editor_step_${index}`}>
                                <StepButton onClick={(_) => setStepperIndex(index)}>
                                    {/* <StepButton onClick={(_) => (index === 0 || CharacterSteps[index - 1].completed ? setStepperIndex(index) : null)}> */}
                                    {characterStep.label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <Typography variant="subtitle2">{t('interface.editor.character.subtitle')}</Typography>
            </Box>

            <Box component="main" sx={{ overflow: 'visible' }}>
                {getStepperContent(stepperIndex)}
            </Box>

            {/* <Dialog open={isSubmitFeedbackOpen} onClose={() => setSubmitFeedbackState(false)}>
                <DialogTitle>{t('interface.editor.character.feedback_modal_warning')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t('interface.editor.character.feedback_modal_list_header')}</DialogContentText>
                    <Card>
                        {feedbackState.map((feedback) => {
                            return (
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                            );
                        })}
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
}
