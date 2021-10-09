import { Button } from '@mui/material';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {
    condition: Condition;
    onChange: (index: number, value: string) => void;
}

export function ConditionSelectionTrait(props: IProps) {
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

        props.onChange(0, value.id);
        setValue(value);
        setShowTool(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedValue === undefined ? t('interface.editor.condition.trait_selector_placeholder') : mappedDatabase.traits[props.condition.parameters[0]].name}
            </Button>

            {/* <AttributePicker showTool={showTool} onSelection={onAttributeSelected} /> */}
        </React.Fragment>
    );
}
