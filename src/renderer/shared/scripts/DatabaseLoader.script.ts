import { databaseLoadEntity, databaseStartLoad } from 'renderer/redux/database/database.reducer';
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
import { EntityBase } from '../models/base/Entity.model';
import { Package } from '../models/files/Package.model';
import { GetStaticResourcesFromDatabase } from '../utils/FileOperation';

export async function GameStartDatabaseLoad(packages: Package[]): Promise<void> {
    store.dispatch(databaseStartLoad());

    const traitsLoaded = await LoadDatabaseFilesFromPackages<Trait>([DATABASE_FOLDER, TRAIT_DATABASE_FOLDER], packages, async (trait: Trait) => {
        const processedPath = await GetFileFromResources(trait.iconPath);
        trait.absoluteIconPath = processedPath.path;
        return trait;
    });
    store.dispatch(databaseLoadEntity({ key: EntityType.TRAITS, value: traitsLoaded, overwrite: true, initialization: true, progress: 0 }));

    const nationsLoaded = await LoadDatabaseFilesFromPackages<Nation>([DATABASE_FOLDER, NATIONS_DATABASE_FOLDER], packages);
    store.dispatch(databaseLoadEntity({ key: EntityType.NATIONS, value: nationsLoaded, overwrite: true, initialization: true, progress: 10 }));

    const charactersLoaded = await LoadDatabaseFilesFromPackages<Character>([DATABASE_FOLDER, CHARACTERS_FOLDER], packages);
    store.dispatch(databaseLoadEntity({ key: EntityType.CHARACTERS, value: charactersLoaded, overwrite: true, initialization: true, progress: 20 }));

    const paperDollsLoaded = await LoadDatabaseFilesFromPackages<PaperDoll>([DATABASE_FOLDER, PAPER_DOLL_FOLDER], packages, async (data: PaperDoll) => {
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
    store.dispatch(databaseLoadEntity({ key: EntityType.PAPER_DOLL, value: paperDollsLoaded, overwrite: true, initialization: true, progress: 30 }));

    const attributesLoaded = await LoadDatabaseFilesFromPackages<Attribute>([DATABASE_FOLDER, ATTRIBUTES_DATABASE_FOLDER], packages);
    store.dispatch(databaseLoadEntity({ key: EntityType.ATTRIBUTES, value: attributesLoaded, overwrite: true, initialization: true, progress: 40 }));

    const eventsLoaded = await LoadDatabaseFilesFromPackages<Event>([DATABASE_FOLDER, EVENT_DATABASE_FOLDER], packages);
    store.dispatch(databaseLoadEntity({ key: EntityType.EVENTS, value: eventsLoaded, overwrite: true, initialization: true, progress: 60 }));

    const citiesLoaded = await LoadDatabaseFilesFromPackages<City>([DATABASE_FOLDER, CITIES_DATABASE_FOLDER], packages);
    store.dispatch(databaseLoadEntity({ key: EntityType.CITIES, value: citiesLoaded, overwrite: true, initialization: true, progress: 80 }));

    // const paperPiecesLoaded = await GetStaticResourcesFromDatabase<PaperPiece>(
    //     [SPRITES_FOLDER, PAPER_PIECES_FOLDER],
    //     packages,
    //     async (data: PaperPiece, staticResourcePath: string) => {
    //         data.absolutePath = ApplyFileProtocol(staticResourcePath);
    //         return data;
    //     }
    // );
    // store.dispatch(databaseLoadEntity({ key: EntityType.PAPER_PIECE, value: paperPiecesLoaded, initialization: true, progress: 90 }));

    console.log('On GameStartDatabaseLoaded:', store.getState().database.mappedDatabase);
}

export async function GetEntitiesFromDatabaseFile<T>(path: string[], originPackage: Package, postProcessingFunction?: (object: T) => Promise<T>): Promise<T[]> {
    const loadedJSONs = await window.electron.fileSystem.getFilesFromResourcesDatabase(path);
    if ('error' in loadedJSONs) {
        console.error(`Failed to load entities from package's ${originPackage.name} database.`);
        return [];
    }
    const loadedObjects: T[] = [];

    loadedJSONs.map((loadedEntityFile) => {
        try {
            const loadedEntitiesArray = JSON.parse(loadedEntityFile.content);
            loadedObjects.push(
                ...loadedEntitiesArray.map((entity: EntityBase) => {
                    entity.metadata = {
                        ...entity.metadata,
                        file: {
                            name: loadedEntityFile.fileName,
                            path: loadedEntityFile.filePath,
                            packageName: originPackage.name,
                            packageID: originPackage.id,
                        },
                    };
                    return entity;
                })
            );
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

export async function LoadDatabaseFilesFromPackages<T>(path: string[], packages: Package[], postProcessingFunction?: (object: T) => Promise<T>) {
    const allEntities: T[][] = await Promise.all(
        packages.map(async (targetPackage) => {
            return GetEntitiesFromDatabaseFile<T>(path, targetPackage, postProcessingFunction);
        })
    ).catch((err) => {
        console.error(err);
        return [];
    });

    return allEntities.flat();
}
