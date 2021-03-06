import { createSlice } from '@reduxjs/toolkit';
import { ATTRIBUTES_DATABASE_FOLDER, EVENT_DATABASE_FOLDER, TRAIT_DATABASE_FOLDER } from 'renderer/shared/Constants';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { Event, Flag } from 'renderer/shared/models/base/Event.model';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { Trait } from '../../shared/models/base/Trait.model';

interface GameLoopState {
    isLoadingDatabase: boolean;
    loadProgress: number;
    characters: Character[];
    traits: Trait[];
    attributes: Attribute[];
    events: Event[];
    flags: Flag[];
    mappedDatabase: {
        attributes: { [id: string]: Attribute };
        traits: { [id: string]: Trait };
        events: { [id: string]: Event };
        flags: { [id: string]: Flag };
        characters: { [id: string]: Character };
    };
}

const initialState: GameLoopState = {
    isLoadingDatabase: false,
    loadProgress: 0,
    characters: [],
    traits: [],
    attributes: [],
    events: [],
    flags: [],
    mappedDatabase: {
        attributes: {},
        traits: {},
        events: {},
        flags: {},
        characters: {},
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
                case TRAIT_DATABASE_FOLDER:
                    state.traits = action.payload.value;
                    state.traits.forEach((trait) => {
                        if (state.mappedDatabase.traits[trait.id]) {
                            throw new Error('A trait with id ' + trait.id + ' is duplicated');
                        }
                        return (state.mappedDatabase.traits[trait.id] = trait);
                    });
                    break;
                case ATTRIBUTES_DATABASE_FOLDER:
                    state.attributes = action.payload.value;
                    state.attributes.forEach((attr) => {
                        if (state.mappedDatabase.attributes[attr.id]) {
                            throw new Error('A attribute with id ' + attr.id + ' is duplicated');
                        }
                        return (state.mappedDatabase.attributes[attr.id] = attr);
                    });
                    break;
                case EVENT_DATABASE_FOLDER:
                    state.events = action.payload.value;
                    state.events.forEach((event) => {
                        if (state.mappedDatabase.events[event.id]) {
                            throw new Error('A Event with id ' + event.id + ' is duplicated');
                        }

                        state.flags.push(...event.flags);
                        event.flags.forEach((flag) => {
                            if (state.mappedDatabase.flags[flag.id]) {
                                throw new Error('A Flag with id ' + event.id + ' is duplicated');
                            }

                            state.mappedDatabase.flags[flag.id] = flag;
                        });

                        //Map the visual novel data to a newly created instance using the prototype.
                        event.visualNovel = Object.assign(Object.create(VisualNovel.prototype), event.visualNovel);
                        state.mappedDatabase.events[event.id] = event;
                    });
                default:
                    console.error('Unknown load update: ' + action.payload.key);
            }

            state.loadProgress = action.payload.progress;
        },
        gameStartLoad: (state) => {
            state.isLoadingDatabase = true;
            state.loadProgress = 0;
        },
    },
});

export const { gameStartLoad, gameLoadUpdate } = databaseSlice.actions;

export default databaseSlice.reducer;
