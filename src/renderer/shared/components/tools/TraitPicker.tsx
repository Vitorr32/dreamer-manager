import React, { useEffect, useState } from 'react';
import { Button, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Placeholder from '@mui/icons-material/VerifiedUser';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Trait } from 'renderer/shared/models/base/Trait.model';

interface IProps {
    onSelection: (values?: Trait[]) => void;
    showTool: boolean;
    multi?: boolean;
}

export function TraitPicker({ multi, onSelection, showTool }: IProps) {
    const valueList = useSelector((state: RootState) => state.database.traits);

    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState<string>('');
    const [selected, setSelected] = useState<Trait[]>([]);
    const [filtered, setFiltered] = useState<Trait[]>([]);

    useEffect(() => {
        setFiltered(filterListByQuery(query));
    }, [query]);

    const filterListByQuery = (query: string): Trait[] => {
        return valueList
            .filter((value) => value.id?.includes(query) || value.getName(i18n.language)?.toLowerCase().includes(query) || value.getDescription(i18n.language)?.toLowerCase().includes(query))
            .sort((a: Trait, b: Trait) => a.getName(i18n.language).localeCompare(b.getName(i18n.language)));
    };

    const onToggleSelection = (toggled: Trait): void => {
        if (!multi) {
            setSelected([toggled]);
            return;
        }

        const newSelection = selected.slice();
        if (selected.includes(toggled)) {
            newSelection.splice(
                selected.findIndex((value) => value.id === toggled.id),
                1
            );
        } else {
            newSelection.push(toggled);
        }
        setSelected(newSelection);
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
                            {t('interface.tools.trait.title')}
                        </Typography>

                        <OutlinedInput
                            value={query}
                            className="modal__search"
                            placeholder={t('interface.tools.trait.search_placeholder')}
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
                                <div className={`cell cell-trait ${selected.includes(value) ? 'cell-selected' : ''}`} key={value.id} onClick={() => onToggleSelection(value)}>
                                    <div className="cell__header">
                                        <Typography className="cell__title" variant="h5">
                                            {value.getName(i18n.language)}
                                        </Typography>
                                        <Typography className="cell__sub-title" variant="caption">
                                            ID: <b>{value.id}</b>
                                        </Typography>
                                    </div>
                                    <div className="cell__content">
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{value.getName(i18n.language)}</Typography>
                                        </div>
                                        <div className="cell__content-sibling">
                                            <Placeholder />
                                            <Typography variant="body1">{t(value.getName(i18n.language))}</Typography>
                                        </div>

                                        <div className="cell__content-full">
                                            <Typography variant="body2">{value.getDescription(i18n.language)}</Typography>
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
                                    {t('interface.tools.trait.selected', { value: selected })}
                                </Typography>
                            ) : (
                                <Typography variant="caption" className="modal__message-error">
                                    {t('interface.tools.trait.empty')}
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
