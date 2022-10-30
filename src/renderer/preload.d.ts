import { Channels } from 'main/preload';

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                sendMessage(channel: Channels, args: unknown[]): void;
                on(channel: string, func: (...args: unknown[]) => void): (() => void) | undefined;
                once(channel: string, func: (...args: unknown[]) => void): void;
            };
            fileSystem: {
                getFileFromResources(path: string[]): { absolutePath: string; content: string };
                getFilesFromResources(path: string[]): {
                    fileName: string;
                    filePath: string;
                    isDirectory: boolean;
                    isImage: boolean;
                    extension: string;
                }[];
                // Static resources are files that has a metadata file that accompany it with the data for the file to be saved on database.
                // Such file are paper pieces for now
                getStaticResourcesOnFoldersAndSubFolders(path: string[]): { resourcePath: string; fileName: string; metadataData: string }[];
                getFilesFromResourcesDatabase(path: string[]): string[];
                saveFileToResources(path: string[], content: string): string;
                copyFileToResources(originPath: string, destinationPath: string[]): string;
                getFileInfo(path: string[]): { fileName: string; fullName: string; extension: string };
            };
        };
    }
}

export {};
