import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';

ipcMain.handle('get-folder-files', async (_, args: string) => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  var files = fs.readdirSync(path.join(RESOURCES_PATH, args));
  return files;
});
