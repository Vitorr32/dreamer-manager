import { Button } from '@material-ui/core';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { ArrowDropDown } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { AttributePicker } from '../tools/AttributePicker.tool';

interface IProps {
    condition: Condition;
    onChange: (index: number, value: number) => void;
}

export function ConditionAttributeSelection(props: IProps) {
    const { t } = useTranslation();
    const [showTool, setShowTool] = React.useState<boolean>(false);
    const [selectedAttribute, setAttribute] = React.useState<null | Attribute>(null);

    const onAttributeSelected = (attr: Attribute) => {
        const newCondition = new Condition();
        newCondition.parameters[0] = attr.id;

        props.onChange(newCondition);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />}>
                {props.condition.initiator === ConditionInitiator.UNDEFINED ? t('interface.editor.condition.attr_selector_placeholder') : t(props.condition.parameters[0])}
            </Button>

            <AttributePicker showTool={showTool} onSelection={onAttributeSelected} />
        </React.Fragment>
    );
}
