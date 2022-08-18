import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RootState } from 'renderer/redux/store';
import { useAppSelector } from 'renderer/redux/hooks';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';

interface IProps {
    entity: Entity;
    data: any;
}

export function UniversalTooltip(props: IProps) {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const nations = useAppSelector((state: RootState) => state.database.nations);
    const cities = useAppSelector((state: RootState) => state.database.cities);

    const getCitiesFromNations = (nationID: string) => {
        return cities.filter((city) => city.country === nationID);
    };

    return <Box className="tooltip"></Box>;
}
