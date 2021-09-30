import React, { useState } from 'react';
import { InputAdornment, Modal, OutlinedInput, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';

interface IProps {
    onSelection: (attr?: Attribute) => void;
    showTool: boolean;
}

export function AttributePicker(props: IProps) {
    const attributes = useSelector((state: RootState) => state.database.attributes);

    const { t } = useTranslation();
    const [attrQuery, setAttrQuery] = useState('');

    const filterAttributesByQuery = (query: string): Attribute[] => {
        return attributes.filter((attr) => attr.id?.includes(query) || attr.name?.includes(query) || attr.description?.includes(query)).sort((a: Attribute, b: Attribute) => a.name.localeCompare(b.name));
    };

    return props.showTool ? (
        <Modal className="modal" open={props.showTool} onClose={() => props.onSelection()}>
            <div className="modal__wrapper">
                <div className="modal__content">
                    <div className="modal__header">
                        <Typography variant="h2" component="h2">
                            {t('interface.tools.attribute.title')}
                        </Typography>

                        <OutlinedInput
                            value={attrQuery}
                            className="modal__search"
                            placeholder={t('interface.tools.attribute.search_placeholder')}
                            onChange={(evt: any) => setAttrQuery(evt.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />

                        <CloseIcon className="modal__close" fontSize="large" />
                    </div>

                    <div className="modal__grid modal__grid-columns">
                        {attributes}
                        <div className="modal__cell"></div>
                    </div>
                </div>
            </div>
        </Modal>
    ) : null;
}
