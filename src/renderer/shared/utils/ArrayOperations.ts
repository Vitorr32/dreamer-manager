export const findCommonItemsOnObjectArrays = <T>(arrays: T[][], evaluator: (a: T, b: T) => boolean) => {
    if (!arrays.length) return []; // Return an empty array if the input is empty

    // Use the first array as the reference array to compare others against
    const referenceArray = arrays[0];

    // Use reduce to iterate through each object in the reference array
    const commonItems = referenceArray.reduce((result, obj) => {
        // Check if the object satisfies the evaluator in all other arrays
        if (arrays.slice(1).every((subArray) => subArray.some((item) => evaluator(obj, item)))) {
            result.push(obj); // If it satisfies, add it to the result
        }
        return result;
    }, []);

    return commonItems;
};

export const mergeArraysAndRemoveDuplicates = <T>(arrays: T[][], evaluator: (a: T, b: T) => boolean) => {
    if (!arrays.length) return []; // Return an empty array if the input is empty

    // Use the first array as the reference array to merge others into
    const mergedArray = arrays.reduce((result, subArray) => {
        // Use concat to merge the sub-array into the result array
        return result.concat(subArray);
    }, []);

    // Use a Set to remove duplicates based on the evaluator
    const uniqueMergedArray = Array.from(
        new Set(
            mergedArray.filter((item, index, self) => {
                // Use filter and Set to remove duplicates based on the evaluator
                return self.findIndex((otherItem) => evaluator(item, otherItem)) === index;
            })
        )
    );

    return uniqueMergedArray;
};
