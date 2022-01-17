const { contextBridge, ipcRenderer, app } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    fileSystem: {
        getFilesFromResourcesDatabase(folderPath = '') {
            return ipcRenderer.invoke('get-db-files', ['db', folderPath]);
        },
        saveFilesToResources(path = [], files) {
            return ipcRenderer.invoke('save-assets-files', { path: path, files: files });
        },
        saveFilesToTempFolder(files) {
            return ipcRenderer.invoke('save-temp-files', files);
        },
        getFileFromResources(path = []) {
            return ipcRenderer.invoke('get-file', path);
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
