import { gameLoadUpdate } from 'renderer/redux/database/database.reducer';
import { store } from 'renderer/redux/store';
import { ATTRIBUTES_DATABASE_FOLDER, CITIES_DATABASE_FOLDER, EVENT_DATABASE_FOLDER, NATIONS_DATABASE_FOLDER, TRAIT_DATABASE_FOLDER } from '../Constants';
import { Attribute } from '../models/base/Attribute.model';
import { City } from '../models/base/City.model';
import { Event } from '../models/base/Event.model';
import { Nation } from '../models/base/Nation.model';
import { Trait } from '../models/base/Trait.model';
import { Assets } from '../models/enums/Assets.enum';

export async function GameStartDatabaseLoad(): Promise<void> {
    console.log('On GameStartDatabaseLoad');

    const traits = await GetResourcesFromDatabase<Trait>(TRAIT_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Assets.TRAITS, value: traits, progress: 0 }));

    const nationsLoaded = await GetResourcesFromDatabase<Nation>(NATIONS_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Assets.NATIONS, value: nationsLoaded, progress: 20 }));

    const attributesLoaded = await GetResourcesFromDatabase<Attribute>(ATTRIBUTES_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Assets.ATTRIBUTES, value: attributesLoaded, progress: 40 }));

    const eventsLoaded = await GetResourcesFromDatabase<Event>(EVENT_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Assets.EVENTS, value: eventsLoaded, progress: 60 }));

    const citiesLoaded = await GetResourcesFromDatabase<City>(CITIES_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Assets.CITIES, value: citiesLoaded, progress: 80 }));

    console.log('On GameStartDatabaseLoaded:', store.getState().database.mappedDatabase);
}

export async function GetResourcesFromDatabase<T>(fileFolderFromAssets: string): Promise<T[]> {
    const loadedJSONs: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(fileFolderFromAssets);
    const loadedObjects: T[] = [];

    loadedJSONs.map((stringfiedObjectList) => {
        try {
            loadedObjects.push(...JSON.parse(stringfiedObjectList));
        } catch (e) {
            console.error(e);
        }
    });

    return loadedObjects;
}
