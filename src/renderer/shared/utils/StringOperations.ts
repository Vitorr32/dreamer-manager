export function JoinArrayOfString(array: string[], emptyMessage = 'None', removeDuplicate = true): string {
    if (array.length === 0) {
        return emptyMessage;
    }

    if (array.length === 1) {
        return array[0];
    }

    if (!removeDuplicate) {
        return array.reduce((a, b, i, originalArray) => a + (i < originalArray.length - 1 ? ', ' : ' and ') + b);
    }

    return [...new Set(array)].reduce((a, b, i, originalArray) => a + (i < originalArray.length - 1 ? ', ' : ' and ') + b);
}

export function ApplyFileProtocol(path: string): string {
    return `local-file-protocol://${path}`;
}

export function RemoveFileProtocol(path: string): string {
    return path.replace('local-file-protocol://', '');
}

export function GetFileNameFromPath(path: string): string {
    return path.split('\\').pop().split('/').pop();
}

export async function GetFileFromResources(path: string[]): Promise<{ path: string; content: string }> {
    const file = await window.electron.fileSystem.getFileFromResources(path);
    if ('error' in file) {
        throw new Error(file.message);
    } else {
        return { path: ApplyFileProtocol(file.absolutePath), content: file.content };
    }
}

export async function GetFileInfoFromPath(path: string[]): Promise<{ fileName: string; fullName: string; extension: string }> {
    const filePath = await window.electron.fileSystem.getFileInfo(path);
    return filePath;
}
