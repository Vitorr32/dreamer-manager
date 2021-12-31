import { Button } from '@mui/material';
import React from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { TraitPicker } from '../tools/TraitPicker';
import { Flag } from 'renderer/shared/models/base/Event.model';
import { FlagsPicker } from '../tools/FlagsPicker';

interface IProps {
    displayIDs: string[];
    onChange: (values: string[], returnData?: any) => void;
    returnData?: any;
    multi?: boolean;
}

export function FlagSelectionButton({ displayIDs, onChange, returnData, multi }: IProps) {
    const mappedDatabase = useSelector((state: RootState) => state.database.mappedDatabase);

    const { t } = useTranslation();
    const [showTool, setShowTool] = React.useState<boolean>(false);
    const [selectedValue, setValue] = React.useState<Flag[]>();

    const onValueSelected = (values: Flag[] | undefined = undefined) => {
        if (values === undefined) {
            setShowTool(false);
            setValue(undefined);
            return;
        }

        onChange(
            values.map((value) => value.id),
            returnData
        );
        setValue(values);
        setShowTool(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedValue === undefined || displayIDs.length === 0 ? t('interface.editor.condition.flag_selector_placeholder') : displayIDs.map((displayID) => mappedDatabase.flags[displayID].displayName)}
            </Button>

            <FlagsPicker showTool={showTool} onSelection={onValueSelected} multi={multi} />
        </React.Fragment>
    );
}
