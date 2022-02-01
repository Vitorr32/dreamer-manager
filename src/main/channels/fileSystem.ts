import { ipcMain } from 'electron';
import path from 'path';

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
