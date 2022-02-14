import { ipcMain, app } from 'electron';
import path from 'path';
import fs from 'fs';

ipcMain.handle('get-file', async (_, args: string[]) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args);

    try {
        return { path: ASSET_PATH, buffer: fs.readFileSync(ASSET_PATH).toString() };
    } catch (e) {
        return e;
    }
});

ipcMain.handle('get-file-info', async (_, args: string) => {
    if (!args) {
        return undefined;
    }

    return {
        fileName: path.basename(args, path.extname(args)),
        fullName: path.basename(args),
        extension: path.extname(args),
    };
});

ipcMain.handle('get-files', async (_, args: string[]) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    let TARGET_PATH = args.length === 0 ? RESOURCES_PATH : path.join(RESOURCES_PATH, ...args);

    const filenames = fs.readdirSync(TARGET_PATH);

    return filenames.map((fileName) => {
        try {
            const filePath = path.join(TARGET_PATH, fileName);
            return {
                fileName: fileName,
                filePath: filePath,
                isDirectory: fs.statSync(filePath).isDirectory(),
                isImage: /\.(?:ico|gif|png|jpg|jpeg|webp)$/.test(path.extname(filePath)),
                extension: path.extname(filePath),
            };
        } catch (e) {
            return e;
        }
    });
});
