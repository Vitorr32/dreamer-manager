import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { useState } from 'react';
import { Dreamer, DreamerVariablesKey } from 'renderer/shared/models/base/Dreamer.model';
import { AttributeTooltip } from '../tooltip/AttributeTooltip.component';
import { Category } from 'renderer/shared/models/enums/Category.enum';

interface IProps {
    dreamer: Dreamer;
    editable?: boolean;
    onChange?: (attribute: DreamerVariablesKey, value: number) => void;
}

export function DreamerAttributeViewer({ dreamer, editable = false, onChange }: IProps) {
    const theme = useTheme();

    const { t, i18n } = useTranslation();

    const attributeList = useAppSelector((state: RootState) => state.database.attributes);
    const attributes = useAppSelector((state: RootState) => state.database.mappedDatabase.attributes);

    const getAttributeFromCategory = (category: Category) => {
        return attributeList.filter((attribute) => attribute.category === category);
    };

    return (
        <Box className="dreamer-attribute-viewer" sx={{ display: 'grid' }}>
            {/* BASIC ATTRIBUTES */}
            <Stack spacing={2} direction={'column'}>
                {getAttributeFromCategory(Category.BASIC).map((attribute) => (
                    <AttributeTooltip key={`attr_tooltip_${attribute.id}`} attribute={attribute}>
                        <Box key={`attr_info_${attribute.id}`} className="dreamer-attribute-viewer__attribute" sx={{ display: 'flex' }}>
                            <Typography>{attribute.getName(i18n.language)}</Typography>
                            <Typography>{(dreamer as any)[attribute.id]}</Typography>
                        </Box>
                    </AttributeTooltip>
                ))}
            </Stack>

            {/* SUNLIGHT ATTRIBUTES */}
            <Stack spacing={2} direction={'column'}>
                {getAttributeFromCategory(Category.SUNLIGHT).map((attribute) => (
                    <AttributeTooltip key={`attr_tooltip_${attribute.id}`} attribute={attribute}>
                        <Box key={`attr_info_${attribute.id}`} className="dreamer-attribute-viewer__attribute" sx={{ display: 'flex' }}>
                            <Typography>{attribute.getName(i18n.language)}</Typography>
                            <Typography>{(dreamer as any)[attribute.id]}</Typography>
                        </Box>
                    </AttributeTooltip>
                ))}
            </Stack>

            {/* STARLIGHT ATTRIBUTES */}
            <Stack spacing={2} direction={'column'}>
                {getAttributeFromCategory(Category.STARLIGHT).map((attribute) => (
                    <AttributeTooltip key={`attr_tooltip_${attribute.id}`} attribute={attribute}>
                        <Box key={`attr_info_${attribute.id}`} className="dreamer-attribute-viewer__attribute" sx={{ display: 'flex' }}>
                            <Typography>{attribute.getName(i18n.language)}</Typography>
                            <Typography>{(dreamer as any)[attribute.id]}</Typography>
                        </Box>
                    </AttributeTooltip>
                ))}
            </Stack>

            {/* MOONLIGHT ATTRIBUTES */}
            <Stack spacing={2} direction={'column'}>
                {getAttributeFromCategory(Category.STARLIGHT).map((attribute) => (
                    <AttributeTooltip key={`attr_tooltip_${attribute.id}`} attribute={attribute}>
                        <Box key={`attr_info_${attribute.id}`} className="dreamer-attribute-viewer__attribute" sx={{ display: 'flex' }}>
                            <Typography>{attribute.getName(i18n.language)}</Typography>
                            <Typography>{(dreamer as any)[attribute.id]}</Typography>
                        </Box>
                    </AttributeTooltip>
                ))}
            </Stack>
        </Box>
    );
}
