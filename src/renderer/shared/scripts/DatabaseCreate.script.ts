import { Package } from '../models/files/Package.model';
import { GetPathInPackage } from '../utils/FileOperation';

export async function CreateOrUpdateDatabaseJSONFile(path: string[], newValue: any, targetPackage: Package, overwrite = false): Promise<void> {
    // Include the package to the path if it's not the base game folder.
    const finalPath = GetPathInPackage(targetPackage, path);
    const fileInfo = await window.electron.fileSystem.getFileFromResources(finalPath);

    // IF there's a error, it means that the file does not exist, so we have to create a new file.
    if ('error' in fileInfo) {
        CreateDatabaseJSONFile(finalPath, newValue);
    } else {
        UpdateDatabaseJSONFile(finalPath, fileInfo, newValue, overwrite);
    }
}

export async function UpdateDatabaseJSONFile(
    path: string[],
    currentDatabase: { absolutePath: string; content: string },
    newValue: any,
    overwrite = false
): Promise<void> {
    const parsedFile: any[] = JSON.parse(currentDatabase.content);
    const fileIndex = parsedFile.findIndex((value) => value.id === newValue.id);

    if (fileIndex === -1) {
        parsedFile.push(newValue);
    } else if (overwrite) {
            parsedFile[fileIndex] = newValue;
        } else {
            console.error('InsertJSONFileAsDatabase() - Insert element ID already exists and overwrite is false');
            return;
        }

    const result = await window.electron.fileSystem.saveFileToResources(path, JSON.stringify(parsedFile, null, '\t'));

    if (result) {
        console.log(`File ${path.pop()} created/updated`);
    } else {
        console.error('Error when saving', result);
    }
}

export async function CreateDatabaseJSONFile(path: string[], newValue: any): Promise<void> {
    const result = await window.electron.fileSystem.saveFileToResources(path, JSON.stringify([newValue], null, '\t'));

    if (typeof result === 'boolean' && result) {
        console.log(`File at ${path.join('/')} created/updated`);
    } else {
        console.error(result);
    }
}

export {};
