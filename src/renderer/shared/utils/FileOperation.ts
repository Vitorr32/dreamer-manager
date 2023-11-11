import { BASE_GAME_PACKAGE_ID } from '../Constants';
import { Package } from '../models/files/Package.model';
import { StaticResource } from '../models/files/StaticResource.model';
import { RemoveFileProtocol } from './StringOperations';

// Check if the absolute path is the same as the relative path
// For example: "...\MyProject\MyFile.txt" is the same as the relative path ["MyProject", "MyFile.txt"] after being converted to absolute path
export async function IsAbsolutePathTheSameAsRelativePath(absolutePath: string, relativePath: string[]): Promise<boolean> {
    const absolutePathCleaned = RemoveFileProtocol(absolutePath);
    const relativePathCleaned = await window.electron.fileSystem.getFileFromResources(relativePath);
    // Verify if the relative path is valid
    if ('error' in relativePathCleaned) {
        return false;
    }
    // Check to see if the cleaned absolute path is equals to the processed path of the relative file
    return absolutePathCleaned === relativePathCleaned.absolutePath;
}

// Get the path to the asset after dealing with the package location
export function GetPathInPackage(originPackage: Package, path: string[]): string[] {
    if (originPackage.id === BASE_GAME_PACKAGE_ID) {
        return path;
    }
    return [originPackage.id, ...path];
}

export async function CopyFileToAssetsFolder(originalFilePath: string, destinationPath: string[], targetPackage: Package): Promise<string> {
    return window.electron.fileSystem.copyFileToResources(originalFilePath, GetPathInPackage(targetPackage, destinationPath));
}

export async function GetStaticResourcesFromDatabase<T>(
    staticResourcePath: string[],
    originPackage: Package,
    postProcessingFunction: (data: T, staticResourcePath: string) => Promise<T>
): Promise<T[]> {
    const loadedObjects: StaticResource[] = await window.electron.fileSystem.getStaticResourcesOnFoldersAndSubFolders(GetPathInPackage(originPackage, staticResourcePath));
    const incompleteData: StaticResource[] = [];
    const finalData: Promise<T>[] = [];

    loadedObjects.forEach(async (object) => {
        if (!object.metadata || !object.path) {
            incompleteData.push(object);
        }

        finalData.push(postProcessingFunction(JSON.parse(object.metadata), object.path));
    });

    if (incompleteData.length !== 0) {
        console.log('incompleteData', incompleteData);
        console.error('Some static resources were missing their respective files on the folders, the data is the following:');
        incompleteData.forEach((incomplete, index) => console.log(index, incomplete));
    }

    return Promise.all(finalData);
}
