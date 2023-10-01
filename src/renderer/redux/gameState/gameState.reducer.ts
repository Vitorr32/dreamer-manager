import { createSlice } from '@reduxjs/toolkit';
import { World } from 'renderer/shared/models/base/World.model';

export interface GameState {
    // Determine if the game is currently running or not
    isActive: boolean;
    world: World;
}

const initialState: GameState = {
    isActive: false,
    world: new World(),
};

export const gameSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {},
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
