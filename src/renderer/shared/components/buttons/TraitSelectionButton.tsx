import { Button } from '@mui/material';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { TraitPicker } from '../tools/TraitPicker';

interface IProps {
    displayIDs: string[];
    onChange: (value: string, returnData?: any) => void;
    returnData?: any;
}

export function TraitSelectionButton({ displayIDs, onChange, returnData }: IProps) {
    const mappedDatabase = useSelector((state: RootState) => state.database.mappedDatabase);

    const { t } = useTranslation();
    const [showTool, setShowTool] = React.useState<boolean>(false);
    const [selectedValue, setValue] = React.useState<Trait>();

    const onValueSelected = (value: Trait | undefined = undefined) => {
        if (value === undefined) {
            setShowTool(false);
            setValue(undefined);
            return;
        }

        onChange(value.id, returnData);
        setValue(value);
        setShowTool(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedValue === undefined || displayIDs.length === 0 ? t('interface.editor.condition.trait_selector_placeholder') : displayIDs.map((displayID) => mappedDatabase.traits[displayID].name)}
            </Button>

            <TraitPicker showTool={showTool} onSelection={onValueSelected} />
        </React.Fragment>
    );
}
