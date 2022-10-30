import { createSlice } from '@reduxjs/toolkit';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { City } from 'renderer/shared/models/base/City.model';
import { Event, Flag } from 'renderer/shared/models/base/Event.model';
import { Nation } from 'renderer/shared/models/base/Nation.model';
import { PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { PaperPiece } from 'renderer/shared/models/base/PaperPiece.model';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { Entity } from 'renderer/shared/models/enums/Entities.enum';
import { Trait } from '../../shared/models/base/Trait.model';

interface Database {
    isLoadingDatabase: boolean;
    loadProgress: number;
    characters: Character[];
    traits: Trait[];
    attributes: Attribute[];
    events: Event[];
    flags: Flag[];
    nations: Nation[];
    cities: City[];
    paperPieces: PaperPiece[];
    paperDolls: PaperDoll[];
    mappedDatabase: {
        attributes: { [id: string]: Attribute };
        traits: { [id: string]: Trait };
        events: { [id: string]: Event };
        flags: { [id: string]: Flag };
        characters: { [id: string]: Character };
        paperPieces: { [id: string]: PaperPiece };
        paperDolls: { [id: string]: PaperDoll };
        nations: { [id: string]: Nation };
        cities: { [id: string]: City };
    };
}

const initialState: Database = {
    isLoadingDatabase: false,
    loadProgress: 0,
    characters: [],
    traits: [],
    attributes: [],
    events: [],
    flags: [],
    nations: [],
    cities: [],
    paperPieces: [],
    paperDolls: [],
    mappedDatabase: {
        attributes: {},
        traits: {},
        events: {},
        flags: {},
        characters: {},
        paperPieces: {},
        nations: {},
        cities: {},
        paperDolls: {},
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
                payload: { value: any[]; key: Entity; progress: number };
            }
        ) => {
            switch (action.payload.key) {
                case Entity.CHARACTERS:
                    state.characters = action.payload.value;
                    state.characters.forEach((character) => {
                        if (state.mappedDatabase.nations[character.id]) {
                            throw new Error('A nation with id ' + character.id + ' is duplicated');
                        }

                        state.mappedDatabase.characters[character.id] = character;
                    });
                case Entity.PAPER_DOLL:
                    state.paperDolls = action.payload.value;
                    state.paperDolls.forEach((paperDoll) => {
                        if (state.mappedDatabase.nations[paperDoll.id]) {
                            throw new Error('A nation with id ' + paperDoll.id + ' is duplicated');
                        }

                        state.mappedDatabase.paperDolls[paperDoll.id] = paperDoll;
                    });
                case Entity.NATIONS:
                    state.nations = action.payload.value;
                    state.nations.forEach((nation) => {
                        if (state.mappedDatabase.nations[nation.id]) {
                            throw new Error('A nation with id ' + nation.id + ' is duplicated');
                        }

                        state.mappedDatabase.nations[nation.id] = nation;
                    });
                    break;
                case Entity.TRAITS:
                    const traits = action.payload.value.map((rawTraitData) => Object.assign(Object.create(Trait.prototype), rawTraitData));

                    state.traits = traits;
                    state.traits.forEach((trait) => {
                        if (state.mappedDatabase.traits[trait.id]) {
                            throw new Error('A trait with id ' + trait.id + ' is duplicated');
                        }

                        state.mappedDatabase.traits[trait.id] = trait;
                    });
                    break;
                case Entity.ATTRIBUTES:
                    const attrs = action.payload.value.map((rawAttributeData) => Object.assign(Object.create(Attribute.prototype), rawAttributeData));

                    state.attributes = attrs;
                    state.attributes.forEach((attr) => {
                        if (state.mappedDatabase.attributes[attr.id]) {
                            throw new Error('A attribute with id ' + attr.id + ' is duplicated');
                        }

                        state.mappedDatabase.attributes[attr.id] = attr;
                    });
                    break;
                case Entity.CITIES:
                    state.cities = action.payload.value;
                    state.cities.forEach((city) => {
                        if (state.mappedDatabase.cities[city.id]) {
                            throw new Error('A city with id ' + city.id + ' is duplicated');
                        }

                        state.mappedDatabase.cities[city.id] = city;
                    });
                    break;
                case Entity.EVENTS:
                    state.events = action.payload.value;
                    state.events.forEach((event) => {
                        if (state.mappedDatabase.events[event.id]) {
                            throw new Error('A Event with id ' + event.id + ' is duplicated');
                        }

                        if (event.flags) {
                            state.flags.push(...event.flags);
                            event.flags.forEach((flag) => {
                                if (state.mappedDatabase.flags[flag.id]) {
                                    throw new Error('A Flag with id ' + event.id + ' is duplicated');
                                }

                                state.mappedDatabase.flags[flag.id] = flag;
                            });
                        }

                        //Map the visual novel data to a newly created instance using the prototype.
                        event.visualNovel = Object.assign(Object.create(VisualNovel.prototype), event.visualNovel);
                        state.mappedDatabase.events[event.id] = event;
                    });
                    break;
                case Entity.PAPER_PIECE:
                    console.log(action.payload.value);
                    const entities = action.payload.value.map((rawAttributeData) => Object.assign(Object.create(PaperPiece.prototype), rawAttributeData));

                    state.paperPieces = entities;
                    state.paperPieces.forEach((entity) => {
                        if (state.mappedDatabase.paperPieces[entity.id]) {
                            throw new Error('A Paper Piece with id ' + entity.id + ' is duplicated');
                        }

                        state.mappedDatabase.paperPieces[entity.id] = entity;
                    });
                    break;
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
