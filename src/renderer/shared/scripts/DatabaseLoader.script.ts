import { gameLoadUpdate } from 'renderer/redux/database/database.reducer';
import { store } from 'renderer/redux/store';
import { ATTRIBUTES_DATABASE_FOLDER, EVENT_DATABASE_FOLDER, TRAIT_DATABASE_FOLDER } from '../Constants';
import { Attribute } from '../models/base/Attribute.model';
import { Event } from '../models/base/Event.model';
import { Trait } from '../models/base/Trait.model';

export async function GameStartDabaseLoad(): Promise<void> {
    const loadedTraitsJSON: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(TRAIT_DATABASE_FOLDER);

    const loadedTraits: Trait[] = [];
    loadedTraitsJSON.map((stringfiedTraitList) => {
        try {
            loadedTraits.push(...JSON.parse(stringfiedTraitList));
        } catch (e) {
            console.error(e);
        }
    });

    store.dispatch(gameLoadUpdate({ key: TRAIT_DATABASE_FOLDER, value: loadedTraits, progress: 50 }));

    const loadedAttributesJSON: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(ATTRIBUTES_DATABASE_FOLDER);

    const loadedAttributes: Attribute[] = [];
    loadedAttributesJSON.map((stringfiedAttrList) => {
        try {
            loadedAttributes.push(...JSON.parse(stringfiedAttrList));
        } catch (e) {
            console.error(e);
        }
    });

    store.dispatch(gameLoadUpdate({ key: ATTRIBUTES_DATABASE_FOLDER, value: loadedAttributes, progress: 100 }));

    const loadedEventsJSON: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(EVENT_DATABASE_FOLDER);

    const loadedEvents: Event[] = [];
    loadedEventsJSON.map((stringfiedEventList) => {
        try {
            loadedEvents.push(...JSON.parse(stringfiedEventList));
        } catch (e) {
            console.error(e);
        }
    });

    store.dispatch(gameLoadUpdate({ key: EVENT_DATABASE_FOLDER, value: loadedEvents, progress: 100 }));

    console.log(store.getState().database.mappedDatabase);
}

export {};
