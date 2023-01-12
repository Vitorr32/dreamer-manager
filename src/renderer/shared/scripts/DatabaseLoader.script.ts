import { gameLoadUpdate } from 'renderer/redux/database/database.reducer';
import { store } from 'renderer/redux/store';
import {
    ATTRIBUTES_DATABASE_FOLDER,
    CHARACTERS_FOLDER,
    CITIES_DATABASE_FOLDER,
    DATABASE_FOLDER,
    EVENT_DATABASE_FOLDER,
    NATIONS_DATABASE_FOLDER,
    PAPER_DOLL_FOLDER,
    PAPER_PIECES_FOLDER,
    SPRITES_FOLDER,
    TRAIT_DATABASE_FOLDER,
} from '../Constants';
import { Attribute } from '../models/base/Attribute.model';
import { Character } from '../models/base/Character.model';
import { City } from '../models/base/City.model';
import { Event } from '../models/base/Event.model';
import { Nation } from '../models/base/Nation.model';
import { Emotion, PaperDoll } from '../models/base/PaperDoll.model';
import { PaperPiece } from '../models/base/PaperPiece.model';
import { Trait } from '../models/base/Trait.model';
import { EntityType } from '../models/enums/Entities.enum';
import { ApplyFileProtocol, GetFileFromResources } from '../utils/StringOperations';

export async function GameStartDatabaseLoad(): Promise<void> {
    console.log('On GameStartDatabaseLoad');

    const traits = await GetResourcesFromDatabase<Trait>([DATABASE_FOLDER, TRAIT_DATABASE_FOLDER], async (trait: Trait) => {
        const processedPath = await GetFileFromResources(trait.iconPath);
        trait.absoluteIconPath = processedPath.path;
        return trait;
    });
    store.dispatch(gameLoadUpdate({ key: EntityType.TRAITS, value: traits, progress: 0 }));

    const charactersLoaded = await GetResourcesFromDatabase<Character>([DATABASE_FOLDER, CHARACTERS_FOLDER]);
    store.dispatch(gameLoadUpdate({ key: EntityType.CHARACTERS, value: charactersLoaded, progress: 10 }));

    console.log('charactersLoaded', charactersLoaded);

    const paperDollsLoaded = await GetResourcesFromDatabase<PaperDoll>([DATABASE_FOLDER, PAPER_DOLL_FOLDER], async (data: PaperDoll) => {
        //If the paper doll uses the paper pieces system, then we don't need to get the absolute path of any custom sprite
        if (!data.isCustom) {
            return data;
        }

        for (let emotion in Emotion) {
            const currentEmotion: Emotion = Emotion[emotion as keyof typeof Emotion];
            const currentEmotionPaperDoll = data.emotions[currentEmotion];

            if (!currentEmotionPaperDoll) {
                continue;
            }

            const { path } = await GetFileFromResources(currentEmotionPaperDoll.customFilePath);
            data.emotions[currentEmotion].customFileAbsolutePath = ApplyFileProtocol(path);
        }
        return data;
    });
    store.dispatch(gameLoadUpdate({ key: EntityType.PAPER_DOLL, value: paperDollsLoaded, progress: 15 }));

    const nationsLoaded = await GetResourcesFromDatabase<Nation>([DATABASE_FOLDER, NATIONS_DATABASE_FOLDER]);
    store.dispatch(gameLoadUpdate({ key: EntityType.NATIONS, value: nationsLoaded, progress: 20 }));

    const attributesLoaded = await GetResourcesFromDatabase<Attribute>([DATABASE_FOLDER, ATTRIBUTES_DATABASE_FOLDER]);
    store.dispatch(gameLoadUpdate({ key: EntityType.ATTRIBUTES, value: attributesLoaded, progress: 40 }));

    const eventsLoaded = await GetResourcesFromDatabase<Event>([DATABASE_FOLDER, EVENT_DATABASE_FOLDER]);
    store.dispatch(gameLoadUpdate({ key: EntityType.EVENTS, value: eventsLoaded, progress: 60 }));

    const citiesLoaded = await GetResourcesFromDatabase<City>([DATABASE_FOLDER, CITIES_DATABASE_FOLDER]);
    store.dispatch(gameLoadUpdate({ key: EntityType.CITIES, value: citiesLoaded, progress: 80 }));

    const paperPiecesLoaded = await GetStaticResourcesFromDatabase<PaperPiece>([SPRITES_FOLDER, PAPER_PIECES_FOLDER], async (data: PaperPiece, staticResourcePath: string) => {
        data.absolutePath = ApplyFileProtocol(staticResourcePath);
        return data;
    });
    store.dispatch(gameLoadUpdate({ key: EntityType.PAPER_PIECE, value: paperPiecesLoaded, progress: 90 }));

    console.log('On GameStartDatabaseLoaded:', store.getState().database.mappedDatabase);
}

export async function GetResourcesFromDatabase<T>(path: string[], postProcessingFunction?: (object: T) => Promise<T>): Promise<T[]> {
    const loadedJSONs: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(path);
    const loadedObjects: T[] = [];

    loadedJSONs.map((stringObjectList) => {
        try {
            loadedObjects.push(...JSON.parse(stringObjectList));
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

        finalData.push(postProcessingFunction(JSON.parse(object.metadataData), object.resourcePath));
    });

    if (incompleteData.length !== 0) {
        console.error('Some static resources were missing their respective files on the folders, the data is the following:');
        incompleteData.forEach((incomplete, index) => console.log(index, incomplete));
    }

    return Promise.all(finalData);
}
