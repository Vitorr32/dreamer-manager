import { gameLoadUpdate } from 'renderer/redux/database/database.reducer';
import { store } from 'renderer/redux/store';
import {
    ATTRIBUTES_DATABASE_FOLDER,
    CITIES_DATABASE_FOLDER,
    EVENT_DATABASE_FOLDER,
    NATIONS_DATABASE_FOLDER,
    PAPER_PIECES_FOLDER,
    SPRITES_FOLDER,
    TRAIT_DATABASE_FOLDER,
} from '../Constants';
import { Attribute } from '../models/base/Attribute.model';
import { City } from '../models/base/City.model';
import { Event } from '../models/base/Event.model';
import { Nation } from '../models/base/Nation.model';
import { PaperPiece } from '../models/base/PaperPiece.model';
import { Trait } from '../models/base/Trait.model';
import { Entity } from '../models/enums/Entities.enum';
import { ApplyFileProtocol, GetFileFromResources } from '../utils/StringOperations';

export async function GameStartDatabaseLoad(): Promise<void> {
    console.log('On GameStartDatabaseLoad');

    const traits = await GetResourcesFromDatabase<Trait>(TRAIT_DATABASE_FOLDER, async (trait: Trait) => {
        const processedPath = await GetFileFromResources(trait.iconPath);
        trait.absoluteIconPath = processedPath.path;
        return trait;
    });
    store.dispatch(gameLoadUpdate({ key: Entity.TRAITS, value: traits, progress: 0 }));

    const nationsLoaded = await GetResourcesFromDatabase<Nation>(NATIONS_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Entity.NATIONS, value: nationsLoaded, progress: 20 }));

    const attributesLoaded = await GetResourcesFromDatabase<Attribute>(ATTRIBUTES_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Entity.ATTRIBUTES, value: attributesLoaded, progress: 40 }));

    const eventsLoaded = await GetResourcesFromDatabase<Event>(EVENT_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Entity.EVENTS, value: eventsLoaded, progress: 60 }));

    const citiesLoaded = await GetResourcesFromDatabase<City>(CITIES_DATABASE_FOLDER);
    store.dispatch(gameLoadUpdate({ key: Entity.CITIES, value: citiesLoaded, progress: 80 }));

    const paperPiecesLoaded = await GetStaticResourcesFromDatabase<PaperPiece>([SPRITES_FOLDER, PAPER_PIECES_FOLDER], async (data: PaperPiece, staticResourcePath: string) => {
        data.absolutePath = ApplyFileProtocol(staticResourcePath);
        return data;
    });
    store.dispatch(gameLoadUpdate({ key: Entity.PAPER_PIECE, value: paperPiecesLoaded, progress: 90 }));

    console.log('On GameStartDatabaseLoaded:', store.getState().database.mappedDatabase);
}

export async function GetResourcesFromDatabase<T>(fileFolderFromAssets: string, postProcessingFunction?: (object: T) => Promise<T>): Promise<T[]> {
    const loadedJSONs: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(fileFolderFromAssets);
    const loadedObjects: T[] = [];

    loadedJSONs.map((stringfiedObjectList) => {
        try {
            loadedObjects.push(...JSON.parse(stringfiedObjectList));
        } catch (e) {
            console.error(e);
        }
    });

    if (postProcessingFunction) {
        const processedObjects = loadedObjects.map(async (object) => await postProcessingFunction(object));
        return Promise.all(processedObjects);
    }

    return loadedObjects;
}

type StaticResourceMetadata = {
    resourcePath: string;
    fileName: string;
    metadataData: any;
};

export async function GetStaticResourcesFromDatabase<T>(
    staticResourcePath: string[],
    postProcessingFunction: (data: T, staticResourcePath: string) => Promise<T>
): Promise<T[]> {
    const loadedObjects: StaticResourceMetadata[] = await window.electron.fileSystem.getStaticResourcesOnFoldersAndSubFolders(staticResourcePath);
    const incompleteData: StaticResourceMetadata[] = [];
    const finalData: Promise<T>[] = [];

    loadedObjects.forEach(async (object) => {
        if (!object.metadataData || !object.resourcePath) {
            incompleteData.push(object);
        }

        finalData.push(postProcessingFunction(object.metadataData, object.resourcePath));
    });

    if (incompleteData.length !== 0) {
        console.error('Some static resources were missing their respective files on the folders, the data is the following:');
        incompleteData.forEach((incomplete, index) => console.log(index, incomplete));
    }

    return Promise.all(finalData);
}
