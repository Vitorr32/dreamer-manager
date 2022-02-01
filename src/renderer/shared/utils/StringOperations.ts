export function JoinArrayOfString(array: string[], emptyMessage: string = 'None', removeDuplicate: boolean = true): string {
    if (array.length === 0) {
        return emptyMessage;
    }

    if (array.length === 1) {
        return array[0];
    }

    if (!removeDuplicate) {
        return array.reduce((a, b, i, array) => a + (i < array.length - 1 ? ', ' : ' and ') + b);
    }

    return [...new Set(array)].reduce((a, b, i, array) => a + (i < array.length - 1 ? ', ' : ' and ') + b);
}

export function ApplyFileProtocol(path: string): string {
    return `local-file-protocol://${path}`;
}

export async function GetFileFromResources(path: string[]): Promise<string> {
    const filePath = window.electron.fileSystem.getFileFromResources(path);
    return ApplyFileProtocol(filePath);
}

export async function GetFileInfoFromPath(path: string): Promise<{ fileName: string; fullName: string; extension: string } | undefined> {
    const filePath = await window.electron.fileSystem.getFileInfo(path);
    return filePath;
}
