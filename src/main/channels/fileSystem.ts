import { ipcMain, app } from 'electron';
import path from 'path';
import fs from 'fs';

ipcMain.handle('get-file', async (_, args: { path: string[] }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const ASSET_PATH = path.join(RESOURCES_PATH, ...args.path);

    return { absolutePath: ASSET_PATH, content: fs.readFileSync(ASSET_PATH).toString() };
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

ipcMain.handle('get-files', async (_, args: { path: string[] }) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    let TARGET_PATH = args.path.length === 0 ? RESOURCES_PATH : path.join(RESOURCES_PATH, ...args.path);

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

ipcMain.handle('get-db-files', async (_, args: string[]) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');

    const filenames = fs.readdirSync(path.join(RESOURCES_PATH, ...args));

    return filenames.map((file) => {
        try {
            return fs.readFileSync(path.join(RESOURCES_PATH, ...args, file), 'utf-8');
        } catch (e) {
            return e;
        }
    });
});

ipcMain.handle('get-static-files', async (_, args: string[]) => {
    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../../assets');
    const files: { [fileName: string]: { resourcePath: string; fileName: string; metadataData: any } } = {};

    function throughDirectory(directory: any) {
        fs.readdirSync(directory).forEach((file) => {
            const absolutePath = path.join(directory, file);
            if (fs.statSync(absolutePath).isDirectory()) return throughDirectory(absolutePath);
            //Get only the filename from the path, and them create entry of the files object.
            const fileName = path.basename(absolutePath, path.extname(absolutePath));
            if (!files[fileName]) {
                files[fileName] = { resourcePath: '', fileName: fileName, metadataData: null };
            }

            if (/\.(?:ico|gif|png|jpg|jpeg|webp)$/.test(path.extname(absolutePath))) {
                return (files[fileName].resourcePath = absolutePath);
            } else if (path.extname(absolutePath) === '.json') {
                return (files[fileName].metadataData = fs.readFileSync(absolutePath, 'utf-8'));
            }
            return;
        });
    }
    throughDirectory(path.join(RESOURCES_PATH, ...args));

    return Object.values(files).map((value) => value);
});
