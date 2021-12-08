import { Button, List, ListItem, ListItemText, Menu } from '@mui/material';
import React, { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'renderer/redux/store';
import { Status } from 'renderer/shared/models/base/Character.model';
import { Condition } from 'renderer/shared/models/base/Condition.model';
import { JoinArrayOfString } from 'renderer/shared/utils/StringOperations';

interface IProps {
    condition: Condition;
    onChange: (values: string[]) => void;
}

export function StaticStatusSelectionButton({ condition, onChange }: IProps) {
    const mappedDatabase = useSelector((state: RootState) => state.database.mappedDatabase);

    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onValueSelected = (value: Status = Status.UNDEFINED) => {
        if (value === Status.UNDEFINED) {
            onChange([]);
            return;
        }

        onChange([value]);
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                {condition.targets.length === 0 ? t('interface.editor.condition.status_selector_placeholder') : JoinArrayOfString(condition.targets.map((target) => t(target)))}
            </Button>
            <Menu id="condition-initiator-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {Object.values(Status)
                        .slice(1)
                        .map((status) => {
                            return (
                                <ListItem key={'condition_status_' + status} button onClick={(_) => onValueSelected(status)}>
                                    <ListItemText primary={t(status)} secondary="Character static stats" />
                                </ListItem>
                            );
                        })}
                </List>
            </Menu>
        </React.Fragment>
    );
}
