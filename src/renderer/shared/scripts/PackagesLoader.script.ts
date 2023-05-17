import { Package } from '../models/files/Package.model';
import { GetFileFromResources } from '../utils/StringOperations';

export async function GetPackages(rootPackageFileName: string, modsFolder: string): Promise<Package[]> {
    const packages = [];
    try {
        const mainPackageData = await GetFileFromResources([rootPackageFileName]);
        packages.push(JSON.parse(mainPackageData.content));
    } catch (error) {
        console.error(error);
        return packages;
    }

    const files = await window.electron.fileSystem.getFilesInPath([modsFolder]);

    if ('error' in files) {
        console.log('No mods folder, skipping');
        return packages;
    }

    files.forEach(async (file) => {
        if (file.extension === 'json') {
            try {
                const fileData = await GetFileFromResources([modsFolder, file.fileName]);
                packages.push(JSON.parse(fileData.content));
            } catch (error) {
                console.error(error);
                return;
            }
        }
    });

    return packages;
}
