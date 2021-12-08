import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';

ipcMain.handle('get-db-files', async (_, args: string[]) => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  var filenames = fs.readdirSync(path.join(RESOURCES_PATH, ...args));

  return filenames.map((file) => {
    try {
      return fs.readFileSync(path.join(RESOURCES_PATH, ...args, file), 'utf-8');
    } catch (e) {
      return e;
    }
  });
});
