import { Avatar, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useEffect, useState } from 'react';
import { GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ICONS, TRAITS } from 'renderer/shared/Constants';
import { Dreamer, DreamerVariablesKey } from 'renderer/shared/models/base/Dreamer.model';

interface IProps {
    dreamer: Dreamer;
    editable?: boolean;
    onChange?: (attribute: DreamerVariablesKey, value: number) => void;
}

export function DreamerAttributeViewer({ dreamer, editable = false, onChange }: IProps) {
    const theme = useTheme();

    const { t, i18n } = useTranslation();
    const [iconPath, setIconPath] = useState<string>();
    const attributes = useAppSelector((state: RootState) => state.database.mappedDatabase.attributes);

    return <Box sx={{ display: 'grid' }}>
        <Box>

        </Box>
    </Box>;
}
