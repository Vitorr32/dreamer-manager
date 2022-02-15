import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';

ipcMain.handle('save-as-json', async (_, args: { path: string[]; fileName: string; content: string }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args.path);

    try {
        fs.writeFileSync(path.join(ASSET_PATH, args.fileName), args.content);
        return true;
    } catch (e) {
        return e;
    }
});

ipcMain.handle('save-as-copy', async (_, args: { originPath: string; destinationPath: string[] }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args.destinationPath);

    try {
        fs.copyFileSync(args.originPath, ASSET_PATH);
        return true;
    } catch (e) {
        return e;
    }
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
