export async function InsertJSONFileAsDatabase(path: string[], fileName: string, newValue: any, overwrite: boolean = false, target: string = 'base'): Promise<void> {
    //TODO: Allow different type of target files like mod folder and so on.
    const loadedFileJSON: { path: string; buffer: string } = await window.electron.fileSystem.getFileFromResources([...path, fileName]);

    const parsedFile: any[] = JSON.parse(loadedFileJSON.buffer);
    const fileIndex = parsedFile.findIndex((value) => value.id === newValue.id);

    if (fileIndex === -1) {
        parsedFile.push(newValue);
    } else {
        if (overwrite) {
            parsedFile[fileIndex] = newValue;
        } else {
            console.error("InsertJSONFileAsDatabase() - Insert element ID already exists and overwrite is false");
            return;
        }
    }

    const result = await window.electron.fileSystem.saveFileToResources(path, fileName, JSON.stringify(parsedFile));

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
