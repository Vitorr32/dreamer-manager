import { Box, Chip, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Dreamer, DreamerVariablesKey } from 'renderer/shared/models/base/Dreamer.model';
import { AttributeTooltip } from '../tooltip/AttributeTooltip.component';
import { Category } from 'renderer/shared/models/enums/Category.enum';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import SunlightIcon from '@mui/icons-material/Brightness7';
import StarlightIcon from '@mui/icons-material/AutoAwesome';
import NightsIcon from '@mui/icons-material/NightsStay';
import BasicIcon from '@mui/icons-material/Person';

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

    const getIndividualAttributeViewer = (attribute: Attribute) => {
        return (
            <AttributeTooltip key={`attr_tooltip_${attribute.id}`} attribute={attribute}>
                <Paper key={`attr_info_${attribute.id}`} sx={{ display: 'inline-flex', padding: '5px', borderRadius: '10px' }}>
                    <Typography sx={{ color: 'text.primary' }}>{attribute.getName(i18n.language)}</Typography>
                    <Chip sx={{ marginLeft: '10px' }} label={(dreamer as any)[attribute.id] || 20} />
                </Paper>
            </AttributeTooltip>
        );
    };

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', columnGap: '10px', rowGap: '10px' }}>
            {/* SUNLIGHT ATTRIBUTES */}
            <Stack
                spacing={'2px'}
                direction={'column'}
                sx={{
                    padding: '10px',
                    border: `2px solid ${theme.palette.background.paper}`,
                    borderRadius: '10px',
                    gridColumnStart: '0',
                    gridColumnEnd: '1',
                    gridRowStart: 'span 2',
                }}
            >
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="body1">
                    {t('model.attribute.category.sun')}
                    <SunlightIcon sx={{ marginLeft: '10px' }} />
                </Typography>
                {getAttributeFromCategory(Category.SUNLIGHT).map((attribute: Attribute) => getIndividualAttributeViewer(attribute))}
            </Stack>

            {/* STARLIGHT ATTRIBUTES */}
            <Stack
                spacing={'2px'}
                direction={'column'}
                sx={{
                    padding: '10px',
                    border: `2px solid ${theme.palette.background.paper}`,
                    borderRadius: '10px',
                    gridColumnStart: '1',
                    gridColumnEnd: '2',
                    gridRowStart: 'span 1',
                }}
            >
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="body1">
                    {t('model.attribute.category.star')}
                    <StarlightIcon sx={{ marginLeft: '10px' }} />
                </Typography>
                {getAttributeFromCategory(Category.STARLIGHT).map((attribute: Attribute) => getIndividualAttributeViewer(attribute))}
            </Stack>

            {/* MOONLIGHT ATTRIBUTES */}
            <Stack
                spacing={'2px'}
                direction={'column'}
                sx={{
                    padding: '10px',
                    border: `2px solid ${theme.palette.background.paper}`,
                    borderRadius: '10px',
                    gridColumnStart: '1',
                    gridColumnEnd: '2',
                    gridRowStart: '1',
                }}
            >
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="body1">
                    {t('model.attribute.category.moon')}
                    <NightsIcon sx={{ marginLeft: '10px' }} />
                </Typography>
                {getAttributeFromCategory(Category.MOONLIGHT).map((attribute: Attribute) => getIndividualAttributeViewer(attribute))}
            </Stack>

            {/* BASIC ATTRIBUTES */}
            <Stack
                spacing={'2px'}
                direction={'column'}
                sx={{
                    padding: '10px',
                    border: `2px solid ${theme.palette.background.paper}`,
                    borderRadius: '10px',
                    gridColumnStart: '2',
                    gridColumnEnd: '3',
                    gridRowStart: '0',
                    gridRowEnd: '2',
                }}
            >
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }} variant="body1">
                    {t('model.attribute.category.basic')}
                    <BasicIcon sx={{ marginLeft: '10px' }} />
                </Typography>
                {getAttributeFromCategory(Category.BASIC).map((attribute: Attribute) => getIndividualAttributeViewer(attribute))}
            </Stack>
        </Box>
    );
}
