import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
    fileSystem: {
        getFileFromResources(path: string[] = []) {
            return ipcRenderer.invoke('get-file', path);
        },
        getFilesFromResources(path: string[] = []) {
            return ipcRenderer.invoke('get-files', path);
        },
        getFilesFromResourcesDatabase(folderPath = '') {
            return ipcRenderer.invoke('get-db-files', ['database', folderPath]);
        },
        saveFilesToResources(path: string[] = [], files: any[]) {
            return ipcRenderer.invoke('save-assets-files', { path: path, files: files });
        },
        saveFilesToTempFolder(files: any[]) {
            return ipcRenderer.invoke('save-temp-files', files);
        },
        saveFileToResources(path: string[], fileName: string, content: any) {
            return ipcRenderer.invoke('save-as-json', { path: path, fileName: fileName, content: content });
        },
        copyFileToResources(originPath: string, destinationPath: string) {
            return ipcRenderer.invoke('save-as-copy', { originPath: originPath, destinationPath: destinationPath });
        },
        getFileInfo(path: string[]) {
            return ipcRenderer.invoke('get-file-info', path);
        },
    },
    ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]) {
            ipcRenderer.send(channel, args);
        },
        on(channel: Channels, func: (...args: unknown[]) => void) {
            const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args);
            ipcRenderer.on(channel, subscription);

            return () => ipcRenderer.removeListener(channel, subscription);
        },
        once(channel: Channels, func: (...args: unknown[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
    },
});
