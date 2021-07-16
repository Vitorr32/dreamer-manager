import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { TraitType } from '../../../../models/serializable/Trait.model';
import './NewTrait.style.scss';

export function NewTrait() {

    console.log("Hello there");

    function onNewTraitSubmit() {

    }

    return (
        <main id="new-trait-component">
            <form onSubmit={onNewTraitSubmit}>
                <header>
                    <Button color="primary">
                        <ArrowBackIcon />
                    </Button>
                    <h2>Trait Creation</h2>
                </header>
                <section id="basic-info" className="form-section-card">
                    <div>
                        <h2>Basic Information</h2>
                    </div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                    />

                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                    />

                    <FormControl variant="outlined" >
                        <InputLabel>Type</InputLabel>
                        <Select
                            label="Type" >

                            <MenuItem value=""> <em>Select Type</em> </MenuItem>
                            <MenuItem value={TraitType.NORMAL}>{TraitType.NORMAL}</MenuItem>
                            <MenuItem value={TraitType.PERSONALITY}>{TraitType.PERSONALITY}</MenuItem>
                            <MenuItem value={TraitType.MENTAL}>{TraitType.MENTAL}</MenuItem>
                            <MenuItem value={TraitType.PHYSICAL}>{TraitType.PHYSICAL}</MenuItem>
                            <MenuItem value={TraitType.SPECIAL}>{TraitType.SPECIAL}</MenuItem>
                        </Select>
                    </FormControl>
                </section>

                <section id="effect">

                </section>
            </form>
        </main>
    )
}