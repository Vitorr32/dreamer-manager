import { Channels } from 'main/preload';
import { StaticResource } from './shared/models/files/StaticResource.model';
import { Package } from './shared/models/files/Package.model';
import { FileOperationError } from './shared/models/files/FileOperationError.model';

declare global {
    interface Window {
        electron: {
            ipcRenderer: {
                sendMessage(channel: Channels, args: unknown[]): void;
                on(channel: string, func: (...args: unknown[]) => void): (() => void) | undefined;
                once(channel: string, func: (...args: unknown[]) => void): void;
            };
            fileSystem: {
                getFileFromResources(path: string[]): { absolutePath: string; content: string } | FileOperationError;
                getFilesInPath(path: string[]):
                    | {
                          fileName: string;
                          absolutePath: string;
                          isDirectory: boolean;
                          isImage: boolean;
                          extension: string;
                      }[]
                    | FileOperationError;
                // Static resources are files that has a metadata file that accompany it with the data for the file to be saved on database.
                // Such file are paper pieces for now
                getStaticResourcesOnFoldersAndSubFolders(path: string[]): StaticResource[];
                getFilesFromResourcesDatabase(path: string[]): Promise<{ fileName: string; filePath: string[]; content: string }[] | FileOperationError>;
                saveFileToResources(path: string[], content: string): string;
                copyFileToResources(originPath: string, destinationPath: string[]): string;
                getFileInfo(path: string[]): { fileName: string; fullName: string; extension: string };
            };
        };
    }
}

export {};
