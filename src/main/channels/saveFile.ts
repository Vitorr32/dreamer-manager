import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';

const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');

ipcMain.handle('save-as-json', async (_, args: { path: string[]; content: string }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args.path);

    fs.writeFileSync(ASSET_PATH, args.content, { flag: 'w' });
    return ASSET_PATH;
});

ipcMain.handle('save-as-copy', async (_, args: { originPath: string; destinationPath: string[] }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args.destinationPath);

    fs.copyFileSync(args.originPath, ASSET_PATH);
    return ASSET_PATH;
});

ipcMain.handle('save-temp-files', async (_, args: { name: string; path: string }[]) => {
    const filesInDestination: any[] = [];

    args.forEach((file) => {
        const destinationPath = path.join(app.getPath('temp'), file.name);
        try {
            fs.copyFileSync(file.path, destinationPath);
            filesInDestination.push(destinationPath);
        } catch (e) {
            console.log(e);
        }
    });

    return filesInDestination;
});
