import { gameLoadUpdate } from 'renderer/redux/database/database.reducer';
import { store } from 'renderer/redux/store';
import { ATTRIBUTES_DATABASE, TRAIT_DATABASE } from '../Constants';
import { Attribute } from '../models/base/Attribute.model';
import { Trait } from '../models/base/Trait.model';

export async function GameStartDabaseLoad(): Promise<void> {
    const loadedTraitsJSON: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(TRAIT_DATABASE);

    const loadedTraits: Trait[] = [];
    loadedTraitsJSON.map((stringfiedTraitList) => {
        try {
            loadedTraits.push(...JSON.parse(stringfiedTraitList));
        } catch (e) {
            console.error(e);
        }
    });

    store.dispatch(gameLoadUpdate({ key: TRAIT_DATABASE, value: loadedTraits, progress: 50 }));

    const loadedAttributesJSON: string[] = await window.electron.fileSystem.getFilesFromResourcesDatabase(ATTRIBUTES_DATABASE);

    const loadedAttributes: Attribute[] = [];
    loadedAttributesJSON.map((stringfiedAttrList) => {
        try {
            loadedAttributes.push(...JSON.parse(stringfiedAttrList));
        } catch (e) {
            console.error(e);
        }
    });

    store.dispatch(gameLoadUpdate({ key: ATTRIBUTES_DATABASE, value: loadedAttributes, progress: 100 }));

    console.log(store.getState().database.traits);
    console.log(store.getState().database.mappedDatabase);
}

export {};
