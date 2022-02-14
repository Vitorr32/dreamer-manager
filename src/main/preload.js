const { contextBridge, ipcRenderer, app } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    fileSystem: {
        getFileFromResources(path = []) {
            return ipcRenderer.invoke('get-file', path);
        },
        getFilesFromResources(path = []) {
            return ipcRenderer.invoke('get-files', path);
        },
        getFilesFromResourcesDatabase(folderPath = '') {
            return ipcRenderer.invoke('get-db-files', ['database', folderPath]);
        },
        saveFilesToResources(path = [], files) {
            return ipcRenderer.invoke('save-assets-files', { path: path, files: files });
        },
        saveFilesToTempFolder(files) {
            return ipcRenderer.invoke('save-temp-files', files);
        },
        saveFileToResources(path, fileName, content) {
            return ipcRenderer.invoke('save-as-json', { path: path, fileName: fileName, content: content });
        },
        copyFileToResources(originPath, destinationPath) {
            return ipcRenderer.invoke('save-as-copy', { originPath: originPath, destinationPath: destinationPath });
        },
        getFileInfo(path) {
            return ipcRenderer.invoke('get-file-info', path);
        },
    },
    ipcRenderer: {
        invoke(channel, args) {
            return ipcRenderer.invoke(channel, args);
        },
        myPing() {
            ipcRenderer.send('ipc-example', 'ping');
        },
        on(channel, func) {
            const validChannels = ['ipc-example'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        once(channel, func) {
            const validChannels = ['ipc-example'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.once(channel, (event, ...args) => func(...args));
            }
        },
    },
    app: {
        getApp() {
            return app;
        },
    },
});
