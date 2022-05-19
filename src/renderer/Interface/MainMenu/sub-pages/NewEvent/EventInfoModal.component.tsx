import { Box, Button, Dialog, DialogContent, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConditionTreeEditor } from 'renderer/shared/components/condition/ConditionTreeEditor.component';
import { ConditionTree } from 'renderer/shared/models/base/ConditionTree';
import { Event } from 'renderer/shared/models/base/Event.model';
import { ConnectionType, Scene, SceneConnection } from 'renderer/shared/models/base/Scene.model';
import { CopyClassInstance } from 'renderer/shared/utils/General';
interface IProps {
    open: boolean;
    event: Event;
    onClose: () => void;
    onEventChange: (keyName: 'id' | 'displayName', value: any) => void;
}

export function EventInfoModal({ open, event, onClose, onEventChange }: IProps) {
    const { t, i18n } = useTranslation();

    const onConnectionTypeChange = (newType: ConnectionType): void => {};

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', width: '400px' }}>
                <Typography variant="h5">{t('interface.editor.event.flag_heading')}</Typography>

                <TextField
                    type="text"
                    label={t('interface.editor.event.event_id_label')}
                    variant="outlined"
                    value={event.id || ''}
                    onChange={(event) => onEventChange('id', event.target.value)}
                />

                <TextField
                    type="text"
                    label={t('interface.editor.event.event_display_name_label')}
                    variant="outlined"
                    value={event.displayName || ''}
                    onChange={(event) => onEventChange('displayName', event.target.value)}
                />
            </DialogContent>
        </Dialog>
    );
}
