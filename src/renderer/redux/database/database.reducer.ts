import { createSlice } from '@reduxjs/toolkit';
import { Attribute } from 'renderer/shared/models/base/Attribute.model';
import { Character } from 'renderer/shared/models/base/Character.model';
import { City } from 'renderer/shared/models/base/City.model';
import { Event, Flag } from 'renderer/shared/models/base/Event.model';
import { Nation } from 'renderer/shared/models/base/Nation.model';
import { PaperDoll } from 'renderer/shared/models/base/PaperDoll.model';
import { PaperPiece } from 'renderer/shared/models/base/PaperPiece.model';
import { VisualNovel } from 'renderer/shared/models/base/VisualNovel.model';
import { EntityType } from 'renderer/shared/models/enums/Entities.enum';
import { Trait } from '../../shared/models/base/Trait.model';
import { BASE_GAME_FOLDER } from 'renderer/shared/Constants';

export interface Database {
    isLoadingDatabase: boolean;
    loadProgress: number;
    packages: string[];
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
    packages: [BASE_GAME_FOLDER],
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
        databaseSetPackages: (state, action: { type: string; payload: string[] }) => {
            state.packages = action.payload;
        },
        databaseLoadEntity: (
            state,
            action: {
                type: string;
                payload: { value: any[]; key: EntityType; cleanUp?: boolean; progress?: number };
            }
        ) => {
            const { value, key, cleanUp, progress } = action.payload;
            switch (key) {
                case EntityType.CHARACTERS:
                    state.characters = value;
                    state.characters.forEach((character) => {
                        if (state.mappedDatabase.characters[character.id] && !cleanUp) {
                            throw new Error('A characters with id ' + character.id + ' is duplicated');
                        }

                        state.mappedDatabase.characters[character.id] = character;
                    });
                case EntityType.PAPER_DOLL:
                    state.paperDolls = value;
                    state.paperDolls.forEach((paperDoll) => {
                        if (state.mappedDatabase.paperDolls[paperDoll.id] && !cleanUp) {
                            throw new Error('A paperDolls with id ' + paperDoll.id + ' is duplicated');
                        }

                        state.mappedDatabase.paperDolls[paperDoll.id] = paperDoll;
                    });
                case EntityType.NATIONS:
                    state.nations = value;
                    state.nations.forEach((nation) => {
                        if (state.mappedDatabase.nations[nation.id] && !cleanUp) {
                            throw new Error('A nation with id ' + nation.id + ' is duplicated');
                        }

                        state.mappedDatabase.nations[nation.id] = nation;
                    });
                    break;
                case EntityType.TRAITS:
                    const traits = value.map((rawTraitData) => Object.assign(Object.create(Trait.prototype), rawTraitData));

                    state.traits = traits;
                    state.traits.forEach((trait) => {
                        if (state.mappedDatabase.traits[trait.id] && !cleanUp) {
                            throw new Error('A trait with id ' + trait.id + ' is duplicated');
                        }

                        state.mappedDatabase.traits[trait.id] = trait;
                    });
                    break;
                case EntityType.ATTRIBUTES:
                    const attrs = value.map((rawAttributeData) => Object.assign(Object.create(Attribute.prototype), rawAttributeData));

                    state.attributes = attrs;
                    state.attributes.forEach((attr) => {
                        if (state.mappedDatabase.attributes[attr.id] && !cleanUp) {
                            throw new Error('A attribute with id ' + attr.id + ' is duplicated');
                        }

                        state.mappedDatabase.attributes[attr.id] = attr;
                    });
                    break;
                case EntityType.CITIES:
                    state.cities = value;
                    state.cities.forEach((city) => {
                        if (state.mappedDatabase.cities[city.id] && !cleanUp) {
                            throw new Error('A city with id ' + city.id + ' is duplicated');
                        }

                        state.mappedDatabase.cities[city.id] = city;
                    });
                    break;
                case EntityType.EVENTS:
                    state.events = value;
                    state.events.forEach((event) => {
                        if (state.mappedDatabase.events[event.id] && !cleanUp) {
                            throw new Error('A Event with id ' + event.id + ' is duplicated');
                        }

                        if (event.flags) {
                            state.flags.push(...event.flags);
                            event.flags.forEach((flag) => {
                                if (state.mappedDatabase.flags[flag.id] && !cleanUp) {
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
                case EntityType.PAPER_PIECE:
                    const entities = value.map((rawAttributeData) => Object.assign(Object.create(PaperPiece.prototype), rawAttributeData));

                    state.paperPieces = entities;
                    state.paperPieces.forEach((entity) => {
                        if (state.mappedDatabase.paperPieces[entity.id] && !cleanUp) {
                            throw new Error('A Paper Piece with id ' + entity.id + ' is duplicated');
                        }

                        state.mappedDatabase.paperPieces[entity.id] = entity;
                    });
                    break;
                default:
                    console.error('Unknown load update: ' + key);
            }

            if (progress) {
                state.loadProgress = progress;
            }
        },
        databaseStartLoad: (state) => {
            state.isLoadingDatabase = true;
            state.loadProgress = 0;
        },
        databaseEndLoad: (state) => {
            state.isLoadingDatabase = false;
        },
    },
});

export const { databaseSetPackages, databaseStartLoad, databaseLoadEntity, databaseEndLoad } = databaseSlice.actions;

export default databaseSlice.reducer;
