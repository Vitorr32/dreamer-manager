
import React, { useState } from "react"
import { FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel, Switch, Button } from "@mui/material"
import { Trait, TraitType } from "renderer/shared/models/base/Trait.model"

interface IProps {
    onBasicInfoSubmit: (name: string, description: string, traitType: TraitType) => void,
    nextStep: () => void,
    trait: Trait
    onChange: (trait: Trait) => void;
}

export function BasicInfoForm({ onBasicInfoSubmit, nextStep }: IProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [traitType, setTraitType] = useState(TraitType.UNDEFINED)
    const [spawnable, setSpawnable] = useState(false)

    function onSubmit(): void {
        console.log(traitType);
        if (name && description && traitType) {
            onBasicInfoSubmit(name, description, traitType)
        }
    }

    return (
        <form onSubmit={onSubmit} id="trait-basic-info-form">
            <div>
                <h2>Basic Information</h2>
            </div>

            <div className="field">
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <span className="field-message">
                    * The name of the trait to be displayed.
                    <br />
                    Examples: 'Leader', 'Charismatic', 'Shy'
                </span>
            </div>

            <div className="field">
                <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />

                <span className="field-message">
                    * The description of the trait to give better context of it's effects on gameplay and character personality.
                    <br />
                    Example:  " 'Leader' defines the capacity of this character to inspire, command and support his peers in his job and daily life"
                </span>
            </div>

            <div className="field">
                <FormControl variant="outlined" required>
                    <InputLabel>Type</InputLabel>
                    <Select
                        required
                        placeholder='Select Type'
                        value={traitType}
                        onChange={event => setTraitType(event.target.value as TraitType)}
                        label="Type" >
                        <MenuItem value={TraitType.UNDEFINED} disabled>Select a Type</MenuItem>
                        <MenuItem value={TraitType.NORMAL}>{TraitType.NORMAL}</MenuItem>
                        <MenuItem value={TraitType.PERSONALITY}>{TraitType.PERSONALITY}</MenuItem>
                        <MenuItem value={TraitType.MENTAL}>{TraitType.MENTAL}</MenuItem>
                        <MenuItem value={TraitType.DEVELOPMENT}>{TraitType.DEVELOPMENT}</MenuItem>
                        <MenuItem value={TraitType.PHYSICAL}>{TraitType.PHYSICAL}</MenuItem>
                        <MenuItem value={TraitType.NATIONAL}>{TraitType.NATIONAL}</MenuItem>
                        <MenuItem value={TraitType.SPECIAL}>{TraitType.SPECIAL}</MenuItem>
                    </Select>
                </FormControl>

                <span className="field-message">
                    * The type of the trait, it defines the category that the trait will be presented and in what type of situation it can be obtainable
                </span>
            </div>


            <div className="field">
                <FormControlLabel
                    value="start"
                    control={
                        <Switch
                            disabled={traitType === TraitType.NATIONAL}
                            value={spawnable}
                            onChange={event => setSpawnable(event.target.checked)}
                            color="primary" />
                    }
                    label="Spawnable"
                    labelPlacement="start"
                />

                <span className="field-message">
                    * Whetever this trait can be found on generated Dreamers, otherwise it can be obtainable only by events (Do note that traits of type 'National' will always be spawned),
                    the spawn rate is determined by trait Tier ( Tier 0 is 40%, Tier 1 is 30%, Tier 2 is 15%, Tier 3 is 5% and Tier 4 is 1%)
                </span>
            </div>

            <div className="buttons-wrapper">
                <Button color="primary"  onClick={nextStep}> NEXT </Button>
            </div>
        </form>
    )
}
