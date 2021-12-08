import { TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Condition } from '../../../shared/models/base/Condition.model';

interface IProps {
    range: boolean;
    condition: Condition;
    onChange: (value: number, returnData?: any) => void;
}

export function NumericSelectorParameterInput(props: IProps) {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <TextField
                id="filled-basic"
                label={t('interface.editor.condition.numeric_selector_input_from')}
                type="number"
                variant="outlined"
                onChange={(event) => props.onChange(Number.parseInt(event.target.value), { index: 0 })}
                value={props.condition.parameters[0] ? props.condition.parameters[0] : 0}
            />

            {props.range && (
                <React.Fragment>
                    <TextField
                        id="filled-basic"
                        label={t('interface.editor.condition.numeric_selector_input_to')}
                        type="number"
                        variant="outlined"
                        onChange={(event) => props.onChange(Number.parseInt(event.target.value), { index: 1 })}
                        value={props.condition.parameters[1] ? props.condition.parameters[1] : 0}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
