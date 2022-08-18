import { Card, Fab, Stack, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { TraitPicker } from '../tools/TraitPicker';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { TraitViewer } from './TraitViewer.component';
import { useState } from 'react';

interface IProps {
    traitList: string[];
    readOnly?: boolean;
    onChange?: (value: string[]) => void;
}

export function TraitList({ traitList, readOnly = true, onChange }: IProps) {
    const theme = useTheme();
    const traits = useAppSelector((state: RootState) => state.database.mappedDatabase.traits);

    const { t, i18n } = useTranslation();
    const [isTraitPickerOpen, setTraitPickerState] = useState<boolean>(false);

    const onAddTraitClick = (): void => {
        setTraitPickerState(true);
    };

    const onValueSelected = (values: Trait[] | undefined = undefined) => {
        if (values === undefined) {
            setTraitPickerState(false);
            return;
        }

        onChange(values.map((value) => value.id));
        setTraitPickerState(false);
    };

    return (
        <Card variant="outlined" sx={{ background: 'transparent', padding: '10px' }}>
            <Typography
                variant="caption"
                sx={{ position: 'absolute', top: '0', left: '10px', padding: '0 10px', background: theme.palette.background.default, transform: 'translateY(-50%)' }}
            >
                {t('interface.editor.character.trait_list_label')}
            </Typography>
            <Stack className="trait-list" direction="row" spacing={2}>
                {traitList.map((traitID) => (
                    <TraitViewer key={`trait_${traitID}`} trait={traits[traitID]} />
                ))}

                {!readOnly && (
                    <Fab color="primary" aria-label="add" onClick={onAddTraitClick}>
                        <AddIcon />
                    </Fab>
                )}
            </Stack>

            <TraitPicker onSelection={onValueSelected} showTool={isTraitPickerOpen} multi />
        </Card>
    );
}
