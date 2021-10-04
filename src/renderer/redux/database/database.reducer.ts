import { keys } from '@material-ui/core/styles/createBreakpoints';
import { createSlice } from '@reduxjs/toolkit';
import { ATTRIBUTES_DATABASE, TRAIT_DATABASE } from 'renderer/shared/Constants';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { Trait } from '../../shared/models/base/Trait.model';

interface GameLoopState {
    isLoadingDatabase: boolean;
    loadProguess: number;
    traits: Trait[];
    attributes: Attribute[];
    mappedDatabase: {
        attributes: { [id: string]: Attribute };
        traits: { [id: string]: Trait };
    };
}

const initialState: GameLoopState = {
    isLoadingDatabase: false,
    loadProguess: 0,
    traits: [],
    attributes: [],
    mappedDatabase: {
        attributes: {},
        traits: {},
    },
};

export const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        gameLoadUpdate: (
            state,
            action: {
                type: string;
                payload: { value: any[]; key: string; progress: number };
            }
        ) => {
            switch (action.payload.key) {
                case TRAIT_DATABASE:
                    state.traits = action.payload.value;
                    break;
                case ATTRIBUTES_DATABASE:
                    state.attributes = action.payload.value;
                    state.attributes.forEach((attr) => (state.mappedDatabase.attributes[attr.id] = attr));
                    break;
                default:
                    console.error('Unknown load update: ' + action.payload.key);
            }

            state.loadProguess = action.payload.progress;
        },
        gameStartLoad: (state) => {
            state.isLoadingDatabase = true;
            state.loadProguess = 0;
        },
    },
});

export const { gameStartLoad, gameLoadUpdate } = databaseSlice.actions;

export default databaseSlice.reducer;
