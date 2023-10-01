import { Avatar, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Trait } from 'renderer/shared/models/base/Trait.model';
import { useEffect, useState } from 'react';
import { GetFileFromResources } from 'renderer/shared/utils/StringOperations';
import { ICONS, TRAITS } from 'renderer/shared/Constants';

interface IProps {
    trait: Trait;
}

export function TraitViewer({ trait }: IProps) {
    const theme = useTheme();

    const { t, i18n } = useTranslation();
    const [iconPath, setIconPath] = useState<string>();

    useEffect(() => {
        const getIconPath = async () => {
            return GetFileFromResources(trait.iconPath).then((result) => result.path);
        };

        getIconPath()
            .then((path) => setIconPath(path))
            .catch((e) => console.error('CUSTOM - Failed to load Icon', e));
    }, [trait]);

    return (
        <>
            <Avatar alt={trait.getName(i18n.language)} src={iconPath || ''} sx={{ width: 56, height: 56 }} />
        </>
    );
}
