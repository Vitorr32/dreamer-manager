import { useTranslation } from 'react-i18next';
import { Condition } from 'renderer/shared/models/base/Condition.model';
import { Button, List, ListItem, ListItemText, Menu } from '@mui/material';
import { Fragment, useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { LocationType } from 'renderer/shared/models/base/Location.model';
import { JoinArrayOfString } from 'renderer/shared/utils/StringOperations';

interface IProps {
    condition: Condition;
    onChange: (value: string) => void;
}

export function LocationTypeSelect({ condition, onChange }: IProps) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onValueSelected = (value: LocationType = LocationType.UNDEFINED) => {
        console.log(value);

        if (value === LocationType.UNDEFINED) {
            return;
        }

        onChange(value);
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                {condition.parameters.length === 0 ? t('interface.editor.condition.location_type_selector_placeholder') : JoinArrayOfString(condition.parameters.map((parameter) => t(parameter as string)))}
            </Button>
            <Menu id="condition-initiator-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {Object.values(LocationType)
                        .slice(1)
                        .map((attribute) => {
                            return (
                                <ListItem key={'condition_location_type_' + attribute} button onClick={(_) => onValueSelected(attribute)}>
                                    <ListItemText primary={t(attribute)} />
                                </ListItem>
                            );
                        })}
                </List>
            </Menu>
        </Fragment>
    );
}
