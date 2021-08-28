const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    ipcMain.handle('get-file', async (event, path) => {
        return dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
    })

    ipcMain.handle('packaged-check', async () => {
        return app.isPackaged
    })
}
app.on('ready', createWindow);