import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';

ipcMain.handle('get-db-files', async (_, args: string[]) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../assets');

    var filenames = fs.readdirSync(path.join(RESOURCES_PATH, ...args));

    return filenames.map((file) => {
        try {
            return fs.readFileSync(path.join(RESOURCES_PATH, ...args, file), 'utf-8');
        } catch (e) {
            return e;
        }
    });
});

ipcMain.handle('save-assets-files', async (_, args: { path: string[]; files: { name: string; path: string }[] }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args.path);

    args.files.forEach((file) => {
        fs.copyFile(file.path, path.join(ASSET_PATH, file.name), (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });
    });
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

ipcMain.handle('get-file', async (_, args: string[]) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args);

    try {
        return { path: ASSET_PATH, buffer: fs.readFileSync(ASSET_PATH) };
    } catch (e) {
        return e;
    }
});
