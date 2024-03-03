export function getUpdatedValues(oldObj: any, newObj: any) {
    const updatedValues: any = {};

    // Iterate through the properties of the new object
    for (const key in newObj) {
        // Check if the property exists in the old object and has been updated
        if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
            updatedValues[key] = {
                oldValue: oldObj[key],
                newValue: newObj[key],
            };
        }
    }

    return updatedValues;
}
