export async function CreateOrUpdateDatabaseJSONFile(path: string[], fileName: string, newValue: any, target: string = 'base', overwrite: boolean = false): Promise<void> {
    try {
        //Check if the file already exists
        //TODO: Allow different type of target files like mod folder and so on.
        const fileInfo: { absolutePath: string; content: string } = await window.electron.fileSystem.getFileFromResources([...path, fileName]);
        if (fileInfo) {
            UpdateDatabaseJSONFile([...path, fileName], fileInfo, newValue, overwrite);
        }
    } catch (e) {
        CreateDatabaseJSONFile(path, fileName, newValue);
    }
}

export async function UpdateDatabaseJSONFile(
    path: string[],
    currentDatabase: { absolutePath: string; content: string },
    newValue: any,
    overwrite: boolean = false
): Promise<void> {
    const parsedFile: any[] = JSON.parse(currentDatabase.content);
    const fileIndex = parsedFile.findIndex((value) => value.id === newValue.id);

    if (fileIndex === -1) {
        parsedFile.push(newValue);
    } else {
        if (overwrite) {
            parsedFile[fileIndex] = newValue;
        } else {
            console.error('InsertJSONFileAsDatabase() - Insert element ID already exists and overwrite is false');
            return;
        }
    }

    const result = await window.electron.fileSystem.saveFileToResources(path, JSON.stringify(parsedFile, null, '\t'));

    if (result) {
        console.log(`File ${path.pop()} created/updated`);
    } else {
        console.error('Error when saving', result);
    }
}

export async function CreateDatabaseJSONFile(path: string[], fileName: string, newValue: any): Promise<void> {
    const result = await window.electron.fileSystem.saveFileToResources([...path, fileName], JSON.stringify([newValue], null, '\t'));

    if (typeof result === 'boolean' && result) {
        console.log(`File ${fileName} created/updated`);
    } else {
        console.error(result);
    }
}

export async function InsertIconInAssets(iconPath: string, destinationPath: string[], fileName: string) {
    const sadads = await window.electron.fileSystem.copyFileToResources(iconPath, [...destinationPath, fileName]);

    console.log(sadads);
}

export {};
