import {
    Box,
    Button,
    Checkbox,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Event, Flag } from 'renderer/shared/models/base/Event.model';
import { Scene } from 'renderer/shared/models/base/Scene.model';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onFlagModified: (flag: Flag) => void;
    event: Event;
}

export function NewEventFlag({ isOpen, onClose, event, onFlagModified }: IProps) {
    const { t, i18n } = useTranslation();
    const [selectedFlag, setSelectedFlag] = useState<Flag>();

    const onFlagAdded = () => {
        const flag: Flag = {
            id: `event_flag_${uuidv4()}`,
            displayName: `Flag ${event.flags.length + 1}`,
            permanent: true,
            global: false,
            eventID: event.id,
        };

        onFlagModified(flag);
    };

    const onFlagChanged = (keyName: 'id' | 'displayName' | 'permanent' | 'global' | 'hoursToExpire', value: any) => {
        selectedFlag[keyName] = value;

        onFlagModified(selectedFlag);
        setSelectedFlag(selectedFlag);
    };

    return (
        <Dialog className="new-flag" open={isOpen} onClose={onClose}>
            <DialogContent>
                <Typography variant="h5">{t('interface.editor.event.flag_heading')}</Typography>

                <Typography variant="caption">{t('interface.editor.event.flag_sub_heading')}</Typography>

                {...event.flags.map((flag) => (
                    <Box className="new-flag__flag">
                        <Box className="new-flag__flag-header" onClick={() => setSelectedFlag(flag)}>
                            {flag.displayName || ''} - {flag.id}
                        </Box>
                        <Collapse in={selectedFlag?.id === flag.id}>
                            <TextField
                                label={t('interface.editor.event.flag_id')}
                                helperText={t('interface.editor.event.flag_id_helper')}
                                variant="outlined"
                                value={flag.id}
                                onChange={(event) => onFlagChanged('id', event.target.value)}
                            />

                            <TextField
                                label={t('interface.editor.event.flag_name')}
                                helperText={t('interface.editor.event.flag_name_helper')}
                                variant="outlined"
                                value={flag.displayName}
                                onChange={(event) => onFlagChanged('displayName', event.target.value)}
                            />

                            <FormControl variant="outlined">
                                <FormControlLabel
                                    control={<Switch checked={flag.permanent} onChange={(e) => onFlagChanged('permanent', e.target.checked)} />}
                                    label={t('interface.editor.event.flag_permanent')}
                                />
                                <FormHelperText>{t('interface.editor.event.flag_permanent_helper')}</FormHelperText>
                            </FormControl>

                            {!flag.permanent && (
                                <TextField
                                    type="number"
                                    label={t('interface.editor.event.flag_hours')}
                                    helperText={t('interface.editor.event.flag_hours_helper')}
                                    variant="outlined"
                                    value={flag.hoursToExpire}
                                    onChange={(event) => onFlagChanged('hoursToExpire', event.target.value)}
                                />
                            )}

                            <FormControl variant="outlined">
                                <FormControlLabel
                                    control={<Switch checked={flag.global} onChange={(e) => onFlagChanged('global', e.target.checked)} />}
                                    label={t('interface.editor.event.flag_global')}
                                />
                                <FormHelperText>{t('interface.editor.event.flag_global_helper')}</FormHelperText>
                            </FormControl>
                        </Collapse>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onFlagAdded}>{t('interface.editor.event.flag_add_new')}</Button>
            </DialogActions>
        </Dialog>
    );
}
