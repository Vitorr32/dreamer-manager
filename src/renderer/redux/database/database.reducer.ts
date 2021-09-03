import { createSlice } from "@reduxjs/toolkit";
import { Trait } from "../../shared/models/base/Trait.model";

interface GameLoopState {
    traits: Trait[]
}

const initialState: GameLoopState = {
    traits: []
}

export const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        gameStartLoad: (state, action: { payload: { traits: Trait[] }, type: string }) => {
            state.traits = action.payload.traits
        }
    }
})

export const { gameStartLoad } = databaseSlice.actions;

export default databaseSlice.reducer;