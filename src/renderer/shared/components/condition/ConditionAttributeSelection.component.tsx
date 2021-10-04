import { Button } from '@material-ui/core';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { ArrowDropDown } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { AttributePicker } from '../tools/AttributePicker.tool';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {
    condition: Condition;
    onChange: (index: number, value: string) => void;
}

export function ConditionAttributeSelection(props: IProps) {
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

        const newCondition = new Condition();
        newCondition.parameters[0] = attr.id;

        props.onChange(0, attr.id);
        setAttribute(attr);
        setShowTool(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={() => setShowTool(!showTool)}>
                {selectedAttribute === undefined ? t('interface.editor.condition.attr_selector_placeholder') : mappedDatabase.attributes[props.condition.parameters[0]].name}
            </Button>

            <AttributePicker showTool={showTool} onSelection={onAttributeSelected} />
        </React.Fragment>
    );
}
