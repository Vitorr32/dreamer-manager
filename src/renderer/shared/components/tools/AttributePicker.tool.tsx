import React, { useEffect, useState } from 'react';
import { Button, InputAdornment, Modal, OutlinedInput, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Placeholder from '@material-ui/icons/VerifiedUser';
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
    const [query, setQuery] = useState<string>('');
    const [selectedAttr, setSelectedAttr] = useState<Attribute>();
    const [filtered, setFiltered] = useState<Attribute[]>([]);

    useEffect(() => {
        console.log('YOLO');
        setFiltered(filterAttributesByQuery(query));
    }, [query]);

    const filterAttributesByQuery = (query: string): Attribute[] => {
        console.log(attributes.filter((attr) => attr.id?.includes(query) || attr.name?.includes(query) || attr.description?.includes(query)).sort((a: Attribute, b: Attribute) => a.name.localeCompare(b.name)));
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
                            value={query}
                            className="modal__search"
                            placeholder={t('interface.tools.attribute.search_placeholder')}
                            onChange={(evt: any) => setQuery(evt.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />

                        <CloseIcon className="modal__close" fontSize="large" onClick={() => props.onSelection()} />
                    </div>

                    <div className="modal__grid modal__grid-columns">
                        {filtered.map((attribute) => {
                            return (
                                <div className={`cell cell-attribute ${selectedAttr === attribute ? 'cell-selected' : ''}`} key={attribute.id} onClick={() => setSelectedAttr(selectedAttr === attribute ? undefined : attribute)}>
                                    <div className="cell__header">
                                        <Typography className="cell__title" variant="h5">
                                            {attribute.name}
                                        </Typography>
                                        <Typography className="cell__sub-title" variant="caption">
                                            ID: <b>{attribute.id}</b>
                                        </Typography>
                                    </div>
                                    <div className="cell__content">
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{t(attribute.category)}</Typography>
                                        </div>
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{t(attribute.growth)}</Typography>
                                        </div>

                                        <div className="cell__content-full">
                                            <Typography variant="body2">{attribute.description}</Typography>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="modal__footer">
                        <div className="modal__message">
                            {selectedAttr ? (
                                <Typography variant="body1" className="modal__message-info">
                                    {t('interface.tools.attribute.selected', { attr: selectedAttr })}
                                </Typography>
                            ) : (
                                <Typography variant="body1" className="modal__message-error">
                                    {t('interface.tools.attribute.empty')}
                                </Typography>
                            )}
                        </div>
                        <div className="modal__buttons">
                            <Button variant="contained" className="modal__cancel" color="error">
                                Cancel
                            </Button>
                            <Button variant="contained" className="modal__submit" color="primary">
                                Select
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    ) : null;
}
