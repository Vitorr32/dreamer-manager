import { Box, Button, Paper, Step, StepButton, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LanguageToggle } from 'renderer/shared/components/util/LanguageToggle.component';
import { CharacterBasicInfoEditor } from './CharacterBasicInfoEditor.component';
import { Character, CharacterType, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { Dreamer, DreamerVariablesKey } from 'renderer/shared/models/base/Dreamer.model';
import { DreamerInfoEditor } from './DreamerInfoEditor.component';
import { CharacterPaperDollEditor } from './CharacterPaperDollEditor.component';

interface IProps {}

export function CharacterEditor({}: IProps) {
    const { t, i18n } = useTranslation();

    const CharacterSteps = [
        { label: t('interface.editor.character.step_basic_info'), completed: false },
        { label: t('interface.editor.character.step_specific_info'), completed: false },
        { label: t('interface.editor.character.step_sprite_info'), completed: false },
    ];
    const params = useParams();
    const mappedEntities = useSelector((state: RootState) => state.database.mappedDatabase.characters);

    const [currentCharacter, setCurrentCharacter] = useState<Dreamer | Character>();
    const [stepperIndex, setStepperIndex] = useState<number>(0);

    useEffect(() => {
        const IDParameter = params?.id;

        if (IDParameter) {
            const toEditCharacter = mappedEntities[IDParameter];

            setCurrentCharacter(toEditCharacter);
        } else {
            setCurrentCharacter(new Character());
        }
    }, []);

    const onCharacterVariableUpdated = (key: CharacterVariablesKey | DreamerVariablesKey, value: any) => {
        if (key === CharacterVariablesKey.TYPE && value === CharacterType.ACTIVE_DREAMER) {
            const convertedToDreamer = Object.assign(new Dreamer(), currentCharacter);

            convertedToDreamer[key] = value;
            setCurrentCharacter(convertedToDreamer);
            return;
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
                        paperDoll={currentCharacter.paperDoll}
                        onChange={onCharacterVariableUpdated}
                        onPreviousStep={onPreviousStep}
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
                                <StepButton onClick={(_) => setStepperIndex(index)}>{characterStep.label}</StepButton>
                            </Step>
                        );
                    })}
                </Stepper>

                <Typography variant="subtitle2">{t('interface.editor.character.subtitle')}</Typography>
            </Box>

            <Box component="main" sx={{ overflow: 'visible' }}>
                {getStepperContent(stepperIndex)}
            </Box>
        </Box>
    );
}
