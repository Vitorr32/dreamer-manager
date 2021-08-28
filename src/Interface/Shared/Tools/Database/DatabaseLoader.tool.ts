var { store } = require('../../../../redux/store')
const fs = window.require('fs');
const path = window.require('path');
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export async function GameStartDabaseLoad(): Promise<void> {
    console.log(store)

    const isPackaged = await ipcRenderer.invoke('packaged-check', '/path/to/file')

    console.log(isPackaged)
    const RESOURCES_PATH = isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');

    console.log(RESOURCES_PATH)


    // var files = fs.readdirSync('s');
    // console.log(files)
}