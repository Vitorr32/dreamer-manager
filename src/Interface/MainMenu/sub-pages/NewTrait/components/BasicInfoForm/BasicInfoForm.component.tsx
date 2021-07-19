
import { useState } from "react"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { TraitType } from "../../../../../../models/base/Trait.model";

interface IProps {
    onBasicInfoSubmit: (name: string, description: string, traitType: TraitType) => void
}

export function BasicInfoForm({ onBasicInfoSubmit }: IProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [traitType, setTraitType] = useState(TraitType.UNDEFINED)

    function onSubmit(): void {
        console.log(traitType);
        if (name && description && traitType) {
            // onBasicInfoSubmit(name, description, traitType)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Basic Information</h2>
            </div>
            <TextField
                required
                id="outlined-required"
                label="Name"
                variant="outlined"
                value={name}
                onChange={event => setName(event.target.value)}
            />

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

            <FormControl variant="outlined" >
                <InputLabel>Type</InputLabel>
                <Select
                    style={{ width: '200px' }}
                    placeholder='Select Type'
                    value={traitType}
                    onChange={event => setTraitType(event.target.value as TraitType)}
                    label="Type" >
                    <MenuItem value={TraitType.UNDEFINED} disabled>{TraitType.UNDEFINED}</MenuItem>
                    <MenuItem value={TraitType.NORMAL}>{TraitType.NORMAL}</MenuItem>
                    <MenuItem value={TraitType.PERSONALITY}>{TraitType.PERSONALITY}</MenuItem>
                    <MenuItem value={TraitType.MENTAL}>{TraitType.MENTAL}</MenuItem>
                    <MenuItem value={TraitType.PHYSICAL}>{TraitType.PHYSICAL}</MenuItem>
                    <MenuItem value={TraitType.SPECIAL}>{TraitType.SPECIAL}</MenuItem>
                </Select>
            </FormControl>

            <button>Yolo</button>
        </form>
    )
}