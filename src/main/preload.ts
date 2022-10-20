import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
    fileSystem: {
        getFileFromResources(path: string[] = []) {
            return ipcRenderer.invoke('get-file', { path: path });
        },
        getFilesFromResources(path: string[] = []) {
            return ipcRenderer.invoke('get-files', { path: path });
        },
        // Static resources are files that has a metadata file that accompany it with the data for the file to be saved on database.
        // Such file are paper pieces for now
        getStaticResourcesOnFoldersAndSubFolders(path: string[] = []) {
            return ipcRenderer.invoke('get-static-files', path);
        },
        getFilesFromResourcesDatabase(folderPath: string[] = []) {
            return ipcRenderer.invoke('get-db-files', folderPath);
        },
        saveFilesToTempFolder(files: any[]) {
            return ipcRenderer.invoke('save-temp-files', files);
        },
        saveFileToResources(path: string[], content: any) {
            return ipcRenderer.invoke('save-as-json', { path: path, content: content });
        },
        copyFileToResources(originPath: string, destinationPath: string[]) {
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
