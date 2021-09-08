import { Button } from "@material-ui/core";
import React from "react";
import { Condition } from "../../models/base/Condition.model";
import { ConditionInitiator } from "../../models/enums/ConditionInitiator.enum";
import { ArrowDropDown } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';
import { Trait } from "renderer/shared/models/base/Trait.model";

interface IProps {
    condition: Condition,
    onChange: (condition: Condition) => void,
}

export function ConditionTraitSelection(props: IProps) {
    const { t } = useTranslation();

    const onTraitSelected = (trait: Trait) => {
        const newCondition = new Condition()
        newCondition.parameters[0] = trait.id

        props.onChange(newCondition)
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                endIcon={<ArrowDropDown />}
            >
                {props.condition.initiator === ConditionInitiator.UNDEFINED ? t('interface.editor.condition.trait_selector_placeholder') : t(props.condition.parameters[0])}
            </Button>

        </React.Fragment>
    )
}
