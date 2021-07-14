import { createSlice } from "@reduxjs/toolkit";
import { Application } from "pixi.js";

interface GameLoopState {
    app?: Application
}

const initialState: GameLoopState = {
    app: undefined
}

export const gameLoopSlice = createSlice({
    name: 'gameLoop',
    initialState,
    reducers: {
        createApplication: (state, action) => {
            state.app = action.payload
        }
    }
})

export const { createApplication } = gameLoopSlice.actions;

export default gameLoopSlice.reducer;