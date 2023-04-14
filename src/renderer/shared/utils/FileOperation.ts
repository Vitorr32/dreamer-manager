import { BASE_GAME_FOLDER } from '../Constants';
import { RemoveFileProtocol } from './StringOperations';

//Check if the absolute path is the same as the relative path
//For example: "...\MyProject\MyFile.txt" is the same as the relative path ["MyProject", "MyFile.txt"] after being converted to absolute path
export async function IsAbsolutePathTheSameAsRelativePath(absolutePath: string, relativePath: string[]): Promise<boolean> {
    const absolutePathCleaned = RemoveFileProtocol(absolutePath);
    const relativePathCleaned = window.electron.fileSystem.getFileFromResources(relativePath);

    //Check to see if the cleaned absolute path is equals to the processed path of the relative file
    return absolutePathCleaned === relativePathCleaned.absolutePath;
}

export async function CopyFileToAssetsFolder(originalFilePath: string, destinationPath: string[], targetGameFolder: string = BASE_GAME_FOLDER): Promise<string> {
    if (targetGameFolder !== BASE_GAME_FOLDER) {
        destinationPath = [targetGameFolder, ...destinationPath];
    }

    return await window.electron.fileSystem.copyFileToResources(originalFilePath, destinationPath);
}
