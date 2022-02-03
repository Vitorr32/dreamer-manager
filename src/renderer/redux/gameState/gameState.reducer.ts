import { createSlice } from '@reduxjs/toolkit';
import { ATTRIBUTES_DATABASE_FOLDER, TRAIT_DATABASE_FOLDER } from 'renderer/shared/Constants';
import { Character } from 'renderer/shared/models/base/Character.model';
import { World } from 'renderer/shared/models/base/World.model';

interface GameState {
    world: World;
    characters: Character[];
}

const initialState: GameState = {
    world: new World(),
    characters: [],
};

export const gameSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {},
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
