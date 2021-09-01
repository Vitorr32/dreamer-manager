var { store } = require('../../../../redux/store')
const fs = window.require('fs');
const path = window.require('path');
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

declare const __static: string;
 
export async function GameStartDabaseLoad(): Promise<void> {

    const isPackaged = await ipcRenderer.invoke('packaged-check', '/path/to/file')
    console.log(isPackaged)

    // console.log(isPackaged)
    // const RESOURCES_PATH = isPackaged
    //     ? path.join(process.resourcesPath, 'assets')
    //     : path.join('../../../../../assets');

    // console.log(RESOURCES_PATH)
    // console.log(path.join(__static, '/traits'))


    // var files = fs.readdirSync(RESOURCES_PATH);
    // console.log(files)
}