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
