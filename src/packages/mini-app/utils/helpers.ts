export const isEmpty = (obj: unknown) => {
    if (obj === null || typeof obj !== 'object') return false;

    return Object.keys(obj).length === 0;
};

export const noop = () => {};
export const isBrowser = typeof document !== 'undefined';

export const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export function genuid() {
    return Math.random().toString(36).substr(2, 9);
}
