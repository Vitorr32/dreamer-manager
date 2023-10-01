import React, { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, List, ListItemButton, ListItemText, Modal, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Placeholder from '@mui/icons-material/VerifiedUser';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Event } from 'renderer/shared/models/base/Event.model';
import { Flag } from 'renderer/shared/models/interfaces/Flag.interface';
import { JoinArrayOfString } from 'renderer/shared/utils/StringOperations';

interface IProps {
    onSelection: (selected?: Flag[]) => void;
    showTool: boolean;
    multi?: boolean;
    global?: boolean;
}

export function FlagsPicker({ onSelection, multi, showTool, global }: IProps) {
    const secondaryValueList = useSelector((state: RootState) => state.database.events);
    const secondaryValueDB = useSelector((state: RootState) => state.database.mappedDatabase.events);

    const { t } = useTranslation();
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<Flag[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event[]>([]);
    const [currentEvent, setCurrentEvent] = useState<Event>();
    const [filtered, setFiltered] = useState<Event[]>([]);

    useEffect(() => {
        setFiltered(filterListByQuery(query));
    }, [query]);

    const filterListByQuery = (query: string): Event[] => {
        return secondaryValueList
            .filter((value) => value.id?.includes(query) || value.displayName?.toLowerCase().includes(query))
            .sort((a: Event, b: Event) => a.displayName.localeCompare(b.displayName));
    };

    const onToggleSelection = (toggled: Flag): void => {
        if (!multi) {
            setSelectedEvent([secondaryValueDB[toggled.eventID]]);
            setSelected([toggled]);
            return;
        }

        const newSelection = selected.slice();
        const newSelectionSecondary = selectedEvent.slice();

        if (selected.includes(toggled)) {
            const selectedIndex = selected.findIndex((value) => value.id === toggled.id);
            newSelection.splice(selectedIndex, 1);

            const shouldRemoveEvent = selected.some((flag) => flag.eventID === toggled.eventID);
            if (shouldRemoveEvent) {
                const selectedIndex = selectedEvent.findIndex((event) => event.id === toggled.eventID);
                newSelectionSecondary.splice(selectedIndex, 1);
            }
        } else {
            newSelection.push(toggled);
            newSelectionSecondary.push(secondaryValueDB[toggled.eventID]);
        }

        setSelected(newSelection);
        setSelectedEvent(newSelectionSecondary);
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
        setSelected([]);
        setSelectedEvent([]);
    };

    return showTool ? (
        <Modal className="modal" open={showTool} onClose={onClose}>
            <div className="modal__wrapper">
                <div className="modal__content">
                    <div className="modal__header">
                        <Typography variant="h2" component="h2">
                            {t('interface.tools.flag.title')}
                        </Typography>

                        <OutlinedInput
                            value={query}
                            className="modal__search"
                            placeholder={t('interface.tools.flag.search_placeholder')}
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
                                <Box
                                    className={`cell cell-flag ${selectedEvent.some((event) => event.id === value.id) ? 'cell-selected' : ''}`}
                                    key={value.id}
                                    onClick={() => setCurrentEvent(value)}
                                >
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
                                            <Typography variant="body1">{value.displayName}</Typography>
                                        </div>
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{value.unique}</Typography>
                                        </div>

                                        <div className="cell__content-full">
                                            <Typography variant="body2">{value.displayName}</Typography>
                                        </div>
                                    </div>
                                </Box>
                            );
                        })}

                        {currentEvent && (
                            <div className="modal__grid-subselection">
                                <Typography variant="body2">{t('interface.tools.flag.flag_select', { value: currentEvent })}</Typography>
                                <List>
                                    {currentEvent.flags
                                        .filter((flag) => Boolean(global) === Boolean(flag.global))
                                        .map((flag) => (
                                            <ListItemButton key={`flag_${flag.id}`} selected={selected.includes(flag)} onClick={() => onToggleSelection(flag)}>
                                                <ListItemText primary={flag.displayName} secondary={`ID: ${flag.id}`} />
                                            </ListItemButton>
                                        ))}
                                </List>
                                <Button variant="contained" className="modal__grid-subselection-back" onClick={() => setCurrentEvent(undefined)}>
                                    {t('interface.tools.common.close')}
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="modal__footer">
                        <div className="modal__message">
                            {selected ? (
                                <Typography variant="caption" className="modal__message-info">
                                    {t('interface.tools.flag.selected', {
                                        value: {
                                            flag: JoinArrayOfString(selected.map((object) => object.displayName)),
                                            event: JoinArrayOfString(selectedEvent.map((object) => object.displayName)),
                                        },
                                    })}
                                </Typography>
                            ) : (
                                <Typography variant="caption" className="modal__message-error">
                                    {t('interface.tools.flag.empty')}
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
