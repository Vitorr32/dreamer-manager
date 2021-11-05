import { Button } from '@mui/material';
import React from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { AttributePicker } from '../tools/AttributePicker.tool';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {
    displayIDs: string[];
    onChange: (value: string[], returnData?: any) => void;
    returnData?: any;
    multi?: boolean;
}

export function AttributeSelectionButton({ displayIDs, onChange, returnData, multi }: IProps) {
    const mappedDatabase = useSelector((state: RootState) => state.database.mappedDatabase);

    const { t } = useTranslation();
    const [showTool, setShowTool] = React.useState<boolean>(false);
    const [selectedAttribute, setAttribute] = React.useState<Attribute[]>();

    const onAttributeSelected = (values: Attribute[] | undefined = undefined) => {
        console.log('values', values);

        if (values === undefined) {
            setShowTool(false);
            setAttribute(undefined);
            return;
        }

        onChange(
            values.map((value) => value.id),
            returnData
        );

        setAttribute(values);
        setShowTool(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedAttribute === undefined || displayIDs.length === 0 ? t('interface.editor.condition.attr_selector_placeholder') : displayIDs.map((displayID) => mappedDatabase.attributes[displayID].name).join(', ')}
            </Button>

            <AttributePicker showTool={showTool} onSelection={onAttributeSelected} multi/>
        </React.Fragment>
    );
}
