import { Button, List, ListItem, ListItemText, Menu } from '@mui/material';
import { Agent, Condition } from '../../models/base/Condition.model';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface IProps {
    condition: Condition;
    onChange: (condition: Condition) => void;
    actingAgent?: boolean;
}

export function ConditionAgentSelect({ condition, onChange, actingAgent = true }: IProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { t } = useTranslation();

    const onItemSelected = (agent: Agent) => {
        setAnchorEl(null);

        const newCondition = Object.assign({}, condition);

        if (actingAgent) {
            newCondition.activeAgent = agent;
        } else {
            newCondition.passiveAgent = agent;
        }

        onChange(newCondition);
    };

    const currentAgent = actingAgent ? condition.activeAgent : condition.passiveAgent;

    return (
        <>
            <Button variant="contained" endIcon={<ArrowDropDown />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                {currentAgent === Agent.UNDEFINED ? t('interface.editor.condition.' + actingAgent ? 'activeAgent' : 'passiveAgent') : t(condition.initiator)}
            </Button>
            <Menu id="condition-initiator-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {Object.values(Agent)
                        .slice(1)
                        .map((agent) => {
                            return (
                                <ListItem key={'condition_agent_' + agent} button onClick={(_) => onItemSelected(agent)}>
                                    <ListItemText primary={t(agent)} />
                                </ListItem>
                            );
                        })}
                </List>
            </Menu>
        </>
    );
}
