import { gameLoadUpdate } from 'renderer/redux/database/database.reducer';
import { store } from 'renderer/redux/store';
import { TRAIT_DATABASE } from '../Constants';
import { Trait } from '../models/base/Trait.model';

export async function GameStartDabaseLoad(): Promise<void> {
  const loadedTraitsJSON: string[] =
    await window.electron.fileSystem.getFilesFromResourcesDatabase(
      TRAIT_DATABASE
    );

  const loadedTraits: Trait[] = [];
  loadedTraitsJSON.map((stringfiedTraitList) => {
    try {
      loadedTraits.push(...JSON.parse(stringfiedTraitList));
    } catch (e) {
      console.error(e);
    }
  });

  store.dispatch(
    gameLoadUpdate({ key: TRAIT_DATABASE, value: loadedTraits, progress: 100 })
  );

  console.log(store.getState().database.traits);
}

export {};
