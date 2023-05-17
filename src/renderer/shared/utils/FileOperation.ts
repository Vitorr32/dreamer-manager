import { BASE_GAME_PACKAGE_ID } from '../Constants';
import { Package } from '../models/files/Package.model';
import { StaticResource } from '../models/files/StaticResource.model';
import { RemoveFileProtocol } from './StringOperations';

//Check if the absolute path is the same as the relative path
//For example: "...\MyProject\MyFile.txt" is the same as the relative path ["MyProject", "MyFile.txt"] after being converted to absolute path
export async function IsAbsolutePathTheSameAsRelativePath(absolutePath: string, relativePath: string[]): Promise<boolean> {
    const absolutePathCleaned = RemoveFileProtocol(absolutePath);
    const relativePathCleaned = await window.electron.fileSystem.getFileFromResources(relativePath);
    //Verify if the relative path is valid
    if ('error' in relativePathCleaned) {
        return false;
    }
    //Check to see if the cleaned absolute path is equals to the processed path of the relative file
    return absolutePathCleaned === relativePathCleaned.absolutePath;
}

export async function CopyFileToAssetsFolder(originalFilePath: string, destinationPath: string[], targetPackage: string = BASE_GAME_PACKAGE_ID): Promise<string> {
    if (targetPackage !== BASE_GAME_PACKAGE_ID) {
        destinationPath = [targetPackage, ...destinationPath];
    }

    return window.electron.fileSystem.copyFileToResources(originalFilePath, destinationPath);
}

export async function GetStaticResourcesFromDatabase<T>(
    staticResourcePath: string[],
    postProcessingFunction: (data: T, staticResourcePath: string) => Promise<T>
): Promise<T[]> {
    const loadedObjects: StaticResource[] = await window.electron.fileSystem.getStaticResourcesOnFoldersAndSubFolders(staticResourcePath);
    const incompleteData: StaticResource[] = [];
    const finalData: Promise<T>[] = [];

    loadedObjects.forEach(async (object) => {
        if (!object.metadataData || !object.path) {
            incompleteData.push(object);
        }

        finalData.push(postProcessingFunction(JSON.parse(object.metadataData), object.path));
    });

    if (incompleteData.length !== 0) {
        console.error('Some static resources were missing their respective files on the folders, the data is the following:');
        incompleteData.forEach((incomplete, index) => console.log(index, incomplete));
    }

    return Promise.all(finalData);
}
