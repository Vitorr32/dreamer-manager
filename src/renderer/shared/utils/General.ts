export function AreArraysEqual(array1: any[], array2: any[]): boolean {
    if (!array1 && !array2) {
        return true;
    } else if (!array1 || !array2) {
        return false;
    } else {
        return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
    }
}

export function CopyClassInstance<T>(object: T): T {
    return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
}
