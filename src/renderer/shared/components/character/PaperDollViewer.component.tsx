import { Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';

interface IProps {
    paperDoll: PaperDoll;
    editable?: boolean;
    fullBody?: boolean;
}

export function PaperDollViewer({ paperDoll, editable = false, fullBody = false }: IProps) {
    const theme = useTheme();
    const traits = useAppSelector((state: RootState) => state.database.mappedDatabase.traits);

    const { t, i18n } = useTranslation();

    return <Stack direction="column"></Stack>;
}
