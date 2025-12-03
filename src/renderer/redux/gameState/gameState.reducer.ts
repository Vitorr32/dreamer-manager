import { createSlice } from '@reduxjs/toolkit';
import { MIN_DATE } from 'renderer/shared/Constants';

export interface GameState {
    // Determine if the game is currently running or not
    isActive: boolean;
    // The current game state date
    date: number
}

const initialState: GameState = {
    isActive: false,
    date: MIN_DATE.getTime(),
};

export const gameSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {},
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
