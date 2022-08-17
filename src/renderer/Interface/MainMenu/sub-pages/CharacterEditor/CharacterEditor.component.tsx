import { Box, Button, Step, StepButton, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LanguageToggle } from 'renderer/shared/components/util/LanguageToggle.component';
import { CharacterBasicInfoEditor } from './CharacterBasicInfoEditor.component';
import { Character, CharacterVariablesKey } from 'renderer/shared/models/base/Character.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { CopyClassInstance } from 'renderer/shared/utils/General';
import { CharacterAdvancedInfoEditor } from './CharacterAdvancedInfoEditor.component';
import { Dreamer } from 'renderer/shared/models/base/Dreamer.model';

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

    const onCharacterVariableUpdated = (key: CharacterVariablesKey, value: any) => {
        const updatedCharacter: any = CopyClassInstance(currentCharacter);

        updatedCharacter[key] = value;
        setCurrentCharacter(updatedCharacter);
    };

    const getStepperContent = (index: number): JSX.Element | null => {
        switch (index) {
            case 0:
                return <CharacterBasicInfoEditor onChange={onCharacterVariableUpdated} character={currentCharacter} />;
            case 1:
                return <CharacterAdvancedInfoEditor onChange={onCharacterVariableUpdated} character={currentCharacter} />;
            default:
                return null;
        }
    };

    if (!currentCharacter) {
        return null;
    }

    return (
        <Box className="new-event">
            <Box component="header" className="new-event__header">
                <Link to="/menu/edit/character">
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                </Link>

                <Typography variant="h5">{t('interface.editor.character.title') as string}</Typography>

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
