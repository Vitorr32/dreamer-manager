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
import { BASE_GAME_PACKAGE_ID } from 'renderer/shared/Constants';
import { Package } from 'renderer/shared/models/files/Package.model';

export interface Database {
    isLoadingDatabase: boolean;
    loadProgress: number;
    packages: Package[];
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
        packages: { [id: string]: Package };
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
    packages: [],
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
        packages: {},
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
        databaseSetPackages: (state, action: { type: string; payload: Package[] }) => {
            state.packages = action.payload;

            state.packages.forEach((packageData) => {
                if (state.mappedDatabase.packages[packageData.id] && packageData.id !== BASE_GAME_PACKAGE_ID) {
                    throw new Error('A package with id ' + packageData.id + ' is duplicated');
                }

                state.mappedDatabase.packages[packageData.id] = packageData;
            });
        },
        databaseLoadEntity: (
            state,
            action: {
                type: string;
                payload: { value: any[]; key: EntityType; initialization?: boolean; overwrite?: boolean; progress?: number };
            }
        ) => {
            const { value, key, initialization = false, overwrite = false, progress } = action.payload;
            switch (key) {
                case EntityType.CHARACTERS:
                    const newCharacters = value.map((rawData) => Object.assign(Object.create(Character.prototype), rawData));
                    state.characters = initialization ? newCharacters : [...state.nations, ...newCharacters];
                    state.characters.forEach((character) => {
                        if (state.mappedDatabase.characters[character.id] && !overwrite) {
                            throw new Error('A characters with id ' + character.id + ' is duplicated');
                        }

                        state.mappedDatabase.characters[character.id] = character;
                    });
                    break;
                case EntityType.PAPER_DOLL:
                    const newPaperDolls = value.map((rawData) => Object.assign(Object.create(PaperDoll.prototype), rawData));
                    state.paperDolls = initialization ? newPaperDolls : [...state.paperDolls, ...newPaperDolls];
                    state.paperDolls.forEach((paperDoll) => {
                        if (state.mappedDatabase.paperDolls[paperDoll.id] && !overwrite) {
                            throw new Error('A paperDolls with id ' + paperDoll.id + ' is duplicated');
                        }

                        state.mappedDatabase.paperDolls[paperDoll.id] = paperDoll;
                    });
                    break;
                case EntityType.NATIONS:
                    const newNations = value.map((rawData) => Object.assign(Object.create(Nation.prototype), rawData));
                    state.nations = initialization ? newNations : [...state.nations, ...newNations];
                    state.nations.forEach((nation) => {
                        if (state.mappedDatabase.nations[nation.id] && !overwrite) {
                            throw new Error('A nation with id ' + nation.id + ' is duplicated');
                        }

                        state.mappedDatabase.nations[nation.id] = nation;
                    });
                    break;
                case EntityType.TRAITS:
                    const newTraits = value.map((rawTraitData) => Object.assign(Object.create(Trait.prototype), rawTraitData));
                    state.traits = initialization ? newTraits : [...state.traits, ...newTraits];
                    state.traits.forEach((trait) => {
                        if (state.mappedDatabase.traits[trait.id] && !overwrite) {
                            throw new Error('A trait with id ' + trait.id + ' is duplicated');
                        }

                        state.mappedDatabase.traits[trait.id] = trait;
                    });
                    break;
                case EntityType.ATTRIBUTES:
                    const newAttributes = value.map((rawAttributeData) => Object.assign(Object.create(Attribute.prototype), rawAttributeData));
                    state.attributes = initialization ? newAttributes : [...state.attributes, ...newAttributes];
                    state.attributes.forEach((attr) => {
                        if (state.mappedDatabase.attributes[attr.id] && !overwrite) {
                            throw new Error('A attribute with id ' + attr.id + ' is duplicated');
                        }

                        state.mappedDatabase.attributes[attr.id] = attr;
                    });
                    break;
                case EntityType.CITIES:
                    const newCities = value.map((rawAttributeData) => Object.assign(Object.create(Attribute.prototype), rawAttributeData));
                    state.cities = initialization ? newCities : [...state.cities, ...newCities];
                    state.cities.forEach((city) => {
                        if (state.mappedDatabase.cities[city.id] && !overwrite) {
                            throw new Error('A city with id ' + city.id + ' is duplicated');
                        }

                        state.mappedDatabase.cities[city.id] = city;
                    });
                    break;
                case EntityType.EVENTS:
                    state.events = value;
                    state.events.forEach((event) => {
                        if (state.mappedDatabase.events[event.id] && !overwrite) {
                            throw new Error('A Event with id ' + event.id + ' is duplicated');
                        }

                        if (event.flags) {
                            state.flags.push(...event.flags);
                            event.flags.forEach((flag) => {
                                if (state.mappedDatabase.flags[flag.id] && !overwrite) {
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
                        if (state.mappedDatabase.paperPieces[entity.id] && !overwrite) {
                            throw new Error('A Paper Piece with id ' + entity.id + ' is duplicated');
                        }

                        state.mappedDatabase.paperPieces[entity.id] = entity;
                    });
                    break;
                default:
                    console.error('Unknown load update: ' + key);
                    break;
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
