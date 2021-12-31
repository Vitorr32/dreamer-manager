import React, { useEffect, useState } from 'react';
import { Button, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Placeholder from '@mui/icons-material/VerifiedUser';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Event, Flag } from 'renderer/shared/models/base/Event.model';

interface IProps {
    onSelection: (selected?: Flag[]) => void;
    showTool: boolean;
    multi?: boolean;
}

export function FlagsPicker({ onSelection, multi, showTool }: IProps) {
    const secondaryValueList = useSelector((state: RootState) => state.database.events);
    const secondaryValueDB = useSelector((state: RootState) => state.database.mappedDatabase.events);
    const valueList = useSelector((state: RootState) => state.database.flags);

    const { t } = useTranslation();
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<Flag[]>([]);
    const [associatedEvent, setAssociatedEvent] = useState<Event>();
    const [filtered, setFiltered] = useState<Event[]>([]);

    useEffect(() => {
        setFiltered(filterListByQuery(query));
    }, [query]);

    const filterListByQuery = (query: string): Event[] => {
        return secondaryValueList.filter((value) => value.id?.includes(query) || value.displayName?.includes(query)).sort((a: Event, b: Event) => a.displayName.localeCompare(b.displayName));
    };

    const onToggleSelection = (toggled: Event): void => {
        //TODO: Set the event and open the flag sub-selection
        // if (!multi) {
        //     setAssociatedEvent(secondaryValueDB[toggled.eventID]);
        //     setSelected([toggled]);
        //     return;
        // }

        // const newSelection = selected.slice();
        // if (selected.includes(toggled)) {
        //     newSelection.splice(
        //         selected.findIndex((value) => value.id === toggled.id),
        //         1
        //     );
        // } else {
        //     newSelection.push(toggled);
        // }
        // setSelected(newSelection);
    };

    const onSubmitPickedOptions = (): void => {
        if (selected.length === 0) {
            return;
        }

        onSelection(selected);
        setQuery('');
    };

    const onClose = (): void => {
        onSelection();
        setQuery('');
    };

    return showTool ? (
        <Modal className="modal" open={showTool} onClose={onClose}>
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

                        <CloseIcon className="modal__close" fontSize="large" onClick={onClose} />
                    </div>

                    <div className="modal__grid modal__grid-columns">
                        {filtered.map((value) => {
                            return (
                                <div className={`cell cell-attribute ${value.flags.some(flag => flag.eventID === associatedEvent?.id) ? 'cell-selected' : ''}`} key={value.id} onClick={() => onToggleSelection(value)}>
                                    <div className="cell__header">
                                        <Typography className="cell__title" variant="h5">
                                            {value.displayName}
                                        </Typography>
                                        <Typography className="cell__sub-title" variant="caption">
                                            ID: <b>{value.id}</b>
                                        </Typography>
                                    </div>
                                    <div className="cell__content">
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{value.trigger}</Typography>
                                        </div>
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{value.unique}</Typography>
                                        </div>

                                        <div className="cell__content-full">
                                            <Typography variant="body2">{value.visualNovel}</Typography>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="modal__footer">
                        <div className="modal__message">
                            {selected ? (
                                <Typography variant="caption" className="modal__message-info">
                                    {t('interface.tools.attribute.selected', { attr: selected })}
                                </Typography>
                            ) : (
                                <Typography variant="caption" className="modal__message-error">
                                    {t('interface.tools.attribute.empty')}
                                </Typography>
                            )}
                        </div>
                        <div className="modal__buttons">
                            <Button variant="contained" className="modal__buttons-cancel" color="error" onClick={onClose}>
                                {t('interface.tools.common.cancel')}
                            </Button>
                            <Button variant="contained" className="modal__buttons-submit" color="primary" onClick={onSubmitPickedOptions}>
                                {t('interface.tools.common.select')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    ) : null;
}
