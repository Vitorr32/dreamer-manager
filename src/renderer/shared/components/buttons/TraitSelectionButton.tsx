import { Button } from '@mui/material';
import React from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { TraitPicker } from '../tools/TraitPicker';

interface IProps {
    displayIDs: string[];
    onChange: (values: string[]) => void;
    returnData?: any;
    multi?: boolean;
}

export function TraitSelectionButton({ displayIDs, onChange, multi }: IProps) {
    const mappedDatabase = useSelector((state: RootState) => state.database.mappedDatabase);

    const { t, i18n } = useTranslation();
    const [showTool, setShowTool] = React.useState<boolean>(false);
    const [selectedValue, setValue] = React.useState<Trait[]>();

    const onValueSelected = (values: Trait[] | undefined = undefined) => {
        if (values === undefined) {
            setShowTool(false);
            setValue(undefined);
            return;
        }

        onChange(values.map((value) => value.id));
        setValue(values);
        setShowTool(false);
    };

    return (
        <>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedValue === undefined || displayIDs.length === 0
                    ? t('interface.editor.condition.trait_selector_placeholder')
                    : displayIDs.map((displayID) => mappedDatabase.traits[displayID].getName(i18n.language))}
            </Button>

            <TraitPicker showTool={showTool} onSelection={onValueSelected} multi={multi} />
        </>
    );
}
