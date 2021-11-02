import { Button } from '@mui/material';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { AttributePicker } from '../tools/AttributePicker.tool';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {
    displayIDs: string[];
    onChange: (value: string, returnData?: any) => void;
    returnData?: any;
}

export function AttributeSelectionButton({ displayIDs, onChange, returnData }: IProps) {
    const mappedDatabase = useSelector((state: RootState) => state.database.mappedDatabase);

    const { t } = useTranslation();
    const [showTool, setShowTool] = React.useState<boolean>(false);
    const [selectedAttribute, setAttribute] = React.useState<Attribute>();

    const onAttributeSelected = (attr: Attribute | undefined = undefined) => {
        if (attr === undefined) {
            setShowTool(false);
            setAttribute(undefined);
            return;
        }

        onChange(attr.id, returnData);

        setAttribute(attr);
        setShowTool(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedAttribute === undefined || displayIDs.length === 0 ? t('interface.editor.condition.attr_selector_placeholder') : displayIDs.map((displayID) => mappedDatabase.attributes[displayID].name)}
            </Button>

            <AttributePicker showTool={showTool} onSelection={onAttributeSelected} />
        </React.Fragment>
    );
}
