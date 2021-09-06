import { store } from 'renderer/redux/store';

export async function GameStartDabaseLoad(): Promise<void> {
  console.log(store);
  console.log(window.electron.app.getApp())

  const resourcesPath = await window.electron.fileSystem.getFilesFromResources('db/traits');
  // console.log(isPackaged)


  // console.log(RESOURCES_PATH)
  // console.log(path.join(__dirname, '../../../../assets'))


  console.log(resourcesPath)
}

export {};
