import { createSlice } from "@reduxjs/toolkit";

export const gameLoopSlice = createSlice({
    name: 'gameLoop',
    initialState: {
        app: null,
        stage: null
    },
    reducers: {
        createApplication: (state, action) => {
            state.app = action.payload
            state.stage = action.payload.stage
        }
    }
})

export const { createApplication } = gameLoopSlice.actions;

export default gameLoopSlice.reducer;