/* eslint-disable @typescript-eslint/no-explicit-any */

export const isObjectLike = (object: any): boolean => {
    return typeof object === 'object' && object !== null;
};

export const isEqual = (value: any, other: any): boolean => {
    if (value === other) {
        return true;
    }

    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return false;
    }

    if (isObjectLike(value) && isObjectLike(other)) {
        if (Object.keys(value).length !== Object.keys(other).length) {
            return false;
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const prop in value) {
            if (
                Object.prototype.hasOwnProperty.call(value, prop) &&
                Object.prototype.hasOwnProperty.call(other, prop)
            ) {
                if (!isEqual(value[prop], other[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    return false;
};
