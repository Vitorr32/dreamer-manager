import { Modal, Typography } from '@material-ui/core';
import React from 'react';
import { Condition } from '../../models/base/Condition.model';
import { ConditionInitiator } from '../../models/enums/ConditionInitiator.enum';
import { ArrowDropDown } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';

interface IProps {
    onSelection: (attr?: Attribute) => void;
    showTool: boolean;
}

export function AttributePicker(props: IProps) {
    const { t } = useTranslation();

    return props.showTool ? (
        <Modal className="modal" open={props.showTool} onClose={() => props.onSelection()}>
            <div className="modal__wrapper">
                <div className="modal__content">
                    <Typography variant="h2" component="h2">
                        {t('interface.tools.attribute.title')}
                    </Typography>
                </div>
            </div>
        </Modal>
    ) : null;
}
