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

    LoadTraitDatabaseFiles(packages);

    packages.forEach(async (packageData) => {
        const charactersLoaded = await GetEntitiesFromDatabaseFile<Character>([DATABASE_FOLDER, CHARACTERS_FOLDER], packageData);
        store.dispatch(databaseLoadEntity({ key: EntityType.CHARACTERS, value: charactersLoaded, initialization: true, progress: 10 }));

        const paperDollsLoaded = await GetEntitiesFromDatabaseFile<PaperDoll>([DATABASE_FOLDER, PAPER_DOLL_FOLDER], packageData, async (data: PaperDoll) => {
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
        store.dispatch(databaseLoadEntity({ key: EntityType.PAPER_DOLL, value: paperDollsLoaded, initialization: true, progress: 15 }));

        const nationsLoaded = await GetEntitiesFromDatabaseFile<Nation>([DATABASE_FOLDER, NATIONS_DATABASE_FOLDER], packageData);
        store.dispatch(databaseLoadEntity({ key: EntityType.NATIONS, value: nationsLoaded, initialization: true, progress: 20 }));

        const attributesLoaded = await GetEntitiesFromDatabaseFile<Attribute>([DATABASE_FOLDER, ATTRIBUTES_DATABASE_FOLDER], packageData);
        store.dispatch(databaseLoadEntity({ key: EntityType.ATTRIBUTES, value: attributesLoaded, initialization: true, progress: 40 }));

        const eventsLoaded = await GetEntitiesFromDatabaseFile<Event>([DATABASE_FOLDER, EVENT_DATABASE_FOLDER], packageData);
        store.dispatch(databaseLoadEntity({ key: EntityType.EVENTS, value: eventsLoaded, initialization: true, progress: 60 }));

        const citiesLoaded = await GetEntitiesFromDatabaseFile<City>([DATABASE_FOLDER, CITIES_DATABASE_FOLDER], packageData);
        store.dispatch(databaseLoadEntity({ key: EntityType.CITIES, value: citiesLoaded, initialization: true, progress: 80 }));

        const paperPiecesLoaded = await GetStaticResourcesFromDatabase<PaperPiece>(
            [SPRITES_FOLDER, PAPER_PIECES_FOLDER],
            async (data: PaperPiece, staticResourcePath: string) => {
                data.absolutePath = ApplyFileProtocol(staticResourcePath);
                return data;
            }
        );
        store.dispatch(databaseLoadEntity({ key: EntityType.PAPER_PIECE, value: paperPiecesLoaded, initialization: true, progress: 90 }));
    });

    console.log('On GameStartDatabaseLoaded:', store.getState().database.mappedDatabase);
}

export async function GetEntitiesFromDatabaseFile<T>(path: string[], originPackage: Package, postProcessingFunction?: (object: T) => Promise<T>): Promise<T[]> {
    const loadedJSONs = await window.electron.fileSystem.getFilesFromResourcesDatabase(path);
    console.log(loadedJSONs);
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
                    return entity as T;
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

export async function LoadTraitDatabaseFiles(packages: Package[], progress = 0) {
    const allTraits = await Promise.all(
        packages.map(async (packageID) => {
            const traits = await GetEntitiesFromDatabaseFile<Trait>([DATABASE_FOLDER, TRAIT_DATABASE_FOLDER], packageID, async (trait: Trait) => {
                const processedPath = await GetFileFromResources(trait.iconPath);
                trait.absoluteIconPath = processedPath.path;
                return trait;
            });

            return traits;
        })
    ).catch((error) => {
        console.error(error);
        return [];
    });

    store.dispatch(databaseLoadEntity({ key: EntityType.TRAITS, value: allTraits.flat(), initialization: true, overwrite: true, progress }));
}
