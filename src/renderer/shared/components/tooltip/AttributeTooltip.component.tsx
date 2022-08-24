import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';

interface IProps {
    attribute: Attribute;
}

export function AttributeTooltip({ attribute, children }: PropsWithChildren<IProps>) {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    return (
        <Tooltip
            title={
                <>
                    <Typography variant="h5">{attribute.getName(i18n.language)}</Typography>
                    <Typography variant="caption">{attribute.getName(i18n.language)}</Typography>
                </>
            }
        >
            {children ? children : null}
        </Tooltip>
    );
}
