import { Box, Button, Modal } from '@material-ui/core';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { ArrowDropDown } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';

interface IProps {
    onSelection: (attr: Attribute) => void;
    showTool: boolean;
}

export function AttributePicker(props: IProps) {
    const { t } = useTranslation();

    return props.showTool ? (
        <React.Fragment>
            <Modal open={props.showTool} onClose={props.onSelection}>
                <Box>

                </Box>
            </Modal>
        </React.Fragment>
    ) : null;
}
